const mongoose = require("mongoose");
const validator = require("validator");

const medicineSchema = new mongoose.Schema({
  userId: {
    ref: "User",
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  medicineName: {
    type: String,
    required: [true, "Please enter medicine name"],
  },
  batchNumber: {
    type: String,
    required: [true, "Please enter batch number"],
  },
  pack: {
    type: Number,
    required: [true, "Please enter pack of medicine"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter medicine quantity"],
  },
  price: {
    type: Number,
    required: [true, "Please enter medicine price"],
  },
  purchaseDate: {
    type: String,
    required: [true, "Please enter a valid purchase date"],
  },
  expireDate: {
    type: String,
    required: [true, "Please enter a valid expiry date"],
  },
  groupName: {
    type: String,
  },
  groupIds: [
    {
      type: String,
    },
  ],
  shelf: {
    type: String,
  },
  howToUse: {
    type: String,
  },
  sideEffects: {
    type: String,
  },
});

const Medicine = new mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
