import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import {
  CubeIcon,
  CircleStackIcon,
  ChartBarIcon,
  ArrowDownTrayIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

const navigationItems = [
  {
    name: "Model Definitions",
    href: "/",
    icon: CubeIcon,
  },
  {
    name: "Data",
    href: "/data",
    icon: CircleStackIcon,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: ChartBarIcon,
  },
  {
    name: "Export / Disclosures",
    href: "/export",
    icon: ArrowDownTrayIcon,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const { profile } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="w-16 h-full bg-white border-r border-gray-200 flex flex-col">
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigationItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                group relative flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200
                ${
                  active
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }
              `}
              title={item.name}
            >
              {active && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full"></div>
              )}
              
              <item.icon
                className={`
                  w-6 h-6 transition-colors duration-200
                  ${
                    active
                      ? "text-blue-600"
                      : "text-gray-600 group-hover:text-blue-600"
                  }
                `}
              />
            </Link>
          );
        })}
      </nav>

      <div className="px-2 py-4 space-y-2 border-gray-200">
        <Link
          to="/settings"
          className={`
            group relative flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200
            ${
              isActive("/settings")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
            }
          `}
          title="Settings / Admin"
        >
          {isActive("/settings") && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full"></div>
          )}
          <CogIcon
            className={`
              w-6 h-6 transition-colors duration-200
              ${
                isActive("/settings")
                  ? "text-blue-600"
                  : "text-gray-600 group-hover:text-blue-600"
              }
            `}
          />
        </Link>

        <div className="flex items-center justify-center w-12 h-12">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
            {profile?.username?.slice(0, 2).toUpperCase() || "U"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 