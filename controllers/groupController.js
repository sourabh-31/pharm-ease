const Medicine = require("../models/medicineModel");
const Group = require("../models/groupModel");

exports.createGroupAndAddMedicines = async (req, res) => {
  const { groupName, description, medicineIds } = req.body;
  const userId = req.user.id;

  try {
    const newGroup = new Group({
      userId,
      groupName: groupName,
      description: description,
    });
    await newGroup.save();

    const groupId = newGroup._id;

    if (medicineIds && medicineIds.length > 0) {
      const medicines = await Medicine.find({ _id: { $in: medicineIds } });
      await Promise.all(
        medicines.map(async (medicine) => {
          if (!medicine.groupIds) {
            medicine.groupIds = [];
          }
          medicine.groupIds.push(groupId);
          await medicine.save();
        })
      );
    }

    res.status(200).json({
      success: true,
      message: "Group created and medicines added successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllGroups = async (req, res) => {
  try {
    const userId = req.user.id;
    const groups = await Group.find({ userId: userId });
    if (!groups)
      return res.status(404).json({
        success: false,
        message: "Groups not found",
      });
    res.status(200).json(groups);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group)
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    res.status(200).json({
      success: true,
      message: "Group deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group)
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });

    res.status(200).json(group);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// not used in frontend

exports.updateGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body);
    if (!group)
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    return res.status(200).json({
      success: true,
      message: "Group updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
