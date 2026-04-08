const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
    name: String,
    cdl_number: String,
    company_id: mongoose.Schema.Types.ObjectId,
    telegram_id: Number
});

module.exports = mongoose.model("Driver", driverSchema);