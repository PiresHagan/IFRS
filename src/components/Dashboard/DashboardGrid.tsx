import { Link } from "react-router-dom";
import { ChevronRightIcon} from "@heroicons/react/24/outline";




export const DashboardGrid = () => {
 

  return (
    <>
     
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            to={`/`}
            className="flex rounded-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
     
          >
            <div className="w-full truncate rounded-md border border-gray-200 bg-white">
              <div className="flex flex-1 items-center justify-between ">
                <div className="flex-1 truncate px-4 py-4">
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-gray-600 flex-shrink truncate">
                    ScaffoldGPT Chat
                  </h3>
                  <div className="w-full">
                    <div className="flex items-end justify-between">
                      <span className="text-xs lowercase text-scale-1000 text-gray-600">
                        Version 1
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 pr-2">
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Open options</span>
                    <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      
    </>
  );
};
