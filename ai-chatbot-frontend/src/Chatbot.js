import React, { useState } from "react";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    console.log("Sending message:", message); // Debug log

    try {
      const res = await fetch(
        "https://symmetrical-space-trout-5gr955rvr9gjc7wgx-8080.app.github.dev/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: message }),
        }
      );

      const data = await res.json();
      console.log("Response from backend:", data); // Debug log

      setResponse(data.reply || "No response from AI chatbot.");
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Error contacting AI chatbot.");
    }
  };

  return (
    <div>
      <h1>AI Chatbot</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
      <p>Backend Response: {response}</p>
    </div>
  );
}

export default Chatbot;
