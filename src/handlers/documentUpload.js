const Document = require("../models/document");
const Driver = require("../models/driver");

module.exports = (bot) => {

    bot.hears("📤 Upload Documents", (ctx) => {
        ctx.reply("Choose document type:", {
            reply_markup: {
                keyboard: [
                    ["Manuals", "Paper Log"],
                    ["Tablet Holder"],
                    ["⬅️ Back"]
                ],
                resize_keyboard: true
            }
        });
    });

    bot.hears(["Manuals", "Paper Log", "Tablet Holder"], (ctx) => {
        ctx.session = { type: ctx.message.text.toLowerCase().replace(" ", "_") };
        ctx.reply("Send image:");
    });

    bot.on("photo", async (ctx) => {
        if (!ctx.session?.type) return;

        const driver = await Driver.findOne({ telegram_id: ctx.from.id });
        if (!driver) return;

        const file_id = ctx.message.photo.pop().file_id;

        const doc = await Document.create({
            driver_id: driver._id,
            type: ctx.session.type,
            file_id
        });

        // send to admin
        await ctx.telegram.sendPhoto(process.env.ADMIN_TELEGRAM_ID, file_id, {
            caption: `Driver: ${driver.name}\nDoc: ${doc.type}`,
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "✅ Accept", callback_data: `accept_${doc._id}` },
                        { text: "❌ Reject", callback_data: `reject_${doc._id}` }
                    ]
                ]
            }
        });

        ctx.reply("Uploaded successfully!");
    });
};