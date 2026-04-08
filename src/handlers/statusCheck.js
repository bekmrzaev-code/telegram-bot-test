const Document = require("../models/document");
const Driver = require("../models/driver");

module.exports = (bot) => {

    bot.hears("📊 Check Status", async (ctx) => {
        const driver = await Driver.findOne({ telegram_id: ctx.from.id });

        const docs = await Document.find({ driver_id: driver._id });

        let status = `Driver: ${driver.name}\n\n`;

        const types = ["manuals", "paper_log", "tablet_holder"];

        types.forEach(type => {
            const doc = docs.find(d => d.type === type);
            status += `${type}: ${doc ? doc.status : "not yet"}\n`;
        });

        ctx.reply(status);
    });
};