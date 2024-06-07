// components/ChatInput.tsx
import { ChangeEvent, KeyboardEvent, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";

interface ChatInputProps {
  input: string;
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSend: () => void;
  loading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  handleChange,
  handleKeyDown,
  handleSend,
  loading,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    <div className="flex border-t-gray-200 border-t-[1px] p-4">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="textarea w-full mr-2 resize-none border-none"
        placeholder="Escribe tu mensaje..."
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
