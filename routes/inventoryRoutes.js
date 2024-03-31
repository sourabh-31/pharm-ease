const express = require("express");
const {
  getListofMedicines,
  getShortageMedicines,
  getExpiredMedicines,
} = require("../controllers/inventoryController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.get("/all", isAuthenticated, getListofMedicines);

router.get("/shortage", isAuthenticated, getShortageMedicines);

router.get("/expired", isAuthenticated, getExpiredMedicines);

module.exports = router;
