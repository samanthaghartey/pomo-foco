import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white text-primary min-w-96 rounded-md lg:w-full ">
      <div className="px-4  lg:px-8 w-full">
        <div className="flex justify-between items-center h-16">
          {" "}
          <div className="logo  text-blue-700"> LOGO </div>
          <div className="hidden md:flex space-x-4">
            <div className="bg-blue-700 rounded-md z-[1]  px-3 py-1 shadow ">
              {" "}
              <a href="">STATS</a>{" "}
            </div>
            <div className=" rounded-md z-[1]  px-3 py-1 shadow  text-blue-700">
              {" "}
              <a href="">SETTINGS</a>{" "}
            </div>
            <div className=" rounded-md z-[1]  px-3 py-1 shadow  text-blue-700">
              {" "}
              <a href="">SG</a>{" "}
            </div>
          </div>
          <div className="md:hidden">
            <button id="menu-btn" className="focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-menu" className="md:hidden hidden">
        <a className="block px-4 py-2 hover:bg-gray-700">Home</a>
        <a className="block px-4 py-2 hover:bg-gray-700">About</a>
        <a className="block px-4 py-2 hover:bg-gray-700">Services</a>
        <a className="block px-4 py-2 hover:bg-gray-700">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
