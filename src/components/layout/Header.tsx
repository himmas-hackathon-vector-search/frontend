import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../store/useTheme";

import IconSearch from "../icons/IconSearch";
import IconSun from "../icons/IconSun";
import IconMoon from "../icons/IconMoon";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className=" flex w-full py-10 px-4 items-center justify-between">
      <NavLink to="/" end>
        <div className="flex items-center justify-between">
          <div className="mr-1">
            <IconSearch
              className="size-8"
              stroke={theme === "dark" ? "#ffffff" : "#000000"}
            />
          </div>
          <div className="hidden text-2xl font-semibold sm:block">
            "Teams Name"
          </div>
        </div>
      </NavLink>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <NavLink
          to="qa"
          className={({ isActive }) =>
            isActive
              ? " text-blue-500 font-bold"
              : " hover:text-blue-400 font-bold"
          }
        >
          Q&A
        </NavLink>
        <NavLink
          to="database"
          className={({ isActive }) =>
            isActive
              ? " text-blue-500 font-bold"
              : " hover:text-blue-400 font-bold"
          }
        >
          Database
        </NavLink>
        <motion.button
          onClick={toggleTheme}
          className="focus:outline-none"
          aria-label="Toggle Theme"
          whileHover={{ scale: 1.1, rotate: 90 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {theme === "dark" ? (
            <IconSun className="size-8 hover:bg-gray-700 hover:fill-blue-400 rounded-full p-1" />
          ) : (
            <IconMoon className="size-8 hover:bg-gray-200 hover:fill-blue-500 rounded-full p-1" />
          )}
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
