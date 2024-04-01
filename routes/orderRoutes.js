const express = require("express");

const { isAuthenticated } = require("../middlewares/auth");
const { createOrder, getSingleOrder, getMyOrders, deleteOrder } = require("../controllers/orderController");

const router = express.Router();

router.post("/new", isAuthenticated, createOrder);

router.get("/getOrder/:id", isAuthenticated, getSingleOrder);

router.get("/allOrder", isAuthenticated, getMyOrders);

router.delete("/deleteOrder/:id", isAuthenticated, deleteOrder);

module.exports = router;
