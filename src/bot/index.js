import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on('message', (msg) => {
    bot.sendMessage(msg.chat.id, "Salom 👋 PDF yubor!");
});

export default bot;