
//Load pdf
import fs from "fs";
import path from "path";
import {PDFDocument} from "pdf-lib";

// Define the path to your folder containing PDFs
const folderPath = path.join('C:', 'Users', 'user', 'Desktop', 'pdfs');



//Read and Extract text from pdfs
async function extractTextFromPDF(filePath) {
    const fileBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(fileBytes);
    const pages = pdfDoc.getPages();
    let textContent = '';
    
    for (const page of pages) {
        const text = await page.getTextContent();
        textContent += text.items.map(item => item.str).join(' ') + ' ';
    }
    return textContent;
}

//extracting entire text from all pdfs
async function processPDFs(folderPath) {
    const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.pdf'));
    let allText = '';

    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const text = await extractTextFromPDF(filePath);
        allText += text + ' ';
    }
    return allText;
}


processPDFs(folderPath)
    .then(text => {
        console.log('Extracted text:', text);
        // Proceed to chunk the text, generate embeddings, and store them
    })
    .catch(err => console.error('Error processing PDFs:', err));


//chunk the text
function chunkText(text, chunkSize = 1000) {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
}





