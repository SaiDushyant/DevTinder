const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

// Signup
app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added Successfully!!");
  } catch {
    res.status(400).send("Error adding user : ", error.message);
  }
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
app.get("/feed", (req, res) => {});

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("server running of port 3000");
    });
  })
  .catch(() => {
    console.error("Database not connected");
  });
