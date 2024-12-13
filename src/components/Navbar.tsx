import { truncate } from "node:fs";
import React, { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";

const Navbar = () => {
  const [active, setActive] = useState(true);
  const [menuListShowing, setMenuListShowing] = useState(false);

  const showMenu = () => {
    setMenuListShowing((m) => !m);
  };
  return (
    <nav className="bg-primary text-primary min-w-96 rounded-md lg:w-full ">
      <div className="px-4  lg:px-8 w-full">
        <div className="flex justify-between items-center h-16">
          {" "}
          <div className="logo  text-mybackground"> LOGO </div>
          <div className="hidden md:flex space-x-4">
            <div className="bg-mybackground text-primary rounded-md z-[1]  px-3 py-1 shadow ">
              {" "}
              <a href="">STATS</a>{" "}
            </div>
            <div className=" rounded-md z-[1]  px-3 py-1 shadow  text-mybackground">
              {" "}
              <a href="">SETTINGS</a>{" "}
            </div>
            <div className=" rounded-md z-[1]  px-3 py-1 shadow  text-mybackground">
              {" "}
              <a href="">SG</a>{" "}
            </div>
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
        <a className="block px-4 py-2 hover:bg-mybackground hover:text-primary hover:border-2 hover:border-primary">
          Home
        </a>
        <a className="block px-4 py-2 hover:bg-mybackground hover:text-primary hover:border-2 hover:border-primary">
          About
        </a>
        <a className="block px-4 py-2 hover:bg-mybackground hover:text-primary hover:border-2 hover:border-primary">
          Services
        </a>
        <a className="block px-4 py-2 hover:bg-mybackground hover:text-primary hover:border-2 hover:border-primary rounded-b-lg">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
