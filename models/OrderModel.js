const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  medicineId: {
    type: mongoose.Schema.ObjectId,
    ref: "Medicine",
    required: true,
  },
  medicineName: {
    type: String,
    required: true,
  },
  madeAt: {
    type: Date,
    default: Date.now,
  },
  orderId: {
    type: String,
    default: generateOrderId,
    unique: true,
  },
  totalSale: {
    type: Number,
    default: true,
  },
});

function generateOrderId() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth().toString().padStart(2, "0");
  const date = new Date().getDate().toString().padStart(2, "0");
  const hours = new Date().getHours().toString().padStart(2, "0");
  const minutes = new Date().getMinutes().toString().padStart(2, "0");
  const seconds = new Date().getSeconds().toString().padStart(2, "0");
  return `OD${year}${month}${date}${hours}${minutes}${seconds}`;
}

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
