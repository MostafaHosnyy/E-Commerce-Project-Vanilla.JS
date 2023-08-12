import Product from "../models/productModel.js";
import catchAsync from "../utils/catchAsync.js";

export const getMain = catchAsync(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).render("main", {
        title: "| Home",
        products,
    });
});

export const getLoginForm = (req, res) => {
    res.status(200).render("login", {
        title: "| Log In",
    });
};

export const getSignupForm = (req, res) => {
    res.status(200).render("signup", {
        title: "| Sign Up",
    });
};

export const getShop = catchAsync(async (req, res) => {
    const products = await Product.find();

    res.status(200).render("shop", {
        title: "| Shop",
        products,
    });
});

export const getCheckout = (req, res) => {
    res.status(200).render("checkout", {
        title: "| Checkout",
    });
};
