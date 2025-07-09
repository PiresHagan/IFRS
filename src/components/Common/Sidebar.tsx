import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  CubeIcon,
  CircleStackIcon,
  ChartBarIcon,
  ArrowDownTrayIcon,
  CogIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  UsersIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

interface SubmenuItem {
  name: string;
  href: string;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  submenu?: SubmenuItem[];
}

const navigationItems: NavigationItem[] = [
  {
    name: "Model Definitions",
    href: "/",
    icon: CubeIcon,
    submenu: [
      {
        name: "Direct Insurance",
        href: "/",
      },
      {
        name: "Group Insurance",
        href: "/group-insurance",
      },
      {
        name: "Reinsurance",
        href: "/reinsurance",
      },
    ],
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

const adminNavigationItems: NavigationItem[] = [
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
  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>({
    "Model Definitions": true
  });

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/" || location.pathname.startsWith("/model-definitions");
    }
    return location.pathname.startsWith(href);
  };

  const isSubmenuActive = (submenuItems: SubmenuItem[]) => {
    return submenuItems.some(item => isActive(item.href));
  };

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const allNavigationItems = [
    ...navigationItems,
    ...(profile?.isAdministrator ? adminNavigationItems : [])
  ];

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-2 border-b border-gray-200">
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="ActualIQ Logo" 
            className="h-16 w-auto"
          />
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {allNavigationItems.map((item) => {
          const active = isActive(item.href);
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isExpanded = expandedMenus[item.name];
          const submenuActive = hasSubmenu && item.submenu && isSubmenuActive(item.submenu);

          return (
            <div key={item.name}>
              <div
                className={`
                  group flex items-center justify-between w-full px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer
                  ${
                    active || submenuActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }
                `}
                onClick={() => hasSubmenu ? toggleMenu(item.name) : navigate(item.href)}
              >
                <div className="flex items-center">
                  <item.icon
                    className={`
                      w-5 h-5 mr-3 transition-colors duration-200
                      ${
                        active || submenuActive
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-blue-600"
                      }
                    `}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                
                {hasSubmenu && (
                  <div className="ml-2">
                    {isExpanded ? (
                      <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                )}
              </div>

              {hasSubmenu && isExpanded && item.submenu && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.submenu.map((subItem) => {
                    const subActive = isActive(subItem.href);
                    return (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className={`
                          block px-3 py-2 rounded-md text-sm transition-all duration-200
                          ${
                            subActive
                              ? "bg-blue-100 text-blue-700 font-medium"
                              : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                          }
                        `}
                      >
                        {subItem.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="px-4 py-4 space-y-2 border-t border-gray-200">
        <Link
          to="/help"
          className={`
            group flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200
            ${
              isActive("/help")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            }
          `}
        >
          <InformationCircleIcon
            className={`
              w-5 h-5 mr-3 transition-colors duration-200
              ${
                isActive("/help")
                  ? "text-blue-600"
                  : "text-gray-500 group-hover:text-blue-600"
              }
            `}
          />
          <span className="text-sm font-medium">Help Guide</span>
        </Link>

        <Link
          to="/settings"
          className={`
            group flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200
            ${
              isActive("/settings")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            }
          `}
        >
          <CogIcon
            className={`
              w-5 h-5 mr-3 transition-colors duration-200
              ${
                isActive("/settings")
                  ? "text-blue-600"
                  : "text-gray-500 group-hover:text-blue-600"
              }
            `}
          />
          <span className="text-sm font-medium">Settings / Admin</span>
        </Link>

        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="flex items-center w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium mr-3">
                {profile?.username?.slice(0, 2).toUpperCase() || "U"}
              </div>
              <span className="text-sm font-medium text-gray-700">{`${profile?.user?.firstName} ${profile?.user?.lastName}` || "User"}</span>
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
            <Menu.Items className="absolute bottom-0 left-0 z-10 mb-12 w-48 origin-bottom-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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