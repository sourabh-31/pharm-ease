const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  userId: {
    ref: "User",
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  groupName: {
    type: String,
    required: [true, "Please enter group name"],
  },
  description: {
    type: String,
  },
});

const Group = new mongoose.model("Group", groupSchema);

module.exports = Group;
