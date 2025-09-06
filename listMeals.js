import mongoose from "mongoose";
import dotenv from "dotenv";
import Meal from "./src/models/Meal.js";

dotenv.config();

const listMeals = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const meals = await Meal.find();
    console.log(meals);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

listMeals();
