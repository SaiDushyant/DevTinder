const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

// Signup
app.post("/signup", async (req, res) => {
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

    await user.save();
    res.send("User added Successfully!!");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

app.post("/login", async (req, res) => {
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

      res.cookie("token", token, { expires: new Date() + 7 * 3600000 });
      res.send("Login sucessfull!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending Connection Request");
  res.send(user.firstName + " Sent a connection request");
});

// User API - GET /user Get user data
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailID;

  try {
    const users = await User.find({ emailID: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch {
    res.status(400).send("Error fetching the user");
  }
});

// Update data of user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "image",
      "about",
      "gender",
      "age",
      "skills",
    ];

    const isAllowed = Object.keys(data).every((k) => {
      ALLOWED_UPDATES.includes(k);
    });

    if (!isAllowed) {
      throw new Error("Update not allowed ");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Update Failed:" + error);
  }
});

// Feed API - GET /feed - Get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude password
    res.send(users);
  } catch (err) {
    res.status(500).send("Failed to fetch users");
  }
});

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch(() => {
    console.error("Database not connected");
  });
