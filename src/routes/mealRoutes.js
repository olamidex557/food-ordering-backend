import express from "express";
import {
  getMeals,
  getMealById,
  createMeal,
  updateMeal,
  deleteMeal
} from "../controllers/mealController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getMeals);
router.get("/:id", getMealById);

router.post("/", protect, admin, createMeal);
router.put("/:id", protect, admin, updateMeal);
router.delete("/:id", protect, admin, deleteMeal);

export default router;
