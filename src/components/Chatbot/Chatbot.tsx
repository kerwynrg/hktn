"use client";

import { useState, KeyboardEvent, ChangeEvent } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import invokeAgent from "@/../services/bedrockClient";

interface messageType {
  user: string;
  text: string;
  botThinking?: boolean;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const [isLoading, setLoading] = useState(false);

  // const mutation = useMutation(invokeModel, {
  //   onSuccess: (data: string) => {
  //     setLoading(false);

  //     setMessages((prevMessages) => {
  //       const lastitem = prevMessages[prevMessages.length - 1];
  //       lastitem.text = data;
  //       lastitem.botThinking = false;

  //       return prevMessages;
  //     });
  //   },
  // });

  const handleSend = async (inputText: string) => {
    if (inputText.trim() === "") return;
    setLoading(true);

    setMessages((prevMessages) => [
      ...prevMessages,
      { user: "user", text: inputText },
      { user: "bot", text: "cargando", botThinking: true },
    ]);

    // mutation.mutate(inputText);

    const botMessage = await invokeAgent(inputText);

    setMessages((prevMessages) => [
      ...prevMessages.slice(0, -1),
      { user: "bot", text: botMessage || 'Failed!!!', botThinking: false },
    ]);

    setLoading(false);
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
        onSend={handleSend}
      />
    </div>
  );
};

export default Chatbot;
