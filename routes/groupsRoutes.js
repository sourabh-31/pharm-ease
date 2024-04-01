const express = require("express");
const {
  createGroup,
  getAllGroups,
  getGroup,
  updateGroup,
  deleteGroup,
} = require("../controllers/groupController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/newGroup", isAuthenticated, createGroup);

router.get("/all", isAuthenticated, getAllGroups);

router.get("/get/:id", isAuthenticated, getGroup);

router.put("/update/:id", isAuthenticated, updateGroup);

router.delete("/delete/:id", isAuthenticated, deleteGroup);

module.exports = router;
