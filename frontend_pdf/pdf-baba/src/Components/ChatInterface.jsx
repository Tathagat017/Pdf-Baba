import React, { useState, useEffect } from "react";
import "./ChatInterface.css";

const ChatInterface = () => {
  const [chatBotMessage, setChatBotMessage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const [botMessages, setBotMessages] = useState([]);
  const [isSendingToBot, setIsSendingToBot] = useState(false);

  const handleSubmit = () => {
    if (userInput.trim() !== "") {
      // Add the user's message to the chat history
      setUserMessages((prevMessages) => [...prevMessages, userInput]);
      setUserInput(""); // Clear the input field

      if (isSendingToBot) {
        // If sending to the bot, simulate bot response
        simulateBotResponse(userInput);
        setIsSendingToBot(false);
      }
    }
  };

  const handleSend = () => {
    if (userMessages.length > 0) {
      const userMessage = userMessages[userMessages.length - 1];
      setIsSendingToBot(true);

      // In a real application, you would send the user's message to your chatbot backend here for processing
      // For now, we'll simulate a bot response.
      simulateBotResponse(userMessage);
    }
  };

  const simulateBotResponse = (userMessage) => {
    // In a real application, this is where you would make an API request to your chatbot backend
    // and receive a response.
    // For now, we'll simulate a bot response.
    const botResponse = `Bot responds to: ${userMessage}`;
    setBotMessages((prevMessages) => [...prevMessages, botResponse]);
  };

  return (
    <div className="chat-container">
      <div className="chat">
        {botMessages.map((message, index) => (
          <div className="message received" key={index}>
            <div className="message-content">{message}</div>
          </div>
        ))}
        {userMessages.map((message, index) => (
          <div className="message sent" key={index}>
            <div className="message-content">{message}</div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button id="send-button" onClick={handleSubmit}>
          {isSendingToBot ? "Send to Bot" : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
