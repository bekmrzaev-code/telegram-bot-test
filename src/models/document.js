const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    driver_id: mongoose.Schema.Types.ObjectId,
    type: String, // manuals, paper_log, tablet_holder
    status: {
        type: String,
        default: "pending"
    },
    file_id: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Document", documentSchema);