import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
// import { handlePDF } from './handlers.js';

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on('message', (msg) => {
    bot.sendMessage(msg.chat.id, "Salom 👋 PDF yubor!");
});

bot.on('document', async (msg) => {
    try {
        const fileId = msg.document.file_id;
        await handlePDF(bot, msg.chat.id, fileId);
    } catch (error) {
        console.error('Error occurred while handling PDF:', error);
        bot.sendMessage(msg.chat.id, "❌ Xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.");
    }
    
});

export default bot;