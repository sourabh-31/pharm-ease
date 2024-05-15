const Medicine = require("../models/medicineModel");

exports.addMedicine = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const medicineData = { ...req.body, userId };
    const medicine = await Medicine.create(medicineData);

    res.status(201).json(medicine);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.addMedicineToGroup = async (req, res) => {
  const { groupId, medicineIds } = req.body;

  try {
    const medicines = await Medicine.find({ _id: { $in: medicineIds } });

    await Promise.all(
      medicines.map(async (medicine) => {
        if (!medicine.groupIds) {
          medicine.groupIds = [];
        }
        // Check if the group ID is not already present
        if (!medicine.groupIds.includes(groupId)) {
          // Add the group ID to the medicine's groupIds array
          medicine.groupIds.push(groupId);
        }
        await medicine.save();
      })
    );

    res.status(200).json({
      success: true,
      message: "Group added to medicines successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllMedicines = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const userId = req.user.id;

    const medicines = await Medicine.find({
      expireDate: { $gt: today },
      userId: userId,
    });

    res.status(200).json(medicines);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine)
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    res.status(200).json(medicine);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getExpiredMedicines = async (req, res) => {
  try {
    const today = new Date();
    const userId = req.user.id;
    const medicines = await Medicine.find({ userId: userId }).lean();

    const expiredMedicines = medicines.filter((medicine) => {
      const expireDate = new Date(medicine.expireDate);
      return expireDate <= today;
    });
    if (!expiredMedicines) {
      return res.status(404).json({
        success: false,
        message: "No expired medicines found",
      });
    }
    res.status(200).json(expiredMedicines);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getMedicinesByGroup = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const medicines = await Medicine.find({
      groupIds: req.params.id,
      expireDate: { $gt: today },
    });

    res.status(200).json(medicines);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body);
    if (!medicine)
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    return res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine)
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.subtractMedicineQuantity = async (req, res) => {
  const medicineQuantities = req.body;

  try {
    await Promise.all(
      medicineQuantities.map(async (medQuantity) => {
        const { id: medicineId, quantity: subtractQuantity } = medQuantity;

        // Find the medicine by ID
        const medicine = await Medicine.findById(medicineId);

        if (!medicine) {
          throw new Error(`Medicine with ID ${medicineId} not found.`);
        }

        // Subtract the provided quantity from the existing quantity in the database
        medicine.quantity -= subtractQuantity;

        // Ensure the quantity doesn't go below zero
        if (medicine.quantity < 0) {
          throw new Error(
            `Not enough quantity of medicine with ID ${medicineId}.`
          );
        }

        await medicine.save();
      })
    );

    res.status(200).json({
      success: true,
      message: "Medicine quantities subtracted successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getExpiringMedicines = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const expiringMedicines = await Medicine.find({
      userId: userId,
      expireDate: {
        $gt: today.toISOString(),
        $lte: nextWeek.toISOString(),
      },
    });

    res.status(200).json(expiringMedicines);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getShortageMedicines = async (req, res) => {
  try {
    const userId = req.user.id;
    const shortageMedicines = await Medicine.find({
      userId: userId,
      quantity: { $lte: 10 },
    });

    res.status(200).json(shortageMedicines);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getEmptiedMedicines = async (req, res) => {
  try {
    const userId = req.user.id;
    const emptiedMedicines = await Medicine.find({
      userId: userId,
      quantity: 0,
    });

    res.status(200).json(emptiedMedicines);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
