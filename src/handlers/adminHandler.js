const Company = require("../models/company");
const Driver = require("../models/driver");

module.exports = (bot) => {

    // ✅ Add Company tugmasi
    bot.hears("🏢 Add Company", async (ctx) => {
        if (ctx.from.id != process.env.ADMIN_TELEGRAM_ID) return;

        ctx.session.action = "add_company";
        ctx.reply("Enter company name:");
    });

    // ✅ Add Driver tugmasi
    bot.hears("➕ Add Driver", async (ctx) => {
        console.log("Add Driver hears triggered, user ID:", ctx.from.id);
        if (ctx.from.id != process.env.ADMIN_TELEGRAM_ID) {
            return ctx.reply("You are not authorized to use this command.");
        }

        ctx.session.action = "add_driver_step1";
        ctx.reply("Enter Driver's full name:");
    });

    bot.on("text", async (ctx) => {
        if (ctx.from.id != process.env.ADMIN_TELEGRAM_ID) return;
        if (!ctx.session?.action) return;

        // -------- Add Company flow --------
        if (ctx.session.action === "add_company") {
            const name = ctx.message.text.trim();
            if (!name) return ctx.reply("Company name cannot be empty.");

            await Company.create({ name });
            ctx.reply(`✅ Company "${name}" added successfully!`);

            // Clear session
            ctx.session.action = null;
            return;
        }

        // -------- Add Driver flow --------
        switch (ctx.session.action) {
            case "add_driver_step1":
                ctx.session.newDriverName = ctx.message.text.trim();
                if (!ctx.session.newDriverName) return ctx.reply("Name cannot be empty.");
                ctx.session.action = "add_driver_step2";
                return ctx.reply("Enter Driver's CDL number:");

            case "add_driver_step2":
                ctx.session.newDriverCDL = ctx.message.text.trim();
                if (!ctx.session.newDriverCDL) return ctx.reply("CDL number cannot be empty.");
                ctx.session.action = "add_driver_step3";
                return ctx.reply("Enter Company name for this driver:");

            case "add_driver_step3":
                const companyName = ctx.message.text.trim();
                if (!companyName) return ctx.reply("Company name cannot be empty.");

                // Save driver to DB
                const driver = new Driver({
                    name: ctx.session.newDriverName,
                    cdl_number: ctx.session.newDriverCDL,
                    company: companyName
                });
                await driver.save();

                ctx.reply(`✅ Driver "${driver.name}" added successfully!`);

                // Clear session
                ctx.session.action = null;
                ctx.session.newDriverName = null;
                ctx.session.newDriverCDL = null;
                return;
        }
    });
};