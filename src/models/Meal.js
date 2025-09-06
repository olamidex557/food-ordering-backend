import mongoose from "mongoose";

const mealSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String }
  },
  { timestamps: true }
);

const Meal = mongoose.model("Meal", mealSchema);
export default Meal;
