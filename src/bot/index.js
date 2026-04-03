import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const users = {};

// USER INIT
function getUser(chatId) {
    if (!users[chatId]) {
        users[chatId] = {
            habits: []
        };
    }
    return users[chatId];
}

// DATE
function getToday() {
    return new Date().toISOString().split('T')[0];
}

function getYesterday() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
}

//
// 🔥 MAIN MENU
//
function mainMenu(chatId) {
    bot.sendMessage(chatId, "📋 Menu:", {
        reply_markup: {
            keyboard: [
                ["➕ Add Habit"],
                ["📋 My Habits"]
            ],
            resize_keyboard: true
        }
    });
}

//
// START
//
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "👋 Welcome to Habit Bot!");
    mainMenu(msg.chat.id);
});

//
// HANDLE TEXT BUTTONS
//
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === "➕ Add Habit") {
        bot.sendMessage(chatId, "Habit nomini yozing:");

        bot.once('message', (msg2) => {
            const habitName = msg2.text;

            const user = getUser(chatId);

            user.habits.push({
                name: habitName,
                streak: 0,
                lastDone: null
            });

            bot.sendMessage(chatId, `✅ Qo‘shildi: ${habitName}`);
            mainMenu(chatId);
        });
    }

    if (text === "📋 My Habits") {
        const user = getUser(chatId);

        if (user.habits.length === 0) {
            return bot.sendMessage(chatId, "❌ Habit yo‘q");
        }

        user.habits.forEach((h, i) => {
            bot.sendMessage(
                chatId,
                `📌 ${h.name}\n🔥 Streak: ${h.streak}`,
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: "✅ Done", callback_data: `done_${i}` },
                                { text: "❌ Delete", callback_data: `del_${i}` }
                            ]
                        ]
                    }
                }
            );
        });
    }
});

//
// INLINE BUTTONS
//
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const user = getUser(chatId);
    const data = query.data;

    // DONE
    if (data.startsWith('done_')) {
        const index = parseInt(data.split('_')[1]);
        const habit = user.habits[index];

        const today = getToday();
        const yesterday = getYesterday();

        if (habit.lastDone === today) {
            return bot.answerCallbackQuery(query.id, {
                text: "Bugun allaqachon qilding 😄"
            });
        }

        if (habit.lastDone === yesterday) {
            habit.streak += 1;
        } else {
            habit.streak = 1;
        }

        habit.lastDone = today;

        bot.sendMessage(chatId, `🔥 ${habit.name}\nStreak: ${habit.streak}`);
        bot.answerCallbackQuery(query.id);
    }

    // DELETE
    if (data.startsWith('del_')) {
        const index = parseInt(data.split('_')[1]);

        const deleted = user.habits.splice(index, 1);

        bot.sendMessage(chatId, `❌ O‘chirildi: ${deleted[0].name}`);
        bot.answerCallbackQuery(query.id);
    }
});