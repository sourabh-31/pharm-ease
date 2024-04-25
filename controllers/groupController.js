const Medicine = require("../models/medicineModel");
const Group = require("../models/groupModel");

exports.createGroup = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const groupData = { ...req.body, userId };
    const group = await Group.create(groupData);

    return res.status(201).json({
      success: true,
      message: "Group created successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllGroups = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = process.env.PAGE_SIZE;
    const skip = (page - 1) * pageSize;
    const projection = { __v: 0, medicines: 0, userId: 0 };
    const group = await Group.find({ userId: req.user.id }, projection).skip(skip)
      .limit(pageSize);
    res.status(200).json({ group });
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

    const { medicines, ...groupData } = group._doc;
    res.status(200).json({
      ...groupData,
      medicines: await Medicine.find({ groupName: group.name }),
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const { name: updatedGroupName, description } = req.body;
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    if (updatedGroupName && updatedGroupName !== group.name) {
      await Medicine.updateMany(
        { groupName: group.name },
        { groupName: updatedGroupName }
      );
      group.name = updatedGroupName;
    }
    group.description = description;
    await group.save();

    res.status(200).json({
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
