const Medicine = require("../models/medicineModel");

exports.getListofMedicines = async (req, res) => {
    try{
        const medicine = await Medicine.find( { userId : req.user._id } );
        res.status(200).json({medicine});
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}

exports.getShortageMedicines = async (req, res) => {
    try{
        const medicine = await Medicine.find( { userId : req.user._id, quantity : { $lt : 10 } } );
        res.status(200).json({medicine});
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}

exports.getExpiredMedicines = async (req, res) => {
    try{
        const medicine = await Medicine.find( { userId : req.user._id, expireDate : { $lt : new Date() } } );
        res.status(200).json({medicine});
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}
