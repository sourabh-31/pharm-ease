const express = require("express");

const { isAuthenticated } = require("../middlewares/auth");
const {
  createInvoice,
  getSingleInvoice,
  getMyInvoices,
  deleteInvoice,
} = require("../controllers/invoiceController");

const router = express.Router();

router.post("/add", isAuthenticated, createInvoice);

router.get("/get/:id", isAuthenticated, getSingleInvoice);

router.get("/all", isAuthenticated, getMyInvoices);

router.delete("/delete/:id", isAuthenticated, deleteInvoice);

module.exports = router;
