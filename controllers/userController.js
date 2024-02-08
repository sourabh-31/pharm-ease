const User = require("../models/UserModel");
const sendCookie = require("../utils/cookie");
const bcrypt = require("bcrypt");

//Register new user

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const user = await User.create({ username, password });

  sendCookie(user, res, "Registered Successfully", 201);
};

//Login a User

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  //checking if user has givne password and email both

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter username and password",
    });
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid username or password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  sendCookie(user, res, `Welcome back ${user.username}`, 200);
};

//Logout a user

exports.logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logout successful",
    });
};
