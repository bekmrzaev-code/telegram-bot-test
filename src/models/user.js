const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    language: String,
    telegramId: { type: Number, unique: true },

    isSearching: { type: Boolean, default: false },
    isInChat: { type: Boolean, default: false },
    partnerId: { type: Number, default: null },
    banned: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);