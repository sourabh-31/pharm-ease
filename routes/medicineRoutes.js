const express = require("express");
const {
  getMedicine,
  addMedicine,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicineController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/add", isAuthenticated, addMedicine);

router.get("/get/:id", isAuthenticated, getMedicine);

//router.get("/search/:_id", isAuthenticated, searchMedicine);

router.put("/update/:id", isAuthenticated, updateMedicine);

router.delete("/delete/:id", isAuthenticated, deleteMedicine);

module.exports = router;
