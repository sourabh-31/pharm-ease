const express = require("express");

const { isAuthenticated } = require("../middlewares/auth");
const {
  createInvoice,
  getSingleInvoice,
  getMyInvoices,
  deleteInvoice,
} = require("../controllers/invoiceController");

const router = express.Router();

router.post("/add", createInvoice);

router.get("/getInvoice/:id", isAuthenticated, getSingleInvoice);

router.get("/all", getMyInvoices);

router.delete("/deleteInvoice/:id", isAuthenticated, deleteInvoice);

module.exports = router;
