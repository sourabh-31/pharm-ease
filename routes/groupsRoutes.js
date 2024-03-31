const express = require("express");
const {
  createGroup,
  getAllGroups,
  getGroup,
  updateGroup,
  deleteGroup,
} = require("../controllers/groupController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/newGroup", isAuthenticated, createGroup);

router.get("/all", isAuthenticated, getAllGroups);

router.get("/get/:_id", isAuthenticated, getGroup);

router.put("/update/:_id", isAuthenticated, updateGroup);

router.delete("/delete/:_id", isAuthenticated, deleteGroup);

module.exports = router;
