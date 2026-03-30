import pdf from 'pdf-parse';
import { PDFDocument, rgb } from 'pdf-lib';

export async function extractText(buffer) {
    const data = await pdf(buffer);
    return data.text;
}

export async function generatePDF(text) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText(text, { x: 50, y: 700, size: 12, color: rgb(0, 0, 0) });
    return await pdfDoc.save();
}