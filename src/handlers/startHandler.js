    const Driver = require("../models/driver");

    module.exports = (bot) => {

        bot.start(async (ctx) => {
            // ✅ session mavjudligini tekshirish
            if (!ctx.session) ctx.session = {};

            // Admin login
            if (ctx.from.id == process.env.ADMIN_TELEGRAM_ID) {
                ctx.session.isAdmin = true;
                ctx.reply("Welcome Admin 👑", {
                    reply_markup: {
                        keyboard: [
                            ["👨‍✈️ Drivers List", "➕ Add Driver"],
                            ["🏢 Add Company"]
                        ],
                        resize_keyboard: true
                    }
                });
                return;
            }

            // Driver login
            ctx.session.isAdmin = false;
            ctx.reply("Enter your CDL number:");
        });

        bot.on("text", async (ctx) => {
            // ✅ session tekshirish
            if (!ctx.session) ctx.session = {};

            // Agar admin bo‘lsa, startHandler orqali driver tekshiruvi ishlamasin
            if (ctx.session.isAdmin) return;

            const input = ctx.message.text;
            console.log("id", ctx.from.id, "input", input);

            // CDL raqam bo‘yicha driver tekshirish
            const driver = await Driver.findOne({ cdl_number: input });
            if (!driver) return ctx.reply("You are not registered.");

            // Telegram ID saqlash
            driver.telegram_id = ctx.from.id;
            await driver.save();

            // Driverga xabar
            ctx.reply(`Hello Mr ${driver.name}`);
            ctx.reply("Choose:", {
                reply_markup: {
                    keyboard: [
                        ["📤 Upload Documents", "📊 Check Status"]
                    ],
                    resize_keyboard: true
                }
            });
        });
    };