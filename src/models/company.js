const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name: String,
    drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Driver" }]
});

module.exports = mongoose.model("Company", companySchema);