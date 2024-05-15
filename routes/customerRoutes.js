const express = require("express");
const {
  createCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/add", isAuthenticated, createCustomer);

router.get("/all", isAuthenticated, getAllCustomers);

router.get("/get/:id", isAuthenticated, getCustomer);

router.put("/update/:id", isAuthenticated, updateCustomer);

router.delete("/delete/:id", isAuthenticated, deleteCustomer);

module.exports = router;
