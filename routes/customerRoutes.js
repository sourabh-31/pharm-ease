const express = require("express");
const {
  createCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const router = express.Router();

router.post("/add", createCustomer);

router.get("/all", getAllCustomers);

router.get("/get/:id", getCustomer);

router.put("/update/:id", updateCustomer);

router.delete("/delete/:id", deleteCustomer);

module.exports = router;
