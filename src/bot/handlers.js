import fs from 'fs';
import axios from 'axios';
import { extractText, generatePDF } from '../services/pdf.service.js';
import { improveCV } from '../services/ai.service.js';

export async function handlePDF(bot, chatId, fileId) {
    // 1️⃣ Telegram dan PDF download qilish
    const fileLink = await bot.getFileLink(fileId);
    const response = await axios.get(fileLink, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);

    bot.sendMessage(chatId, "⏳ PDFni qayta ishlayapmiz...");

    // 2️⃣ Text extract
    const text = await extractText(buffer);

    // 3️⃣ AI bilan CV ni optimallashtirish
    const improvedText = await improveCV(text);

    // 4️⃣ Yangi PDF yaratish
    const newPdfBuffer = await generatePDF(improvedText);

    // 5️⃣ PDF qaytarish
    fs.writeFileSync('improved.pdf', newPdfBuffer);
    await bot.sendDocument(chatId, 'improved.pdf');
}