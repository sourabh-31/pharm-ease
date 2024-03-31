const express = require("express");
const {
  getMedicine,
  addMedicine,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicineController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/add", isAuthenticated, addMedicine);

router.get("/get/:_id", isAuthenticated, getMedicine);

//router.get("/search/:_id", isAuthenticated, searchMedicine);

router.put("/update/:_id", isAuthenticated, updateMedicine);

router.delete("/delete/:_id", isAuthenticated, deleteMedicine);

module.exports = router;
