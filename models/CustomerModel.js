const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  userId: {
    ref: "User",
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  name: {
    type: "String",
    required: [true, "Please Enter patient name"],
  },
  mobileNumber: {
    type: "Number",
    required: [true, "Please Enter mobile number"],
  },
  address: {
    type: "String",
    required: [true, "Please Enter address"],
  },
  sex: {
    type: "String",
    required: [true, "Please Enter patient sex"],
  },
});

const Customer = new mongoose.model("Customer", customerSchema);

module.exports = Customer;
