import express from "express";
import { registerUser, authUser, getUserProfile, updateUserProfile, getUsers, deleteUser } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/register", registerUser);
router.post("/login", authUser);

// Private
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// Admin
router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);

export default router;
