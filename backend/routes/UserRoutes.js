const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { 
      first_name,
       last_name,
        email,
         password 
        } = req.body;
    if (!(email &&
       password &&
        first_name &&
         last_name
         )) {
      res.status(400)
      .send("Please enter your information!");
    }
    const userUsed = await User.findOne({ email });
    if (userUsed) {
      return res.status(409)
      .send("It seems you already have an account, please log in instead.");
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    const token = jwt.sign(
      { user_id: user._id, email },
      'anykey@1234',
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("PLease fill all the details carefully");
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },'anykey@1234',
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      res.status(200).json(user);
    }
    res.status(400).send("Internal server error, please try again later");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
