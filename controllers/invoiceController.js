const Invoice = require("../models/InvoiceModel");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");

//create Invoice
exports.createInvoice = catchAsyncErrors(async (req, res, next) => {
  const invoiceData = req.body;

  const invoice = await Invoice.create(invoiceData);

  res.status(200).json({
    invoice,
    success: true,
    message: "Invoice created succesfully",
  });
});

//get single invoice
exports.getSingleInvoice = catchAsyncErrors(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id);

  if (!invoice) {
    return next(new ErrorHandler("Invoice not found"));
  }

  res.status(200).json({
    success: true,
    invoice,
  });
});

//get all invoice for respected logged in user

exports.getMyInvoices = catchAsyncErrors(async (req, res, next) => {
  const invoices = await Invoice.find();

  res.status(200).json(invoices);
});

//delete invoice

exports.deleteInvoice = catchAsyncErrors(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id);

  if (!invoice) {
    return next(new ErrorHandler("Invoice not found with this id"));
  }

  await invoice.deleteOne();

  res.status(200).json({
    success: true,
  });
});
