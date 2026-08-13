// src/components/Layout/Sidebar.jsx

import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import {
  FiHome,
  FiBox,
  FiUser,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = ({
  isOpen = true,
  onClose = () => {},
}) => {
  const { user } = useContext(AuthContext);
  const baseMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FiHome,
    },
    {
      name: "Properties",
      path: "/properties",
      icon: FiBox,
    },
    {
      name: "Agents",
      path: "/agents",
      icon: FiUser,
    },
    // Admin‑only items will be added conditionally below
  ];

  // Add admin‑specific menu items if user is admin
  if (user?.role === "admin") {
    baseMenu.push(
      { name: "Clients", path: "/clients", icon: FiUsers },
      { name: "Reports", path: "/reports", icon: FiBarChart2 },
      { name: "Admin", path: "/admin", icon: FiSettings }
    );
  }

  const menuItems = baseMenu;

  const bottomItems = [
    {
      name: "Settings",
      path: "/settings",
      icon: FiSettings,
    },
    {
      name: "Logout",
      path: "/logout",
      icon: FiLogOut,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-[280px] min-w-[280px]
          flex-col
          bg-[#202d36]
          text-white
          shadow-xl

          transition-all duration-300 ease-in-out

          ${
            isOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }

          md:relative
          md:translate-x-0
          md:opacity-100
        `}
      >

        {/* LOGO */}
        <div className="flex h-[76px] items-center border-b border-[#34414a] px-7">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#29444a]">
            <FiHome
              size={21}
              className="text-[#6bc3c1]"
            />
          </div>

          <div className="ml-3">
            <h2 className="text-[17px] font-bold tracking-wide">
              PROP
              <span className="text-[#6bc3c1]">
                MANAGE
              </span>
            </h2>

            <p className="mt-1 text-[9px] uppercase tracking-[2px] text-gray-500">
              Management System
            </p>
          </div>
        </div>

        {/* MAIN MENU */}
        <div className="flex flex-1 flex-col px-4 py-7">

          <p className="mb-5 px-3 text-[10px] font-bold uppercase tracking-[2px] text-gray-500">
            Main Menu
          </p>

          <div className="space-y-3">

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      onClose();
                    }
                  }}
                  className={({ isActive }) =>
                    `
                    group relative flex h-[54px]
                    items-center rounded-xl px-4
                    text-[15px] font-medium
                    transition-all duration-300 ease-out

                    ${
                      isActive
                        ? "bg-[#30464d] text-[#78d0cd] shadow-lg"
                        : "text-[#aeb8be] hover:translate-x-2 hover:bg-[#293942] hover:text-white"
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator */}
                      {isActive && (
                        <span className="absolute left-0 h-8 w-1 rounded-r-full bg-[#6bc3c1]" />
                      )}

                      {/* ICON */}
                      <span
                        className={`
                          flex h-10 w-10
                          items-center justify-center
                          rounded-lg
                          transition-all duration-300

                          ${
                            isActive
                              ? "bg-[#3b5d62] text-[#78d0cd]"
                              : "text-[#9da9af] group-hover:scale-110 group-hover:bg-[#344750] group-hover:text-[#78d0cd]"
                          }
                        `}
                      >
                        <Icon size={20} />
                      </span>

                      {/* NAME */}
                      <span className="ml-4">
                        {item.name}
                      </span>

                      {/* ACTIVE DOT */}
                      {isActive && (
                        <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-[#6bc3c1]" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}

          </div>

          {/* BOTTOM MENU */}
          <div className="mt-auto">

            <div className="mb-6 border-t border-[#34414a]" />

            <p className="mb-5 px-3 text-[10px] font-bold uppercase tracking-[2px] text-gray-500">
              Account
            </p>

            <div className="space-y-3">

              {bottomItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        onClose();
                      }
                    }}
                    className={({ isActive }) =>
                      `
                      group flex h-[52px]
                      items-center rounded-xl px-4
                      text-[15px] font-medium
                      transition-all duration-300

                      ${
                        isActive
                          ? "bg-[#30464d] text-[#78d0cd]"
                          : "text-[#aeb8be] hover:translate-x-2 hover:bg-[#293942] hover:text-white"
                      }
                      `
                    }
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 group-hover:rotate-6 group-hover:bg-[#344750] group-hover:text-[#78d0cd]">
                      <Icon size={20} />
                    </span>

                    <span className="ml-4">
                      {item.name}
                    </span>
                  </NavLink>
                );
              })}

            </div>
          </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;