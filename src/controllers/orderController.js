import Order from "../models/Order.js";
import Meal from "../models/Meal.js";

export const createOrder = async (req, res) => {
  const { orderItems } = req.body;
  try {
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    let total = 0;
    const items = [];

    for (const item of orderItems) {
      const meal = await Meal.findById(item.meal);
      if (!meal) return res.status(404).json({ message: `Meal not found: ${item.meal}` });

      total += meal.price * item.quantity;

      items.push({
        meal: meal._id,
        quantity: item.quantity,
        price: meal.price
      });
    }

    const order = await Order.create({ user: req.user._id, items, totalAmount: total });
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.meal", "name price");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.meal", "name price");
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
