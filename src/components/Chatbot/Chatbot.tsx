"use client";

import { useState, KeyboardEvent, ChangeEvent } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { useSendMessage } from "@/../services/bedrockClient";

interface messageType {
  user: string;
  text: string;
  botThinking?: boolean;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const sendMessageMutation = useSendMessage();

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([
      ...messages,
      { user: "user", text: input },
      { user: "bot", text: "cargando", botThinking: true },
    ]);

    sendMessageMutation.mutateAsync(input);

    setInput("");

    setLoading(true);

    // Aquí podrías añadir la lógica para enviar el mensaje a una API o procesar la respuesta
    setTimeout(() => {
      setLoading(false);

      setMessages((prevMessages) => {
        const lastitem = prevMessages[prevMessages.length - 1];
        lastitem.text = "Danielo bb";
        lastitem.botThinking = false;

        return prevMessages;
      });
    }, 1000);
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
        {messages.map(({ user, text, botThinking }, index) => (
          <MessageBubble
            key={index}
            user={user}
            text={text}
            botThinking={botThinking}
          />
        ))}
      </div>
      <ChatInput
        loading={isLoading}
        input={input}
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
        handleSend={handleSend}
      />
    </div>
  );
};

export default Chatbot;
