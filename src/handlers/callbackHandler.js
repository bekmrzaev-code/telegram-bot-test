const User = require("../models/user");
const { addToQueue, getMatch } = require("../services/queueService");
const { connectUsers } = require("../services/chatService");
const { chatMenu } = require("../utils/keyboard");

module.exports = async (bot, query) => {
    const userId = query.from.id;

    if (query.data === "find") {
        const match = getMatch();

        if (match) {
            await connectUsers(match[0], match[1]);

            bot.sendMessage(match[0], "✅ Connected!", chatMenu);
            bot.sendMessage(match[1], "✅ Connected!", chatMenu);
        } else {
            addToQueue(userId);
            await User.updateOne({ telegramId: userId }, { isSearching: true });
            bot.sendMessage(userId, "⏳ Searching for partner...");
        }
    }

    if (query.data === "help") {
        bot.sendMessage(userId, "Use Find Partner to start chatting anonymously.");
    }
};