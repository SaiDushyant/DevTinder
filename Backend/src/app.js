const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ name: "sai", city: "cbe" });
});

app.post("/user", (req, res) => {
  console.log(req.body);
  res.send("From post");
});

app.delete("/user", (req, res) => {
  res.send("From delete");
});

app.use("/test", (req, res) => {
  res.send("Hello from test");
});

app.use("/hello", (req, res) => {
  res.send("Hello from hello");
});

app.use("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(3000, () => {
  console.log("server running of port 3000");
});
