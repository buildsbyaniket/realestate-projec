import React from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiSearch,
  FiBell,
  FiChevronDown,
  FiMenu,
} from "react-icons/fi";

const Header = ({ onMenuClick }) => {
  return (
    <header className="w-full h-16 bg-white border-b border-gray-200">
      <div className="h-full flex items-center px-3 sm:px-4 lg:px-6">

        {/* =====================================================
            LEFT SECTION
        ====================================================== */}
        <div className="flex items-center flex-shrink-0">

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="
              lg:hidden
              flex items-center justify-center
              w-9 h-9
              mr-2
              rounded-md
              text-gray-600
              hover:bg-gray-100
              transition-colors
            "
          >
            <FiMenu size={20} />
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center whitespace-nowrap"
          >
            <FiHome
              size={19}
              className="text-teal-500 mr-1"
            />

            <span className="text-sm font-bold text-teal-500">
              PROP
            </span>

            <span className="text-sm font-semibold text-gray-700">
              MANAGE
            </span>
          </Link>
        </div>

        {/* =====================================================
            SEARCH SECTION
        ====================================================== */}
        <div
          className="
            hidden
            sm:flex
            items-center
            flex-1
            ml-5
            lg:ml-8
            max-w-md
          "
        >
          <div
            className="
              w-full
              h-9
              flex
              items-center
              px-3
              bg-gray-100
              border
              border-transparent
              rounded-md
              transition-all
              duration-150
              focus-within:bg-white
              focus-within:border-gray-300
              focus-within:ring-2
              focus-within:ring-teal-100
            "
          >
            <FiSearch
              size={17}
              className="flex-shrink-0 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search Properties, Agents..."
              className="
                w-full
                ml-2
                bg-transparent
                outline-none
                border-none
                text-xs
                sm:text-sm
                text-gray-700
                placeholder-gray-400
              "
            />
          </div>
        </div>

        {/* =====================================================
            RIGHT SECTION
        ====================================================== */}
        <div className="ml-auto flex items-center">

          {/* Mobile Search Icon */}
          <button
            type="button"
            aria-label="Search"
            className="
              sm:hidden
              flex items-center justify-center
              w-9 h-9
              mr-1
              rounded-md
              text-gray-600
              hover:bg-gray-100
            "
          >
            <FiSearch size={19} />
          </button>

          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="
              relative
              flex items-center justify-center
              w-9 h-9
              mr-1
              rounded-md
              text-gray-600
              hover:bg-gray-100
              transition-colors
            "
          >
            <FiBell size={19} />

            {/* Notification dot */}
            <span
              className="
                absolute
                top-2
                right-2
                w-1.5
                h-1.5
                rounded-full
                bg-teal-500
                border border-white
              "
            />
          </button>

          {/* User Profile */}
          <button
            type="button"
            aria-label="User profile"
            className="
              flex
              items-center
              h-10
              px-1.5
              rounded-md
              hover:bg-gray-50
              transition-colors
            "
          >
            {/* Avatar */}
            <img
              src="/avatar.png"
              alt="John Doe"
              className="
                w-5
                h-5
                flex-shrink-0
                rounded-full
                object-cover
                border
                border-gray-300
              "
            />

            {/* User Name */}

            <span className="hidden md:block ml-2 text-sm font-medium text-gray-700 whitespace-nowrap">
              John Doe
            </span>

            {/* Logout Link */}
            <Link to="/logout" className="ml-4 text-sm text-red-600 hover:underline">
              Logout
            </Link>

            {/* Dropdown */}
            <FiChevronDown
              size={14}
              className="ml-1 text-gray-500 flex-shrink-0"
            />
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE SEARCH
      ====================================================== */}
      <div className="sm:hidden px-3 pb-3 bg-white">
        <div
          className="
            w-full
            h-9
            flex
            items-center
            px-3
            bg-gray-100
            border
            border-gray-200
            rounded-md
          "
        >
          <FiSearch
            size={17}
            className="flex-shrink-0 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search Properties, Agents..."
            className="
              w-full
              ml-2
              bg-transparent
              outline-none
              border-none
              text-xs
              text-gray-700
              placeholder-gray-400
            "
          />
        </div>
      </div>
    </header>
  );
};

export default Header;