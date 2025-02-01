import React ,{ useState, useEffect } from "react";
import "./ChatStyles.css";

function App() {
    const [message, setMessage] = useState(""); // User input message
    const [messages, setMessages] = useState([]); // Chat history

    const sendMessage = async () => {
        // Add user message to the message list
        setMessages([...messages, { text: message, sender: "user" }]);

        // Send message to the backend
        try {
            const response = await fetch("https://symmetrical-space-trout-5gr955rvr9gjc7wgx-8080.app.github.dev/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });
            const data = await response.json();

            // Add bot response to the message list
            setMessages([...messages, { text: message, sender: "user" }, { text: data.reply, sender: "bot" }]);
        } catch (error) {
            setMessages([...messages, { text: "Error connecting to backend.", sender: "bot" }]);
        }

        setMessage(""); // Clear the input field
    };

    return (
        <div>
            <h1>AI Chatbot Frontend</h1>

            {/* Display previous messages */}
            <div className="chat-history">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>

            {/* User input */}
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default App;
