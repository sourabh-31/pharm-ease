const User = require("../models/UserModel");
const sendCookie = require("../utils/cookie");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sourabhhaldarh@gmail.com",
    pass: "qdly rzcu rodx hrgn",
  },
});

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
  user.ownerFirstName = req.body.ownerFirstName || user.ownerFirstName;
  user.ownerLastName = req.body.ownerLastName || user.ownerLastName;
  user.address = req.body.address || user.address;
  user.dlNo = req.body.dlNo || user.dlNo;
  user.gstNo = req.body.gstNo || user.gstNo;

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

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const mailOptions = {
      from: "sourabhhaldarh@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: `You are receiving this email because you (or someone else) has requested the reset of the password for your account.\n\n
               Please click on the following link, or paste it into your browser to complete the process:\n\n
               ${resetUrl}\n\n
               If you did not request this, please ignore this email and your password will remain unchanged.`,
    };

    await transport.sendMail(mailOptions);

    res.json({ message: "Password reset email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
