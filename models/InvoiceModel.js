const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  customerInfo: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    cashierName: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paidAt: {
    type: Date,
    required: true,
  },
});

const Invoice = new mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
