import { useState, useEffect } from "react";

function App() {
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        fetch("http://localhost:8080/")
            .then((response) => response.text())
            .then((data) => setMessage(data))
            .catch((error) => setMessage("Error connecting to backend"));
    }, []);

    return (
        <div>
            <h1>AI Chatbot Frontend</h1>
            <p>Backend Response: {message}</p>
        </div>
    );
}

export default App;
