const Document = require("../models/document");
const Driver = require("../models/driver");

module.exports = (bot) => {

    bot.on("callback_query", async (ctx) => {
        const data = ctx.callbackQuery.data;

        const [action, id] = data.split("_");

        const doc = await Document.findById(id);
        if (!doc) return;

        doc.status = action === "accept" ? "accepted" : "rejected";
        await doc.save();

        const driver = await Driver.findById(doc.driver_id);

        await ctx.telegram.sendMessage(driver.telegram_id,
            `${doc.type} ${doc.status}`
        );

        ctx.answerCbQuery("Updated!");
    });
};