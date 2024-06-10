"use client";

import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import invokeAgent from "../../../lib/bedrockClient";

interface messageType {
  user: string;
  text: string;
  botThinking?: boolean;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const setBotMessage = (botMessage: string | undefined) => {
    setMessages((prevMessages) => [
      ...prevMessages.slice(0, -1),
      { user: "bot", text: botMessage || "Failed!!!", botThinking: false },
    ]);
  };

  const handleSend = async (inputText: string) => {
    if (inputText.trim() === "") return;
    setLoading(true);

    setMessages((prevMessages) => [
      ...prevMessages,
      { user: "user", text: inputText },
      { user: "bot", text: "cargando", botThinking: true },
    ]);

    const botMessage = await invokeAgent(inputText);

    setBotMessage(botMessage);
    setLoading(false);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="border rounded shadow-lg md:w-[80%] h-[80vh] mx-auto bg-white flex flex-col overflow-hidden w-[100%]">
      <div
        id="chatcontainer"
        ref={chatContainerRef}
        className="messages space-y-4 mb-4 min-h-48 flex-1 overflow-y-scroll md:p-12 p-3 "
      >
        {messages.map(({ user, text, botThinking }, index) => (
          <MessageBubble
            key={index}
            user={user}
            text={text}
            botThinking={botThinking}
          />
        ))}
      </div>
      <ChatInput loading={isLoading} onSend={handleSend} />
    </div>
  );
};

export default Chatbot;
