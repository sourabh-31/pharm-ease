const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter a email address"],
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    select: false,
    required: [true, "Please enter a password"],
    min: [8, "Password should be more than 8 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  pharmacyName: {
    type: String,
    required: true,
  },
  ownerFirstName: {
    type: String,
    required: true,
  },
  ownerLastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  dlNo: {
    type: String,
  },
  gstNo: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
