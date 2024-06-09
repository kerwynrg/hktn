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
  const [input, setInput] = useState("");

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

  const handleSend = async () => {
    if (input.trim() === "") return;
    setLoading(true);
    setInput("");

    setMessages((prevMessages) => [
      ...prevMessages,
      { user: "user", text: input },
      { user: "bot", text: "cargando", botThinking: true },
    ]);

    // mutation.mutate(input);

    const botMessage = await invokeAgent(input.trim());

    setMessages((prevMessages) => [
      ...prevMessages.slice(0, -1),
      { user: "bot", text: botMessage || 'Failed!!!', botThinking: false },
    ]);

    setLoading(true);
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
