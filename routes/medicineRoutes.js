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
  getExpiringMedicines,
  getShortageMedicines,
  getEmptiedMedicines,
} = require("../controllers/medicineController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/add", isAuthenticated, addMedicine);

router.post("/add/group", isAuthenticated, addMedicineToGroup);

router.get("/get/:id", isAuthenticated, getMedicine);

router.get("/get/group/:id", isAuthenticated, getMedicinesByGroup);

router.get("/all", isAuthenticated, getAllMedicines);

router.get("/all/expired", isAuthenticated, getExpiredMedicines);

router.put("/update/:id", isAuthenticated, updateMedicine);

router.delete("/delete/:id", isAuthenticated, deleteMedicine);

router.put("/subtract/quantity", isAuthenticated, subtractMedicineQuantity);

router.get("/expiring", isAuthenticated, getExpiringMedicines);

router.get("/shortage", isAuthenticated, getShortageMedicines);

router.get("/empty", isAuthenticated, getEmptiedMedicines);

module.exports = router;
