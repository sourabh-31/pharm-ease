const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(`${process.env.MONGO_URI}/PharmEase`)
    .then(() => {
      console.log("Connected to Database Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
