// components/ChatInput.tsx
import { ChangeEvent, KeyboardEvent, useRef, useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";

interface ChatInputProps {
  onSend: (inputText: string) => void;
  loading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, loading }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend(input.trim());
      setInput("");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleSend = async () => {
    if (input.trim() === "") return;
    onSend(input.trim());
    setInput("");
  };

  useEffect(() => {
    resizeTextarea();
  }, [input]);

  return (
    <div className="flex border-t-gray-200 border-t-[1px] p-4">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="textarea w-full mr-2 resize-none border-none"
        placeholder="Message the chat..."
        rows={1}
      />
      <button
        onClick={handleSend}
        className="btn btn-primary self-end p-0 h-12 w-12 rounded-full"
        disabled={loading || input.trim() === ""}
      >
        <FiSend className="text-xl" />
      </button>
    </div>
  );
};

export default ChatInput;
