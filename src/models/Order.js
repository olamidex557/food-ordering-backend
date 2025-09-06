import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema(
  {
    meal: { type: mongoose.Schema.Types.ObjectId, ref: "Meal", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  { _id: false }
);

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Delivered", "Cancelled"],
      default: "Pending"
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
