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
  medicineInfo: [
    {
      medicineName: {
        type: String,
        required: true,
      },
      medicineId: {
        type: mongoose.Schema.ObjectId,
        ref: "Medicine",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      rate: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      expireDate: {
        type: Date,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paidAt: {
    type: Date,
    required: true,
  },
  totalBill: {
    type: Number,
    required: true,
  },
});

const Invoice = new mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
