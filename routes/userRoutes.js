const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUserDetails,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/new", registerUser);

router.post("/login", loginUser);

router.put("/me/update", isAuthenticated, updateUser);

router.get("/me", isAuthenticated, getUserDetails);

router.get("/logout", logoutUser);

module.exports = router;
