interface MessageBubbleProps {
  user: string;
  text: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ user, text }) => {
  return (
    <div className={`flex ${user === "bot" ? "justify-start" : "justify-end"}`}>
      <div
        className={`flex items-end ${user === "bot" ? "" : "flex-row-reverse"}`}
      >
        <div
          className={`w-8 h-8 rounded-full bg-gray-300 ${
            user === "bot" ? "mr-2" : "ml-2"
          }`}
        ></div>
        <div
          className={`inline-block p-2 rounded-lg ${
            user === "bot" ? "bg-blue-200 text-left" : "bg-green-200 text-right"
          }`}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
