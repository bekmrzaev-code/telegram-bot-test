const { Telegraf, session } = require("telegraf");

// ✅ Bitta bot instance
const bot = new Telegraf(process.env.BOT_TOKEN);

// ✅ Session middleware qo‘shish
bot.use(session());

// handlers
const startHandler = require("../handlers/startHandler");
const driverHandler = require("../handlers/statusCheck");
const adminHandler = require("../handlers/adminHandler");
const uploadHandler = require("../handlers/documentUpload");

// handlers ulash
startHandler(bot);
driverHandler(bot);
adminHandler(bot);
uploadHandler(bot);

module.exports = function startBot() {
    bot.launch()
        .then(() => console.log("🤖 Bot started"))
        .catch(err => console.log(err));

    // graceful stop
    process.once("SIGINT", () => bot.stop("SIGINT"));
    process.once("SIGTERM", () => bot.stop("SIGTERM"));
};