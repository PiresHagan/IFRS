import { usePublicMessage } from "@hooks/usePublicMessage";
import { PlaygroundPublicChat } from "./PublicChat";
  import { PublicPlaygroundForm } from "./PublicForm";
import { PublicPlaygroundMenu } from "./PublicPlayGroundMenu";
import { Skeleton } from "antd";

export const PublicPlaygroundBody = () => {
  const { isLoading } = usePublicMessage();
  return (
    <div className="relative md:ml-14">
      <div className="hidden md:block">
        <PublicPlaygroundMenu/>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Skeleton active paragraph={{ rows: 10 }} />
        </div>
      ) : (
        <>
          {" "}
          <div className="md:ml-[256px]">
            <PlaygroundPublicChat />
          </div>
          <div className="md:ml-[100px]">
            <div className=" bottom-0 w-full fixed border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
              <div className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
                <div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
                  <PublicPlaygroundForm />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
