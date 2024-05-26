import React, { useState } from "react";
import "./ChatBot.css";

const ChatBot = () => {
  const [history, setHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userInput.trim() === "") {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetchBackend(userInput);
      const responseData = await response.text();

      setHistory((prevHistory) => [
        ...prevHistory,
        {
          role: "user",
          parts: [{ text: userInput }],
        },
        {
          role: "model",
          parts: [{ text: responseData }],
        },
      ]);
    } catch (error) {
      console.error("Error fetching backend:", error);
    }

    setIsLoading(false);
    setUserInput("");
  };

  const fetchBackend = async (userInput) => {
    // Mock function for now, replace with actual backend call
    const response = fetch("http://localhost:3001/api/books/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        history: history,
        userInput: userInput,
      }),
    });
    return response;
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="chat">
    <div className="chat-container">
      {history.map((item, index) => (
        item.role === "model" ? (
          <div key={index} className={`message ${item.role}`}>
            <p dangerouslySetInnerHTML={{ __html: item.parts[0].text.replaceAll("\\n", "<br>") }}></p>
          </div>
        ) : (
          <div key={index} className={`message ${item.role}`}>
            {item.parts[0].text}
          </div>
        )
      ))}
      
    </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={userInput}
          onChange={handleChange}
          placeholder="Type your message..."
        />
        <button type="submit" disabled={!userInput.trim() || isLoading}>
          {isLoading ? "Loading..." : "Send"}
        </button>
        {history.length > 0 && (
          <button className="clear" type="button" onClick={handleClearHistory}>Clear History</button>
        )}
      </form>
    </div>
  );
};

export default ChatBot;