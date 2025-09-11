const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res) => {
  res.send({ name: "sai", city: "cbe" });
});

app.get("/admin/getAdmin", (req, res) => {
  res.send("Admin data fetched");
});

app.get("/admin/deleteAdmin", (req, res) => {
  res.send("Admin data deleted");
});

app.listen(3000, () => {
  console.log("server running of port 3000");
});
