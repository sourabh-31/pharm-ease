const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    userId: {
        ref: "User",
        type:mongoose.Schema.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true
    },
    expireDate: {
        type: Date,
        required: true
    },
    groupName: {
        type: String,
        required: true
    },
    howToUse: {
        type: String,
        required: true
    },
    sideEffects: {
        type: String,
        required: true
    },
});

const Medicine = new mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;