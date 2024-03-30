const Medicine = require("../models/medicineModel");

exports.addMedicine = async (req, res, next) => {
    try{
        const userId  = req.user._id;
        const medicineData = { ...req.body, userId };
        const medicine = await Medicine.create(medicineData);
    
        res.status(201).json(medicine);
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}

exports.getMedicine = async (req, res) => {
    try{
        const medicine = await Medicine.findById(req.params._id);
        if(!medicine)
            return res.status(404).json({
                success: false,
                message: "Medicine not found",
            });
        res.status(200).json(medicine);
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}

exports.updateMedicine = async (req, res) => {
    try{
        const medicine = await Medicine.findByIdAndUpdate(req.params._id, req.body);
        if(!medicine)
            return res.status(404).json({
                success: false,
                message: "Medicine not found",
            });
        return res.status(200).json({
            success: true,
            message: "Medicine updated successfully",
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}

exports.deleteMedicine = async (req, res) => {
    try{
        const medicine = await Medicine.findByIdAndDelete(req.params._id);
        if(!medicine)
            return res.status(404).json({
                success: false,
                message: "Medicine not found",
            });
        res.status(200).json({
            success: true,
            message: "Medicine deleted successfully",
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}