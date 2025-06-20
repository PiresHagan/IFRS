import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  CubeIcon,
  CircleStackIcon,
  ChartBarIcon,
  ArrowDownTrayIcon,
  CogIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  UsersIcon,
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

const adminNavigationItems = [
  {
    name: "Teams",
    href: "/teams",
    icon: UsersIcon,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, logout } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Combine navigation items with admin items if user is administrator
  const allNavigationItems = [
    ...navigationItems,
    ...(profile?.isAdministrator ? adminNavigationItems : [])
  ];

  return (
    <div className="w-16 h-full bg-white border-r border-gray-200 flex flex-col">
      <nav className="flex-1 px-2 py-4 space-y-1">
        {allNavigationItems.map((item) => {
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

      <div className="px-2 py-4 space-y-2 border-t border-gray-200">
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

        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="flex items-center justify-center w-12 h-12 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                {profile?.username?.slice(0, 2).toUpperCase() || "U"}
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute bottom-0 left-16 z-10 mb-0 w-48 origin-bottom-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "flex items-center px-4 py-2 text-sm text-gray-700"
                    )}
                    to="/settings"
                  >
                    <UserIcon className="w-4 h-4 mr-3" />
                    Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "flex items-center w-full text-left px-4 py-2 text-sm text-gray-700"
                    )}
                    onClick={handleLogout}
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar; 