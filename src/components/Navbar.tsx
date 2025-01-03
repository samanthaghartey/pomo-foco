import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(0);
  const [menuListShowing, setMenuListShowing] = useState(false);
  /*   const [menuList, setmenu] = useState(["Home", "Stats", "Settings"]);
   */ const [menuList, setmenu] = useState(["Home"]);

  const showMenu = () => {
    setMenuListShowing((m) => !m);
  };
  return (
    <nav className="bg-primary text-primary min-w-80 rounded-md w-11/12 ">
      <div className="px-4  lg:px-8 w-full">
        <div className="flex justify-between items-center h-16">
          {" "}
          <div className="logo  text-mybackground">
            {" "}
            <Link to={`/Home`}>PomoFoco</Link>{" "}
          </div>
          <div className="hidden md:flex space-x-4">
            {menuList.map((item, index) => (
              <div
                key={index}
                onClick={() => setActive(index)}
                className={`cursor-pointer  rounded-md z-[1]  px-3 py-1 shadow text-xs  ${
                  active == index ? "bg-white text-primary" : "text-white"
                }`}
              >
                <Link to={`/${item}`}>{item}</Link>
              </div>
            ))}
          </div>
          <div className="md:hidden">
            <button id="menu-btn" className="focus:outline-none">
              <FaBars
                className="text-mybackground"
                onClick={() => {
                  showMenu();
                }}
              />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden text-mybackground ${
          menuListShowing ? "" : "hidden"
        }`}
      >
        {menuList.map((item) => (
          <div className="block px-4 py-2 hover:bg-mybackground hover:text-primary hover:border-2 hover:border-primary">
            <Link to={`/${item}`}>{item}</Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
