import React from "react";
import {
  Conversation,
  ConversationFilters,
} from "@/types/converstations";
import { Empty, Input, Button, DatePicker } from "antd";
// import { FilterDates } from "@@/types/conversation";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs, { Dayjs } from "dayjs";
dayjs.extend(relativeTime);

export const ConversationSidebar = ({
  data,
  defaultIndex,
  filters,
  setDefaultIndex,
  setFilters,
  applyFilter,
}: {
  data: Conversation[];
  defaultIndex: number | null;
  filters: ConversationFilters;
  setDefaultIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setFilters: React.Dispatch<React.SetStateAction<ConversationFilters>>;
  applyFilter: () => void;
}) => {
  const [hideMenu] = React.useState(false);
  const { Search } = Input;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: e.target.value,
    }));
  };

  const handleDateBeforeChange = (_: Dayjs | null, dateString: string | string[]) => {
    setFilters((prevFilters) => ({ ...prevFilters, dateBefore: dateString }));
  };
  const handleDateAfterChange = (_: Dayjs | null, dateString: string | string[]) => {
    setFilters((prevFilters) => ({ ...prevFilters, dateAfter: dateString }));
  };
  const getDate = (date: string | string[]): string => {
    if (Array.isArray(date)) {
      return date[0] || '';
    }
    return date;

  }
  return (
    <div
      id="menu"
      className={`bg-white z-[999] border fixed md:inset-y-0 md:flex md:w-[350px] md:flex-col transition-transform  max-md:w-3/4  ${hideMenu ? "translate-x-[-100%]" : "translate-x-[0%]"
        }`}
    >
      <div className="flex mt-16 h-full min-h-0 flex-col">
        <div className="flex h-full w-full flex-1 items-start">
          <nav className="flex h-full flex-1 flex-col space-y-3 px-2 pt-2 overflow-x-hidden">
            <div className="flex-grow overflow-y-auto  border-b border-white/20 ">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Conversations</h2>

                <Search
                  placeholder="Search by user name or email"
                  allowClear
                  size="large"
                  value={filters.search}
                  onChange={handleInputChange}
                />
                <DatePicker
                  placeholder="Date Before"
                  onChange={handleDateBeforeChange}
                  value={
                    filters.dateBefore ? dayjs(getDate(filters.dateBefore)) : null
                  }
                  allowClear
                />

                <DatePicker
                  placeholder="Date After"
                  onChange={handleDateAfterChange}
                  value={
                    filters.dateAfter ? dayjs(getDate(filters.dateAfter)) : null
                  }
                  allowClear
                />
                <Button onClick={() => applyFilter()} type="primary" className="mb-3">
                  Apply Filter
                </Button>
              </div>

              {data?.length === 0 && (
                <div className="flex justify-center items-center mt-20 overflow-hidden">
                  <Empty description="No conversations yet" />
                </div>
              )}
              <div className="flex flex-col mt-2 gap-2 overflow-hidden text-sm ">
                {data?.map((item, index) => {
                  return (
                    <button
                      onClick={() => setDefaultIndex(index)}
                      key={index}
                      className={`"w-full p-2 hover:bg-gray-100 cursor-pointer transition-colors duration-300 ease-in-out  border-b  ${defaultIndex === index ? "bg-gray-100" : ""
                        }`}
                    >
                      <div className="flex text-gray-500 justify-between">
                        <h3 className="text-xs font-thin">
                          {item?.owner?.firstName?.length > 0
                            ? `${item?.owner?.firstName} ${item?.owner?.lastName}  `
                            : item?.owner?.username || "Anonymous User"}
                        </h3>
                        <span className="text-xs font-thin">
                          {dayjs(item?.createdOn).fromNow()}
                        </span>
                      </div>
                      <div className="flex mt-2  flex-col gap-1">
                        <div className="flex flex-row items-center gap-2">
                          <div>
                            <ChatBubbleOvalLeftIcon className="w-4 h-4 text-gray-400" />
                          </div>
                          <p className="text-xs truncate font-thin">
                            {`${item?.title || item?.firstPrompt}`}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
