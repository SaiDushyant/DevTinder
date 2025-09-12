const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Sai",
    lastName: "Dushyant",
    emailID: "saidushyant04@gmail.com",
    password: "s1a2i3$$",
  });

  try {
    await user.save();
    res.send("User Added Successfully!!");
  } catch (error) {
    res.status(400).send("Error adding User : ", error.message);
  }
});

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
