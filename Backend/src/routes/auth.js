const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    // Validate Signup data
    validateSignupData(req);

    const { firstName, lastName, emailID, password } = req.body;

    // Encrypting the password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      password: hashedPassword,
      emailID,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    console.log(token);

    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 3600000),
    });
    res.json({ message: "User added Successfully!!", data: savedUser });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;

    const user = await User.findOne({ emailID: emailID });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPassword = await user.validatePassword(password);

    if (isPassword) {
      // Creating JWT token
      const token = await user.getJWT();
      console.log(token);

      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logout Successfully");
  } catch (error) {
    throw new Error("Error : " + error.message);
  }
});

module.exports = authRouter;
