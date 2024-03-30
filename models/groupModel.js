const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    userId: {
        ref: "User",
        type:mongoose.Schema.ObjectId,
        required: true
    },
    name: {
        type: String
    },
    description: {
        type: String,
    },
    medicines: Array,
});

const Group = new mongoose.model("Group", groupSchema);

module.exports = Group;