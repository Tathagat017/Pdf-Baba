import React, { useState, useEffect } from "react";
import "./ChatInterface.css";
import { useSelector, useDispatch } from "react-redux";
import { AskQuestion } from "../Redux/chatReducer/action";

const ChatInterface = () => {
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isSendingToBot, setIsSendingToBot] = useState(false);

  const { bot_response, isLoading } = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (userInput.trim() !== "") {
      // Add the user's message to the chat history
      const userMessage = userInput.trim();
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", message: userMessage },
      ]);

      setIsSendingToBot(true); // Show loading while sending

      // Dispatch the user's question to get a bot response
      dispatch(AskQuestion(userInput));

      setUserInput(""); // Clear the input field
    }
  };

  useEffect(() => {
    // Handle bot response when it changes in the Redux store
    if (bot_response) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", message: bot_response },
      ]);
      setIsSendingToBot(false); // Hide loading when response is received
    }
  }, [bot_response]);

  return (
    <div className="chat-container">
      <div className="chat">
        {chatMessages.map((message, index) => (
          <div
            className={`message ${
              message.type === "user" ? "sent" : "received"
            }`}
            key={index}
          >
            <div className="message-content">{message.message}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message loading">
            <div className="message-content">Loading...</div>
          </div>
        )}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button id="send-button" onClick={handleSubmit}>
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
