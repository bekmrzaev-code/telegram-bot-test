require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
require("./src/bot/bot");

const app = express();
connectDB();

app.get("/", (req, res) => res.send("Bot is running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));