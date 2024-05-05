const express = require("express");
const {
  getMedicine,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getAllMedicines,
  getMedicinesByGroup,
  addMedicineToGroup,
  getExpiredMedicines,
  subtractMedicineQuantity,
} = require("../controllers/medicineController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/add", addMedicine);

router.post("/add/group", addMedicineToGroup);

router.get("/get/:id", getMedicine);

router.get("/get/group/:id", getMedicinesByGroup);

router.get("/all", getAllMedicines);

router.get("/all/expired", getExpiredMedicines);

//router.get("/search/:_id", isAuthenticated, searchMedicine);

router.put("/update/:id", updateMedicine);

router.delete("/delete/:id", deleteMedicine);

router.put("/subtract/quantity", subtractMedicineQuantity);

module.exports = router;
