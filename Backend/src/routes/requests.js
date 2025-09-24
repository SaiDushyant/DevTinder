const express = require("express");
const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequestSchema");
const User = require("../models/user");

requestsRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status Id");
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("User does not exist");
      }

      const existingConnection = await connectionRequest.findOne({
        $or: [
          { toUserId, fromUserId },
          { toUserId: fromUserId, fromUserId: toUserId },
        ],
      });
      if (existingConnection) {
        throw new Error("Request already exists");
      }

      const createConnection = new connectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await createConnection.save();
      res.json({
        message: "Connection request sent successfully",
        data: data,
      });
    } catch (error) {
      res.status(400).send("ERROR : " + error.message);
    }
  }
);

module.exports = requestsRouter;
