/*
import express from 'express';
import ollama from 'ollama';
import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));
app.post('/query-gemma2:2b', async (req, res) => {
    const { prompt, history } = req.body;
    let conversation = '';
    if (history && history.length > 0) {
        history.forEach(entry => {
            conversation += `User: ${entry.prompt}\nModel: ${entry.response}\n`;
        });
    }
    conversation += `User: ${prompt}`;
    const chatConfig = {
        model: "gemma2:2b",
        role: "user",
        content: conversation
    };
    try {
        console.log(`Running prompt with history: ${chatConfig.content}`);
        const response = await ollama.chat({
            model: chatConfig.model,
            messages: [{ role: chatConfig.role, content: chatConfig.content }]
        });
        const modelResponse = response.message.content.trim();
        console.log(`Model response: ${modelResponse}`);
        res.json({ text: modelResponse });
    } catch (error) {
        console.error('Error querying the model:', error.message);
        res.status(500).json({ error: 'Error querying the model' });
    }
});

app.post('/query-phi3', async (req, res) => {
    const { prompt, history } = req.body;
    let conversation = '';
    if (history && history.length > 0) {
        history.forEach(entry => {
            conversation += `User: ${entry.prompt}\nModel: ${entry.response}\n`;
        });
    }
    conversation += `User: ${prompt}`;
    const chatConfig = {
        model: "phi3",
        role: "user",
        content: conversation
    };
    try {
        console.log(`Running prompt with history: ${chatConfig.content}`);
        const response = await ollama.chat({
            model: chatConfig.model,
            messages: [{ role: chatConfig.role, content: chatConfig.content }]
        });

        const modelResponse = response.message.content.trim();
        console.log(`Model response: ${modelResponse}`);
        res.json({ text: modelResponse });
    } catch (error) {
        console.error('Error querying the model:', error.message);
        res.status(500).json({ error: 'Error querying the model' });
    }
});


app.post('/query-gvp', async (req, res) => {
    
        
        try {
            
            const pdfPath = ['C:\\Users\\user\\Desktop\\llm\\llm\\test\\data\\05-versions-space.pdf','C:\\Users\\user\\Desktop\\llm\\llm\\test\\data\\06-versions-space.pdf'];

            
            const dataBuffer = fs.readFileSync(pdfPath);
            
            
            const data = await pdfParse(dataBuffer);
            
            
            const text = data.text;
            const chunkSize = 1000;
            const chunks = [];
    
            for (let i = 0; i < text.length; i += chunkSize) {
                chunks.push(text.slice(i, i + chunkSize));
            }
    
            
            chunks.forEach((chunk, index) => {
                console.log(`Chunk ${index + 1}:`, chunk);
            });
    
            // Return chunks as response
            res.json({ chunks });
        } catch (error) {
            console.error('Error processing the PDF:', error.message);
            res.status(500).json({ error: 'Error processing the PDF' });
        }
        
});


app.post('/generate-embeddings', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        const response = await ollama.embed({
            model: 'gemma2:2b',
            input: text
        });
        const embeddings = response.embeddings;
        res.json({ embeddings });
    } catch (error) {
        console.error('Error generating embeddings:', error.message);
        res.status(500).json({ error: 'Error generating embeddings' });
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

*/





import express from 'express';
import ollama from 'ollama';
import fs from 'fs';
//import path from 'path';
//import { dirname, join } from 'path';
//import { fileURLToPath } from 'url';

import pdfParse from 'pdf-parse';
//import faiss from "faiss";
import bodyParser from 'body-parser';
const app = express();
const port = 3000;
app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(express.static('public'));


// Route to handle querying the models
/*
app.post('/query-gemma2:2b', async (req, res) => {
    const { prompt, history, useVectorStore } = req.body;

    let conversation = '';

    // Include history in the conversation if available
    if (history && history.length > 0) {
        history.forEach(entry => {
            conversation += `User: ${entry.prompt}\nModel: ${entry.response}\n`;
        });
    }

    // Add vector store context if using it
    if (useVectorStore) {
        conversation += `Context from Vector Store: ${prompt}\n`; // Example context
    }

    // Add the current user prompt
    conversation += `User: ${prompt}`;

    try {
        console.log(`Running prompt with conversation: ${conversation}`);

        let response;

        if (useVectorStore) {
            // When using vector store, fetch from vector store context
            response = await fetch('http://localhost:3000/query-gemma2:2b', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: conversation, history, useVectorStore: true })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch response from the model with vector store context');
            }
        } else {
            // When not using vector store, handle the prompt normally
            response = await ollama.chat({
                model: "gemma2:2b",
                messages: [{ role: "user", content: conversation }]
            });
        }

        const modelResponse = response.message ? response.message.content.trim() : await response.json();
        console.log(`Model response: ${modelResponse}`);
        res.json({ text: modelResponse });

    } catch (error) {
        console.error('Error querying the model:', error.message);
        res.status(500).json({ error: 'Error querying the model' });
    }
});
*/

app.post('/query-gemma2:2b', async (req, res) => {
    const { prompt, history } = req.body;
    let conversation = '';
    if (history && history.length > 0) {
        history.forEach(entry => {
            conversation += `User: ${entry.prompt}\nModel: ${entry.response}\n`;
        });
    }
    conversation += `User: ${prompt}`;
    const chatConfig = {
        model: "gemma2:2b",
        role: "user",
        content: conversation
    };
    try {
        console.log(`Running prompt with history: ${chatConfig.content}`);
        const response = await ollama.chat({
            model: chatConfig.model,
            messages: [{ role: chatConfig.role, content: chatConfig.content }]
        });
        const modelResponse = response.message.content.trim();
        console.log(`Model response: ${modelResponse}`);
        res.json({ text: modelResponse });
    } catch (error) {
        console.error('Error querying the model:', error.message);
        res.status(500).json({ error: 'Error querying the model' });
    }
});


app.post('/query-phi3', async (req, res) => {
    const { prompt, history } = req.body;
    let conversation = '';
    if (history && history.length > 0) {
        history.forEach(entry => {
            conversation += `User: ${entry.prompt}\nModel: ${entry.response}\n`;
        });
    }
    conversation += `User: ${prompt}`;
    const chatConfig = {
        model: "phi3",
        role: "user",
        content: conversation
    };
    try {
        console.log(`Running prompt with history: ${chatConfig.content}`);
        const response = await ollama.chat({
            model: chatConfig.model,
            messages: [{ role: chatConfig.role, content: chatConfig.content }]
        });

        const modelResponse = response.message.content.trim();
        console.log(`Model response: ${modelResponse}`);
        res.json({ text: modelResponse });
    } catch (error) {
        console.error('Error querying the model:', error.message);
        res.status(500).json({ error: 'Error querying the model' });
    }
});

/*


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const vectorStorePath = join(__dirname, 'vectorStore.json');

// Ensure the file is empty initially
function initializeVectorStore() {
    if (!fs.existsSync(vectorStorePath)) {
        fs.writeFileSync(vectorStorePath, JSON.stringify([]));
    }
}

// Load vector store (embeddings) from the file
let vectorStore = [];
initializeVectorStore();

try {
    const fileContent = fs.readFileSync(vectorStorePath, 'utf8');
    
    if (!Array.isArray(vectorStore)) {
        throw new Error('Vector store is not an array');
    }
} catch (error) {
    console.error('Error reading or parsing vector store file:', error.message);
}

// Helper function to save embeddings
function saveEmbeddings(embeddings) {
    fs.writeFileSync(vectorStorePath, JSON.stringify(embeddings, null, 2));
}

// Helper function to calculate cosine similarity



function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, val, idx) => sum + val * vecB[idx], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}

function retrieveFromVectorStore(prompt, documentEmbeddings){
    let bestMatch=null;
    let highestSimilarity=-Infinity;
    const embeddingResponse = ollama.embed({ model, input: prompt });
    const queryEmbedding = embeddingResponse.embeddings[0];

}
const retrieveFromVectorStore = async (prompt, vectorStoreData, model) => {
    try {
        // Generate embedding for the user prompt
        const embeddingResponse = await ollama.embed({ model, input: prompt });
        const queryEmbedding = embeddingResponse.embeddings[0];

        
        const embeddings = vectorStoreData.embeddings; // Assuming vectorStoreData contains embeddings
        const contexts = vectorStoreData.contexts; // Assuming vectorStoreData contains context strings
          
        // Calculate similarities
        const similarities = embeddings.map((embedding, index) => ({
            index,
            similarity: cosineSimilarity(queryEmbedding, embedding)
        }));

        
        similarities.sort((a, b) => b.similarity - a.similarity);
        const topIndex = similarities[0].index;

        
        const context = contexts[topIndex] || 'No relevant context found.';

        
        const combinedPrompt = `Context from Vector Store: ${context}\nUser: ${prompt}`;

        
        const response = await ollama.chat({
            model: model,
            messages: [{ role: 'user', content: combinedPrompt }]
        });
        return response.message.content.trim();
    } catch (error) {
        console.error('Error retrieving from vector store:', error.message);
        throw new Error('Failed to retrieve response from vector store');
    }
};


app.post('/query-retrieve', async (req, res) => {
    const { prompt, vectorStoreData, useVectorStore, model } = req.body;

    try {
        let conversation = '';

        if (useVectorStore && vectorStoreData) {
            const context = await retrieveFromVectorStore(prompt, vectorStoreData, model);
            conversation = `Context from Vector Store: ${context}\nUser: ${prompt}`;
        } else {
            conversation = `User: ${prompt}`;
        }

        console.log(`Querying with conversation: ${conversation}`);

        const response = await ollama.chat({
            model: 'gemma2:2b',
            messages: [{ role: 'user', content: conversation }]
        });

        const modelResponse = response.message.content.trim();
        console.log(`Model response: ${modelResponse}`);
        res.json({ text: modelResponse });

    } catch (error) {
        console.error('Error in /query-retrieve route:', error.message);
        res.status(500).json({ error: 'Error querying the model' });
    }
});
*/

let doc='';
async function extractFromPDF(pdfPaths)
{
    let i=0;
    for (const pdfPath of pdfPaths) {
        console.log(`Processing PDF at: ${pdfPath}`);
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdfParse(dataBuffer);
        doc+=data.text;
    }
    console.log(doc);
    return doc;
}

async function Embeddings(text) {
    const response = await ollama.embed({ model: 'gemma2:2b', input: text });
    return response.embeddings;
}
/*
async function cosineSimilarity(vecA, vecB) {
    const dotProduct = await  vecA.reduce((sum, val, idx) => sum + val * vecB[idx], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}
*/
function calculateCosineSimilarity(vectorA, vectorB) {
    // Ensure both vectors are the same length
    console.log("vector A length: ", vectorA.length);
    console.log("vector B length: ", vectorB.length);

    if (vectorA.length !== vectorB.length) {
        throw new Error('Vectors must be the same length');
    }

    // Calculate dot product
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < vectorA.length; i++) {
        dotProduct += vectorA[i] * vectorB[i];
        magnitudeA += vectorA[i] * vectorA[i];
        magnitudeB += vectorB[i] * vectorB[i];
    }

    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);
    console.log("dotProduct: ", dotProduct);
    console.log("maginute A: ", magnitudeA);
    console.log("maginute B: ", magnitudeB);

    if (magnitudeA === 0 || magnitudeB === 0) {
        return 0; // Return zero similarity if either vector is zero magnitude
    }
    const similarity = dotProduct / (magnitudeA * magnitudeB);

    return similarity;
}
/*
async function retrieveFromVectorStore(queryEmbeddings, documentEmbeddings){
    let bestMatch=null;
    let highestSimilarity=-Infinity;
    documentEmbeddings.forEach((embedding, index) =>{
        const similarity=calculateCosineSimilarity(queryEmbeddings[0], embedding);
        console.log("similarity: ",similarity);
        
        if (similarity>highestSimilarity)
        {
            highestSimilarity=similarity;
            bestMatch=index;
            console.log(index);
        }

    });
    return bestMatch;
}
*/
let bestMatch = [];
async function retrieveFromVectorStore(queryEmbeddings, documentEmbeddings) {
    let highestSimilarity = -Infinity;

    for (let index = 0; index < documentEmbeddings.length; index++) {
        const embedding = documentEmbeddings[index];
        const similarity = calculateCosineSimilarity(queryEmbeddings[0], embedding);
        console.log(`Document ${index} similarity: `, similarity);
        bestMatch.push(index);
    }

    return bestMatch;
}


let docEmbeddings=null;
let pdf='';
app.post('/query-embedding' , async (req,res) => {
    try 
    {
        const pdfPaths = ['C:\\Users\\user\\Desktop\\llm\\llm\\test\\data\\05-versions-space.pdf','C:\\Users\\user\\Desktop\\llm\\llm\\test\\data\\06-versions-space.pdf'];
        pdf=await extractFromPDF(pdfPaths);
        //console.log("pdf: ",pdf);
        //docEmbeddings=await Embeddings(pdf);
        /*docEmbeddings = await Promise.all(pdf.map(async (doc1) => {
            return await Embeddings(doc1);
        }));*/
       console.log('Document Embeddings:', docEmbeddings);
        //res.json({ embeddings: docEmbeddings });
    }
    catch{
        console.log("error in loading pdfs");
    }
});

app.post('/query-gvp', async(req,res) => {
    try{
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }
        //const queryEmbeddings=await Embeddings(prompt);
        //console.log("Query Embeddings: ",queryEmbeddings);
        //console.log("doc embeddings: ",  docEmbeddings);
        //bestMatch=await retrieveFromVectorStore(queryEmbeddings, docEmbeddings);
        //console.log("best match: ",bestMatch);
        //const bestMatchText = bestMatch.map(index => doc[index]);
        //console.log("doc", doc);
        //const bestMatchText=pdf;
        let bestMatchText=doc;
        //const bestMatchText = doc.map((docs, index) => docs[index]).join("\n");

        //const bestMatchText = bestMatch.map(index => doc[index]).join("\n");
        console.log("best match text: ",bestMatchText);
        const chatConfig = {
            model: "gemma2:2b",
            role: "user"
        };
        const response = await ollama.chat({
            model: chatConfig.model,
            messages: [{ role: chatConfig.role, content: `Based on the documents: ${bestMatchText} \n Answer this: ${prompt}`}]
        });
        const modelResponse = response.message.content.trim();
        console.log(`Model response: ${modelResponse}`);
        res.json({ text: modelResponse });
    } catch (error) {
        console.error('Error querying the model:', error.message);
        res.status(500).json({ error: 'Error querying the model' });
    }    
});

/*
app.post('/query-gvp', async (req, res) => {
    
    console.log('Request received');

    try {
        const pdfPaths = ['C:\\Users\\user\\Desktop\\llm\\llm\\test\\data\\05-versions-space.pdf','C:\\Users\\user\\Desktop\\llm\\llm\\test\\data\\06-versions-space.pdf'];

        const allChunks = [];
       
        for (const pdfPath of pdfPaths) {
            console.log(`Processing PDF at: ${pdfPath}`);
            const dataBuffer = fs.readFileSync(pdfPath);
            const data = await pdfParse(dataBuffer);
            text = data.text;
            const chunkSize = 1000;
            const chunks = [];

            for (let i = 0; i < text.length; i += chunkSize) {
                chunks.push(text.slice(i, i + chunkSize));
            }

            allChunks.push(...chunks);
        }

        console.log(`Chunks processed: ${allChunks.length}`);

        if (!allChunks || allChunks.length === 0) {
            return res.status(400).json({ error: 'No chunks to process' });
        }

        try {
            console.log('Generating embeddings...');
            const embeddings = await ollama.embed({ model: 'gemma2:2b', input: text })
            console.log('Embeddings generated:', embeddings);
            saveEmbeddings(embeddings);
            



            
        } catch (error) {
            console.error('Error generating embeddings:', error.message);
            return res.status(500).json({ error: 'Error generating embeddings' });
        }
    } catch (error) {
        console.error('Error processing the PDFs:', error.message);
        return res.status(500).json({ error: 'Error processing the PDFs' });
    }
});

*/

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});





































