const Order = require("../models/OrderModel");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");

//create order
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const { medicineId, medicineName, totalSale } = req.body;

  const order = await Order.create({
    user: req.user.id,
    medicineId,
    medicineName,
    totalSale,
  });

  res.status(200).json({
    order,
    success: true,
    message: "Order created successfully",
  });
});

//get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found"));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//get all invoice for respected logged in user

exports.getMyOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//delete invoice

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id"));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});
