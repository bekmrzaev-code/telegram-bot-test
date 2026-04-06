const TelegramBot = require("node-telegram-bot-api");
const startHandler = require("../handlers/startHandler");
const callbackHandler = require("../handlers/callbackHandler");
const messageHandler = require("../handlers/messageHandler");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => startHandler(bot, msg));

bot.on("callback_query", (query) => callbackHandler(bot, query));

bot.on("message", (msg) => messageHandler(bot, msg));

module.exports = bot;