import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeSecretKey);

export const checkoutSession = catchAsync(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${req.protocol}://${req.get("host")}/`,
      cancel_url: `${req.protocol}://${req.get("host")}`,
      customer_email: req.body.email,
      client_reference_id: req.body.productId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${product.name} Product`,
            },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        },
      ],
    });

    res.status(200).json({
      status: "success",
      session,
    });
  } catch (error) {
    next(error); // Pass the error to your global error handler
  }
});
