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
    default: "Enter Name",
  },
  pharmacyId: {
    type: String,
    default: generatePharmacyId,
    unique: true,
  },
  ownerName: {
    type: String,
    default: "Enter Name",
  },
  ownerPhone: {
    type: Number,
    default: "",
  },
  branch: {
    type: String,
    default: "Enter branch",
  },
  address: {
    type: String,
    default: "Enter address",
  },
  pincode: {
    type: Number,
    default: "",
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

function generatePharmacyId() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth().toString().padStart(2, "0");
  const date = new Date().getDate().toString().padStart(2, "0");
  const hours = new Date().getHours().toString().padStart(2, "0");
  const minutes = new Date().getMinutes().toString().padStart(2, "0");
  const seconds = new Date().getSeconds().toString().padStart(2, "0");
  return `PH${year}${month}${date}${hours}${minutes}${seconds}`;
}

const User = new mongoose.model("User", userSchema);

module.exports = User;
