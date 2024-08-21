import { NavLink } from "react-router-dom";

import IconSearch from "../icons/IconSearch";

const Header = () => {
  return (
    <header className=" flex w-full py-10 px-4 items-center justify-between shadow-lg bg-white rounded-b-md">
      <NavLink to="/" end>
        <div className="flex items-center justify-between">
          <div className="mr-1">
            <IconSearch className="size-8" />
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
      </div>
    </header>
  );
};

export default Header;
