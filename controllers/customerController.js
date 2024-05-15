const Customer = require("../models/CustomerModel");

// Create a new customer
exports.createCustomer = async (req, res) => {
  const userId = req.user.id;
  const customerData = { ...req.body, userId };
  try {
    const customer = await Customer.create(customerData);
    res.status(201).json({
      status: "success",
      data: {
        customer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const userId = req.user.id;
    const customers = await Customer.find({ userId: userId });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Get a single customer by ID
exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({
        status: "fail",
        message: "Customer not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        customer,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!customer) {
      return res.status(404).json({
        status: "fail",
        message: "Customer not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        customer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer)
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
