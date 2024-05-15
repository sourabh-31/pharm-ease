const express = require("express");
const {
  getAllGroups,
  getGroup,
  updateGroup,
  deleteGroup,
  createGroupAndAddMedicines,
} = require("../controllers/groupController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/add", isAuthenticated, createGroupAndAddMedicines);

router.get("/all", isAuthenticated, getAllGroups);

router.get("/get/:id", isAuthenticated, getGroup);

router.delete("/delete/:id", isAuthenticated, deleteGroup);

router.put("/update/:id", isAuthenticated, updateGroup);

module.exports = router;
