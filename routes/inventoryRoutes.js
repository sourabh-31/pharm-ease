const express = require("express");
const {
  getListofMedicines,
  getShortageMedicines,
  getExpiredMedicines,
  getExpiringMedicines,
} = require("../controllers/inventoryController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.get("/all", isAuthenticated, getListofMedicines);

router.get("/shortage", isAuthenticated, getShortageMedicines);

router.get("/expired", isAuthenticated, getExpiredMedicines);

router.get("/expiring", isAuthenticated, getExpiringMedicines);

module.exports = router;
