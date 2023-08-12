import express from "express";
const router = express.Router();

import { checkoutSession } from "../controllers/paymentController.js";

router.get("/checkout-session/:productId", checkoutSession);

export { router };
