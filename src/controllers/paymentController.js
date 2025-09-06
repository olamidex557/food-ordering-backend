import axios from "axios";
import Order from "../models/Order.js";

const PAYSTACK_BASE_URL = "https://api.paystack.co";

// Initialize payment
export const initializePayment = async (req, res) => {
  const { orderId, email } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount: order.totalAmount * 100, // Paystack expects amount in kobo
        currency: "NGN",
        metadata: {
          orderId: order._id.toString()
        }
      },
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
      }
    );

    res.json(response.data.data); // returns authorization_url
  } catch (err) {
    console.error("🔥 INITIALIZE PAYMENT ERROR:", err.response?.data || err.message);
    res.status(500).json({ message: "Payment initialization failed" });
  }
};

// Verify payment
export const verifyPayment = async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );

    const { status, metadata } = response.data.data;

    if (status === "success") {
      const order = await Order.findById(metadata.orderId);
      if (!order) return res.status(404).json({ message: "Order not found" });

      order.isPaid = true;
      order.paidAt = Date.now();
      await order.save();

      res.json({ message: "Payment successful", order });
    } else {
      res.status(400).json({ message: "Payment not successful" });
    }
  } catch (err) {
    console.error("🔥 VERIFY PAYMENT ERROR:", err.response?.data || err.message);
    res.status(500).json({ message: "Payment verification failed" });
  }
};
