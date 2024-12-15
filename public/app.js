const WEBHOOK_URL = "https://hook.us1.make.com/1qwh9j8pjauqigm5pvryutewznykj93h";
const MAX_RETRIES = 10;
const RETRY_DELAY = 2000;

function recommend(type) {
    const selectedText = document.getElementById('textInput').value;
    if (!selectedText) {
        document.getElementById('result').innerText = "Please enter some text.";
        return;
    }

    document.getElementById('result').innerText = "Processing...";

    fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: selectedText,
            type: type
        })
    })
    .then(response => {
        if (response.status !== 200) {
            return pollForResponse(0);
        }
        return response.text();
    })
    .then(rawText => {
        const cleanedText = rawText
            .replace(/\{\{replace\((.*?)\}\}/g, '')
            .replace(/\\"/g, '"')
            .replace(/"{2,}/g, '"')
            .replace(/;/g, ',')
            .trim();
        
        try {
            const data = JSON.parse(cleanedText);
            document.getElementById('result').innerText = data.suggestion || 'No suggestion available';
        } catch (error) {
            console.error('Parse Error:', error);
            document.getElementById('result').innerText = "Error parsing response: " + error.message;
        }
    })
    .catch(error => {
        console.error('Request Error:', error);
        document.getElementById('result').innerText = "Error: " + error.message;
    });
}

async function pollForResponse(retryCount = 0) {
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status !== 200 && retryCount < MAX_RETRIES) {
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            return pollForResponse(retryCount + 1);
        }
        
        if (response.status !== 200) {
            throw new Error("Maximum retry attempts reached");
        }

        const rawText = await response.text();
        const cleanedText = rawText
            .replace(/\{\{replace\((.*?)\}\}/g, '')
            .replace(/\\"/g, '"')
            .replace(/"{2,}/g, '"')
            .replace(/;/g, ',')
            .trim();
        
        const data = JSON.parse(cleanedText);
        document.getElementById('result').innerText = data.suggestion || 'No suggestion available';
    } catch (error) {
        console.error('Polling Error:', error);
        document.getElementById('result').innerText = "Error: " + error.message;
    }
}