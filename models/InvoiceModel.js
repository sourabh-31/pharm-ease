const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  userId: {
    ref: "User",
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  billNo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  doctorAddress: {
    type: String,
    required: true,
  },
  paidAt: {
    type: String,
    required: true,
  },
  modeOfPayment: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
  },
  gst: {
    type: Number,
  },
  totalBill: {
    type: Number,
    required: true,
  },
  medicineInfo: Array,
});

const Invoice = new mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
