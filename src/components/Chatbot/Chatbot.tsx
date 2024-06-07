"use client";

import { useState, KeyboardEvent, ChangeEvent, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { FiSend } from "react-icons/fi";
import ChatInput from "./ChatInput";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { user: "user", text: input }]);
    setInput("");
    // Aquí podrías añadir la lógica para enviar el mensaje a una API o procesar la respuesta
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: "bot", text: "Esta es una respuesta automática" },
    ]);
    resizeTextarea();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    resizeTextarea();
  };

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [input]);

  return (
    <div className="chat-container  border rounded shadow-lg w-[50%] mx-auto bg-white">
      <div className="messages space-y-4 mb-4 min-h-48 p-4">
        {messages.map((message, index) => (
          <MessageBubble key={index} user={message.user} text={message.text} />
        ))}
      </div>
      <ChatInput
        input={input}
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
        handleSend={handleSend}
      />
    </div>
  );
};

export default Chatbot;
