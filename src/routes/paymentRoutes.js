import express from "express";
import { initializePayment, verifyPayment } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/initialize", protect, initializePayment); // init payment
router.get("/verify/:reference", protect, verifyPayment); // verify payment

export default router;
