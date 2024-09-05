/*
let chatHistory = [];
        document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('query-form');
            const textarea = document.getElementById('prompt');
            const stopButton = document.querySelector('.stop');
            const submitButton=document.querySelector(".submit");
            const modelButtons = document.querySelectorAll('.buttons button');
            let currentModel = "gemma2:2b"; 
            let stopResponse = false;
            const toggleButton = document.querySelector('.icon');
            const sidebar = document.querySelector('.sidebar');
            const chatContainer = document.querySelector('.chat-container');

            toggleButton.addEventListener('click', () => {
                sidebar.classList.toggle('active');

            if (sidebar.classList.contains('active')) {
                sidebar.style.display = 'flex';
                chatContainer.style.width = '75%';
                toggleButton.style.background="#202123";
            } else {
                toggleButton.style.background="#40414f";
                sidebar.style.display = 'none';
                chatContainer.style.width = '100%';
            }
        });

            
            const h3Element = document.querySelector('.buttons h3');
            modelButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    modelButtons.forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');
                    currentModel = e.target.dataset.model;
                    h3Element.textContent = "You are using: " + e.target.textContent;
                });
            });

            textarea.addEventListener('input', () => {
                if (textarea.value.trim()) {
                    submitButton.style.display = 'block';
                    stopButton.style.display = 'none';
                } else {
                    submitButton.style.display = 'none';
                    stopButton.style.display = 'none';
                }
            });

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const prompt = textarea.value;
                textarea.value = '';
                submitButton.style.display = 'none';
                stopButton.style.display = 'block';
                const responsesEl = document.getElementById('responses');
                stopResponse = false;
                console.log(chatHistory);
                const userResponseContainer = document.createElement('div');
                userResponseContainer.className = 'response-block user';
                userResponseContainer.innerHTML = `
                    <span class="icon">🧑</span>
                    <pre>${prompt}</pre>
                `;
                responsesEl.appendChild(userResponseContainer);
                const modelResponseContainer = document.createElement('div');
                modelResponseContainer.className = 'response-block';
                modelResponseContainer.innerHTML = `
                    <span class="icon">🤖</span>
                    <pre id="response-${Date.now()}"></pre>
                    <div class="loading">
                          
                    </div>
                `;
                responsesEl.appendChild(modelResponseContainer);
                responsesEl.scrollTop = responsesEl.scrollHeight;
                const responseEl = modelResponseContainer.querySelector('pre:last-of-type');
                const loadingEl = modelResponseContainer.querySelector('.loading');
                try {
                    const response = await fetch(`http://localhost:3000/query-${currentModel}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            prompt: prompt, 
                            history: chatHistory
                        })
                    });
                    loadingEl.style.display = 'none';
                    const data = await response.json();
                    const fullText = data.text || 'No response text';
                    chatHistory.push({prompt: prompt, response: fullText});
                    console.log(chatHistory); 
                    let displayedText = '';
                    for (let i = 0; i < fullText.length; i++) {
                        if (stopResponse) {
                            loadingEl.style.display = 'none';
                            break;
                        }
                        displayedText += fullText[i];
                        responseEl.textContent = displayedText;
                        await new Promise(resolve => setTimeout(resolve, 30));
                    }
                    stopButton.style.display = 'none';
                } catch (error) {
                    responseEl.textContent = 'Error querying the model';
                    loadingEl.style.display = 'none';
                    stopButton.style.display = 'none';
                }
            });

            stopButton.addEventListener('click', () => {
                stopResponse = true;
                const loadings = document.querySelectorAll('.loading');
                loadings.forEach(loading => loading.style.display = 'none');
                stopButton.style.display = 'none';
            });

            document.querySelector('.delete').addEventListener('click', () => {
                const responseClear = document.getElementById('responses');
                responseClear.innerHTML = `
                    <div class="response-block">
                        <span class="icon">🤖</span>
                        <pre>Hello, How can I help you?</pre>
                    </div>`;
                chatHistory = [];
            });

            textarea.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    form.dispatchEvent(new Event('submit'));
                }
            });
            submitButton.style.display = 'none';
            stopButton.style.display = 'none';



            const gvpButton = document.getElementById('gvp');

            gvpButton.addEventListener('click', async () => {
                try {
                    const response = await fetch('/query-gvp', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
        
                    if (response.ok) {
                        const data = await response.json();
                        console.log('PDF Chunks:', data.chunks);
                        alert('PDF chunks have been logged to the console.');
                    } else {
                        console.error('Failed to load PDF chunks');
                    }
                } catch (error) {
                    console.error('Error fetching PDF chunks:', error.message);
                }
            });

            

    });

*/


document.addEventListener('DOMContentLoaded', () => {
    let chatHistory = [];
    const form = document.getElementById('query-form');
    const textarea = document.getElementById('prompt');
    const stopButton = document.querySelector('.stop');
    const submitButton = document.querySelector(".submit");
    const modelButtons = document.querySelectorAll('.buttons button');
    let currentModel = "gemma2:2b";
    let stopResponse = false;
    const toggleButton = document.querySelector('.icon');
    const sidebar = document.querySelector('.sidebar');
    const chatContainer = document.querySelector('.chat-container');

    // Toggle sidebar visibility
    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');

        if (sidebar.classList.contains('active')) {
            sidebar.style.display = 'flex';
            chatContainer.style.width = '75%';
            toggleButton.style.background = "#202123";
        } else {
            toggleButton.style.background = "#40414f";
            sidebar.style.display = 'none';
            chatContainer.style.width = '100%';
        }
    });

    // Update the current model and display the selected model name
    const h3Element = document.querySelector('.buttons h3');
    modelButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            modelButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            currentModel = e.target.dataset.model;
            h3Element.textContent = "You are using: " + e.target.textContent;
        });
    });

    // Show/hide submit and stop buttons based on textarea input
    textarea.addEventListener('input', () => {
        if (textarea.value.trim()) {
            submitButton.style.display = 'block';
            stopButton.style.display = 'none';
        } else {
            submitButton.style.display = 'none';
            stopButton.style.display = 'none';
        }
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const prompt = textarea.value;
        textarea.value = '';
        submitButton.style.display = 'none';
        stopButton.style.display = 'block';
        const responsesEl = document.getElementById('responses');
        stopResponse = false;

        // Append user prompt to chat
        const userResponseContainer = document.createElement('div');
        userResponseContainer.className = 'response-block user';
        userResponseContainer.innerHTML = `
            <span class="icon">🧑</span>
            <pre>${prompt}</pre>
        `;
        responsesEl.appendChild(userResponseContainer);

        // Append model response placeholder to chat
        const modelResponseContainer = document.createElement('div');
        modelResponseContainer.className = 'response-block';
        modelResponseContainer.innerHTML = `
            <span class="icon">🤖</span>
            <pre id="response-${Date.now()}"></pre>
            <div class="loading"></div>
        `;
        responsesEl.appendChild(modelResponseContainer);
        responsesEl.scrollTop = responsesEl.scrollHeight;

        const responseEl = modelResponseContainer.querySelector('pre:last-of-type');
        const loadingEl = modelResponseContainer.querySelector('.loading');

        try {
            const response = await fetch(`/query-${currentModel}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: prompt,
                    history: chatHistory
                })
            });

            loadingEl.style.display = 'none';
            const data = await response.json();
            const fullText = data.text || 'No response text';
            chatHistory.push({ prompt: prompt, response: fullText });

            let displayedText = '';
            for (let i = 0; i < fullText.length; i++) {
                if (stopResponse) {
                    loadingEl.style.display = 'none';
                    break;
                }
                displayedText += fullText[i];
                responseEl.textContent = displayedText;
                await new Promise(resolve => setTimeout(resolve, 30));
            }
            console.log(chatHistory);
            stopButton.style.display = 'none';
        } catch (error) {
            responseEl.textContent = 'Error querying the model';
            loadingEl.style.display = 'none';
            stopButton.style.display = 'none';
        }
    });

    // Handle stop button click
    stopButton.addEventListener('click', () => {
        stopResponse = true;
        const loadings = document.querySelectorAll('.loading');
        loadings.forEach(loading => loading.style.display = 'none');
        stopButton.style.display = 'none';
    });

    // Clear chat history and reset to the initial greeting message
    document.querySelector('.delete').addEventListener('click', () => {
        const responseClear = document.getElementById('responses');
        responseClear.innerHTML = `
            <div class="response-block">
                <span class="icon">🤖</span>
                <pre>Hello, How can I help you?</pre>
            </div>`;
        chatHistory = [];
    });

    // Handle Enter key submission
    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });

    submitButton.style.display = 'none';
    stopButton.style.display = 'none';





  

    // Handle GVP button click for PDF processing'


    //let useVectorStore = false; 
    
    // Example function to call the gemma2:2b model directly
    

    /*
    let useVectorStore = false; 
    const gvpButton = document.getElementById('gvp');

    gvpButton.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:3000/query-gvp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('PDF Chunks:', data.chunks);
                alert('PDF chunks have been logged to the console.');
                const prompt = document.getElementById('prompt').value; // Assuming you have an input field for the prompt
                 

            const retrieveResponse = await fetch('http://localhost:3000/query-retrieve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt, useVectorStore})
            });

            if (retrieveResponse.ok) {
                const retrieveData = await retrieveResponse.json();
                console.log('Retrieved Response:', retrieveData.text);
                alert('Retrieved response has been logged to the console.');
            } else {
                console.error('Failed to retrieve response');
            }
            } else {
                console.error('Failed to load PDF chunks');
            }
        } catch (error) {
            console.error('Error fetching PDF chunks:', error.message);
        }
        useVectorStore = false;
    });
    */
    

    
    const gvpButton = document.getElementById('gvp');

    
    gvpButton.addEventListener('click', async (event) => {
        event.stopPropagation();
        try {
                const response = await fetch('http://localhost:3000/query-embedding', 
                {
                    method: 'POST',
                    headers: 
                    {
                        'Content-Type': 'application/json'
                    }
                });
        } catch (error) {
            console.error('Error processing PDFs and generating embeddings:', error.message);
        }
    });
    
    /*
    submitButton.addEventListener('click', async (event) => {
        event.stopPropagation();
        try {
                const promptValue = document.getElementById('prompt').value;
                const response = await fetch('http://localhost:3000/query-gvp', 
                {
                    method: 'POST',
                    headers: 
                    {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ prompt: promptValue }) 
                });
        } catch (error) {
            console.error('Error embedding queries:', error.message);
        }
    });


    */
   
});


