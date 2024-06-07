"use client";

import { useState, KeyboardEvent, ChangeEvent } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { user: "user", text: input }]);
    setInput("");
    // Aquí podrías añadir la lógica para enviar el mensaje a una API o procesar la respuesta
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: "bot", text: "Esta es una respuesta automática" },
    ]);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  return (
    <div className="chat-container  border rounded shadow-lg w-[50%] mx-auto bg-white">
      <div className="messages space-y-4 mb-4 min-h-48 p-4">
        {messages.map((message, index) => (
          <MessageBubble key={index} user={message.user} text={message.text} />
        ))}
      </div>
      <ChatInput
        loading={false}
        input={input}
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
        handleSend={handleSend}
      />
    </div>
  );
};

export default Chatbot;
