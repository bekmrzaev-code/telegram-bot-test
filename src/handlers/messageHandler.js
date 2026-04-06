const User = require("../models/user");
const { disconnectUser } = require("../services/chatService");
const { isSpam } = require("../services/spamService");

module.exports = async (bot, msg) => {
    const userId = msg.from.id;

    const user = await User.findOne({ telegramId: userId });
    if (!user) return;

    if (isSpam(userId)) {
        return bot.sendMessage(userId, "⚠️ Slow down!");
    }

    // STOP
    if (msg.text === "❌ Stop") {
        const partnerId = await disconnectUser(userId);
        if (partnerId) {
            bot.sendMessage(partnerId, "❌ Partner left chat");
        }
        return bot.sendMessage(userId, "❌ Chat ended");
    }

    // NEXT
    if (msg.text === "⏭ Next") {
        const partnerId = await disconnectUser(userId);
        if (partnerId) {
            bot.sendMessage(partnerId, "⏭ Partner skipped");
        }
        bot.sendMessage(userId, "🔍 Finding new partner...");
    }

    // REPORT
    if (msg.text === "🚨 Report") {
        if (user.partnerId) {
            const Report = require("../models/report");
            await Report.create({
                reporterId: userId,
                reportedId: user.partnerId,
                reason: "User reported"
            });
            bot.sendMessage(userId, "🚨 Report sent");
        }
        return;
    }

    // FORWARD MESSAGE
    if (user.isInChat && user.partnerId) {
        bot.copyMessage(user.partnerId, userId, msg.message_id);
    }
};