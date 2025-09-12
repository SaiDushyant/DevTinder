const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://testuser:3sFHZ1J7JBiWi850@cluster0.kg6hu5d.mongodb.net/DevTinder"
  );
};

module.exports = connectDB;
