const User = require("../models/UserModel");
const sendCookie = require("../utils/cookie");
const bcrypt = require("bcrypt");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");

//Register new user

// exports.registerUser = async (req, res, next) => {
//   try {

//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const userData = req.body;
  const { email } = userData;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const user = await User.create(userData);

  sendCookie(
    user,
    res,
    `Welcome ${user.ownerFirstName} ${user.ownerLastName}`,
    201
  );
});

//Login a User

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has given password and email both

  if (!email || !password)
    return next(new ErrorHandler("Please enter Email and Password", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return next(new ErrorHandler("Invalid Email or Password", 400));

  sendCookie(user, res, `Welcome back ${user.email}`, 200);
};

//update user info
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new ErrorHandler("User does not exist", 404));
  }

  user.pharmacyName = req.body.pharmacyName || user.pharmacyName;
  user.ownerName = req.body.ownerName || user.ownerName;
  user.ownerPhone = req.body.ownerPhone || user.ownerPhone;
  user.branch = req.body.branch || user.branch;
  user.address = req.body.address || user.address;
  user.pincode = req.body.pincode || user.pincode;

  await user.save();

  res.status(200).json({
    success: true,
    message: "User updated successfully",
  });
});

//Get logged in user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    user,
  });
});

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
