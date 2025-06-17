import { PlusIcon } from "@heroicons/react/24/outline";
import { usePublicMessage } from "@hooks/usePublicMessage";
import { useNavigate } from "react-router-dom";
import { widgetCreateChat } from "@services/chat";
import { PublicChat } from "@/types/chat";

export const PublicPlaygroundNewChat = () => {
  const { setHistory, setMessages, setHistoryId, setIsFirstMessage } = usePublicMessage();

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const res: PublicChat = await widgetCreateChat();
      setHistoryId(null);
      setMessages([]);
      setHistory([]);
      navigate(`/embed/chat/${res?.id}`);
      setIsFirstMessage(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex  flex-1 items-center rounded-md border border-transparent  transition-all duration-200  bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <PlusIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
      <span className="inline-flex text-white text-sm">New Chat</span>
    </button>
  );
};
