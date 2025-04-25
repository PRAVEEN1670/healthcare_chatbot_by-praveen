document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.querySelector("button");

    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });

    sendButton.addEventListener("click", sendMessage);

    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        addMessage(message, "user-message");
        userInput.value = "";

        if (message.toLowerCase() === "hello" || message.toLowerCase() === "hi" || message.toLowerCase() === "hey" || message.toLowerCase() === "yo" || message.toLowerCase() === "sup" || message.toLowerCase() === "howdy" || message.toLowerCase() === "greetings" || message.toLowerCase() === "good day" || message.toLowerCase() === "good morning" || message.toLowerCase() === "good afternoon" || message.toLowerCase() === "good evening" || message.toLowerCase() === "what's up" || message.toLowerCase() === "helo" || message.toLowerCase() === "hlo" || message.toLowerCase() === "hii" || message.toLowerCase() === "hiii" || message.toLowerCase() === "hiiii" || message.toLowerCase() === "hiiiii" || message.toLowerCase() === "hiiiiii" || message.toLowerCase() === "hiiiiiii" || message.toLowerCase() === "hiiiiiiii" || message.toLowerCase() === "hiiiiiiiii" || message.toLowerCase() === "hiiiiiiiiii" || message.toLowerCase() === "hiiiiiiiiiii" || message.toLowerCase() === "hiiiiiiiiiiii" || message.toLowerCase() === "hiiiiiiiiiiiii" || message.toLowerCase() === "hiiiiiiiiiiiiii" || message.toLowerCase() === "hiiiiiiiiiiiiiii" || message.toLowerCase() === "hiiiiiiiiiiiiiiii" || message.toLowerCase() === "hiiiiiiiiiiiiiiiii" || message.toLowerCase() === "hiiiiiiiiiiiiiiiiii" || message.toLowerCase() === "hiiiiiiiiiiiiiiiiiii" || message.toLowerCase() === "h" || message.toLowerCase()==="halo"){
            typeWriter("Hello! How can I assist you today?", "bot-message");
            return;
        }

        if (isCreatorQuestion(message)) {
            typeWriter("I was created by Mr. Praveen vasupalli as a mini project.", "bot-message");
            return;
        }

        try {
            const keyResponse = await fetch("/.netlify/functions/getGroqApiKey");
            if (!keyResponse.ok) throw new Error("Failed to retrieve API key");
            const { apiKey } = await keyResponse.json();
            const isHealthRelated = await checkHealthViaApi(message, apiKey);
            if (isHealthRelated === "TRUE") {
                const botResponse = await fetchGroqResponse(message, apiKey);
                typeWriter(botResponse, "bot-message");
            } else {
                typeWriter("Sorry, I can only help you with health-related topics.", "bot-message");
            }
        } catch (error) {
            console.error("Error:", error);
            typeWriter("Oops! Something went wrong. Please try again.", "bot-message");
        }
    }

    async function checkHealthViaApi(message, apiKey) {
        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama3-8b-8192",
                    messages: [{ role: "user", content: `Reply with only TRUE if the following question is health-related and FALSE if not: Question: ${message}` }],
                    temperature: 0.0,
                }),
            });

            if (!response.ok) throw new Error("API validation request failed");

            const data = await response.json();
            console.log("Validation API Response:", data);
            return data.choices?.[0]?.message?.content?.trim() || "FALSE";
        } catch (error) {
            console.error("API Error (Validation):", error);
            return "FALSE";
        }
    }

    async function fetchGroqResponse(userMessage, apiKey) {
        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama3-8b-8192",
                    messages: [{ role: "user", content: userMessage }],
                    temperature: 0.7,
                }),
            });

            if (!response.ok) throw new Error("API request failed");

            const data = await response.json();
            return data.choices?.[0]?.message?.content || "I couldn't process that request.";
        } catch (error) {
            console.error("API Error (Chatbot Response):", error);
            return "Oops! Something went wrong. Please try again.";
        }
    }

    function addMessage(content, className) {
        const messageDiv = document.createElement("div");
        messageDiv.className = className;
        messageDiv.innerHTML = content.replace(/\n/g, "<br>");
        
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        return messageDiv;
    }

    function isCreatorQuestion(message) {
        const creatorKeywords = [
            "Who made you?",
            "Who is your creator?",
            "Who developed you?",
            "Who designed you?",
            "Who built you?",
            "Who programmed you?",
            "Who is behind your creation?",
            "Who invented you?",
            "Who brought you into existence?",
            "Who is responsible for making you?",
            "Who coded you?",
            "Who is your maker?",
            "Who engineered you?",
            "Who is the mastermind behind you?",
            "Who gave birth to you (figuratively)?",
            "Who is the architect of your design?",
            "Who constructed you?",
            "Who was involved in creating you?",
            "Who is behind your development?",
            "Who is your founder?",
            "Who made you",
            "Who is your creator",
            "Who developed you",
            "Who designed you",
            "Who built you",
            "Who programmed you",
            "Who is behind your creation",
            "Who invented you",
            "Who brought you into existence",
            "Who is responsible for making you",
            "Who coded you",
            "Who is your maker",
            "Who engineered you",
            "Who is the mastermind behind you",
            "Who gave birth to you (figuratively)",
            "Who is the architect of your design",
            "Who constructed you",
            "Who was involved in creating you",
            "Who is behind your development",
            "Who is your founder",
            "who made you",
            "who is your creator",
            "who developed you",
            "who designed you",
            "who built you",
            "who programmed you",
            "who is behind your creation",
            "who invented you",
            "who brought you into existence",
            "who is responsible for making you",
            "who coded you",
            "who is your maker",
            "who engineered you",
            "who is the mastermind behind you",
            "who gave birth to you (figuratively)",
            "who is the architect of your design",
            "who constructed you",
            "who was involved in creating you",
            "who is behind your development",
            "who is your founder",
            "who made you?",
            "who is your creator?",
            "who developed you?",
            "who designed you?",
            "who built you?",
            "who programmed you?",
            "who is behind your creation?",
            "who invented you?",
            "who brought you into existence?",
            "who is responsible for making you?",
            "who coded you?",
            "who is your maker?",
            "who engineered you?",
            "who is the mastermind behind you?",
            "who gave birth to you (figuratively)?",
            "who is the architect of your design?",
            "who constructed you?",
            "who was involved in creating you?",
            "who is behind your development?",
            "who is your founder?",
            "who created you",
            "who created you?",
            "Who created you",
            "Who created you?"
        ];

        return creatorKeywords.some(q => message.toLowerCase().includes(q));
    }

    function typeWriter(text, className) {
        let i = 0;
        let speed = 3;
        const messageDiv = addMessage("", className);
        const lines = text.split("\n");
        function typeLine(lineIndex) {
            if (lineIndex < lines.length) {
                let currentLine = lines[lineIndex];
                let charIndex = 0;
                function typeChar() {
                    if (charIndex < currentLine.length) {
                        messageDiv.innerHTML += currentLine.charAt(charIndex);
                        charIndex++;
                        setTimeout(typeChar, speed);
                    } else {
                        messageDiv.innerHTML += "<br>";
                        chatBox.scrollTop = chatBox.scrollHeight;
                        typeLine(lineIndex + 1);
                    }
                }
                typeChar();
            }
        }
        typeLine(0);
    }
});