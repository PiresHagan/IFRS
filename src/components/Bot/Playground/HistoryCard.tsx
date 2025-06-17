import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useMessage } from "@hooks/useMessage";
import { PlaygroundHistory } from "./types";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

export const PlaygroundHistoryCard = ({
  item,
  setId,
  toggle,
  editToggle,
  setTitle,
  paramId,
}: {
  item: PlaygroundHistory;
  setId: (id:string) => void;
  toggle: () => void;
  editToggle: () => void;
  setTitle: (value: string) => void;
  paramId: number | string | undefined|null;
}) => {
  const { setMessages, setHistory, setIsLoading,setHistoryId } = useMessage();
  const isActive = item?.id == paramId;
  return (
    <>
      <div
        className={`flex flex-1 flex-direction-row items-center content-space-between py-2 px-2 gap-3 relative rounded-md truncate  group transition-opacity duration-300 ease-in-out ${
          isActive
            ? "bg-purple-600 dark:bg-purple-800"
            : "bg-gray-100 dark:bg-gray-800"
        } `}
      >
        <Link
          to={`/detailChat/${item?.id}`}
          onClick={() => {
            setIsLoading(true);
            setMessages([]);
            setHistory([]);
            setHistoryId(item?.id)
          }}
          className={`flex  items-center  `}
        >
          <ChatBubbleLeftIcon
            className={`${
              isActive
                ? "text-white"
                : "text-gray-400 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors"
            }   mr-3 iconStandard`}
          />
          <div className="flex-1 overflow-hidden break-all">
            <span
              className={`${
                isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
              }  text-sm font-semibold`}
              title={item.firstPrompt}
            >
              {item?.title !== "" && item?.title?.length > 15
                ? item?.title?.substring(0, 15) + "..."
                : item?.title == "" && item?.firstPrompt?.length > 15
                ? item?.firstPrompt?.substring(0, 15) + "..."
                : item?.title || item?.firstPrompt}
            </span>
          </div>
        </Link>

        <TrashIcon
          className="ml-auto text-red-400 dark:text-red-600 group-hover:text-red-500 transition-colors cursor-pointer iconStandard"
          onClick={() => {
            setId(item?.id);
            toggle();
          }}
        />
        <PencilIcon
          className=" text-blue-400 dark:text-blue-600 group-hover:text-blue-500 transition-colors cursor-pointer iconStandard"
          onClick={() => {
            setId(item?.id);
            setTitle(item?.title || item?.firstPrompt);
            editToggle();
          }}
        />
      </div>
    </>
  );
};
