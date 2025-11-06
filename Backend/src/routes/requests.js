const express = require("express");
const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequestSchema");
const User = require("../models/user");

const sendEmail = require("../utils/sendEmail");

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

      const emailRes = await sendEmail.run(
        "A new friend request from " + req.user.firstName,
        req.user.firstName + " is " + status + " in " + toUser.firstName
      );

      console.log(emailRes);

      res.json({
        message: "Connection request sent successfully",
        data: data,
      });
    } catch (error) {
      res.status(400).send("ERROR : " + error.message);
    }
  }
);

requestsRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const status = req.params.status;
      const requestId = req.params.requestId;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Status not allowed!!");
      }

      const connectionRequests = await connectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequests) {
        throw new Error("Connection request not found");
      }

      connectionRequests.status = status;

      const data = await connectionRequests.save();

      res.json({
        message: "Connection request " + status,
        data: data,
      });
    } catch (error) {
      res.status(400).send("ERROR : " + error.message);
    }
  }
);

module.exports = requestsRouter;
