const Medicine = require("../models/medicineModel");

exports.getListofMedicines = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = process.env.PAGE_SIZE;
    const skip = (page - 1) * pageSize;

    const medicines = await Medicine.find({ userId: req.user.id })
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({ medicines });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


exports.getShortageMedicines = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = process.env.PAGE_SIZE;
    const skip = (page - 1) * pageSize;

    const medicine = await Medicine.find({
      userId: req.user.id,
      quantity: { $lt: 10 },
    }).skip(skip)
    .limit(pageSize);
    res.status(200).json({ medicine });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getExpiredMedicines = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = process.env.PAGE_SIZE;
    const skip = (page - 1) * pageSize;
    const medicine = await Medicine.find({
      userId: req.user.id,
      expireDate: { $lt: new Date() },
    }).skip(skip)
    .limit(pageSize);
    res.status(200).json({ medicine });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getExpiringMedicines = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(process.env.PAGE_SIZE);
    const skip = (page - 1) * pageSize;

    // Define the range for expiring medicines, for example, next 30 days
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 15);

    const medicines = await Medicine.find({
      userId: req.user.id,
      expireDate: { $gt: new Date(), $lte: futureDate },
    }).skip(skip)
    .limit(pageSize);

    res.status(200).json({ medicines });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

