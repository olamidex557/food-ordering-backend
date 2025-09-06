import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import meals from "./data/meals.js";
import User from "./src/models/User.js";
import Meal from "./src/models/Meal.js";
import Order from "./src/models/Order.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await Order.deleteMany();
    await Meal.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleMeals = meals.map(meal => ({ ...meal }));
    await Meal.insertMany(sampleMeals);

    console.log("Data Imported!");
    process.exit();
  } catch (err) {
    console.error("Error importing data:", err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Meal.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB().then(() => importData());
