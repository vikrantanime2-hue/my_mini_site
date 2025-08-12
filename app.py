<!-- templates/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>My AI Chatbot</title>
</head>
<body>
    <h1>Apna AI Chatbot</h1>
    <input id="userInput" type="text" placeholder="Kuch bolo..." />
    <button onclick="sendMessage()">Bolo</button>
    <div id="chatBox"></div>

    <script>
        async function sendMessage() {
            const inputBox = document.getElementById('userInput');
            const chatBox = document.getElementById('chatBox');
            const message = inputBox.value;
            if (!message) return;

            chatBox.innerHTML += `<p><b>Me:</b> ${message}</p>`;

            const response = await fetch('/chat', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message})
            });
            const data = await response.json();

            chatBox.innerHTML += `<p><b>Bot:</b> ${data.response}</p>`;
            inputBox.value = '';
        }
    </script>
</body>
</html>