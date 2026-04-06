const mainMenu = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "🔍 Find Partner", callback_data: "find" }],
            [{ text: "ℹ️ Help", callback_data: "help" }]
        ]
    }
};

const chatMenu = {
    reply_markup: {
        keyboard: [
            ["⏭ Next", "❌ Stop"],
            ["🚨 Report"]
        ],
        resize_keyboard: true
    }
};

module.exports = { mainMenu, chatMenu };