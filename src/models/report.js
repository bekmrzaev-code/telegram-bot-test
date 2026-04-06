const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    reporterId: Number,
    reportedId: Number,
    reason: String
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);