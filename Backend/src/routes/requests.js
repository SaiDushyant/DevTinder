const express = require("express");
const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestsRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending Connection Request");
  res.send(user.firstName + " Sent a connection request");
});

module.exports = requestsRouter;
