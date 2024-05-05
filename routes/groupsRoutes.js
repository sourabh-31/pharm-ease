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

router.post("/add", createGroupAndAddMedicines);

router.get("/all", getAllGroups);

router.get("/get/:id", getGroup);

router.delete("/delete/:id", deleteGroup);

router.put("/update/:id", updateGroup);

module.exports = router;
