"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { initClient, invokeAgent } from "../../../lib/bedrockClient";

interface messageType {
  user: string;
  text: string | ReactNode;
  botThinking?: boolean;
}

const getFormattedBotMessage = (botMessage?: string) => {
  console.log('FORMATTED', botMessage)
  if (!botMessage) {
    return 'Sorry. Failed to get response.'
  }

  if (botMessage.includes('\n')) {
    const messageLines = botMessage.split('\n');
    const formattedMessage = messageLines.map((lineText, index) => {
      if (!lineText) {
        return <br key={index} />
      }

      const isStudy = lineText.includes('NCT') && !lineText.endsWith('NCTID.')

      return isStudy ? <div key={index}><br /> - {lineText}</div> : <div key={index}><b>{lineText}</b></div>
    })

    return formattedMessage;
  }

  return botMessage;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const setBotMessage = (botMessage?: string) => {

    const formattedMessage = getFormattedBotMessage(botMessage)

    setMessages((prevMessages) => [
      ...prevMessages.slice(0, -1),
      { user: "bot", text: formattedMessage, botThinking: false },
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
    initClient()
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="border rounded shadow-lg w-[80%] h-[80vh] mx-auto bg-white flex flex-col overflow-hidden">
      <div
        id="chatcontainer"
        ref={chatContainerRef}
        className="messages space-y-4 mb-4 min-h-48 px-12 pt-12 pb-10 flex-1 overflow-y-scroll"
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
