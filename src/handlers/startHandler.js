const { saveUser } = require("../services/userService");
const { mainMenu } = require("../utils/keyboard");

module.exports = async (bot, msg) => {
    const userId = msg.from.id;
    const name = msg.from.first_name || "";
    const surname = msg.from.last_name || "";
    const username = msg.from.username || "";
    const language = msg.from.language_code || "en";

    try {
        const user = await saveUser({ telegramId: userId, name, surname, username, language });
        console.log(`👤 User saved: ${name} (@${username}) | ID: ${userId}`);
        bot.sendMessage(userId, "👋 Welcome to Anonymous Chat!", mainMenu);
    } catch (err) {
        console.error("❌ Failed to save user:", err);
        bot.sendMessage(userId, "❌ Something went wrong, please try again.");
    }
};