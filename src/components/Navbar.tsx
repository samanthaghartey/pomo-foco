import React from 'react'

const Navbar = () => {
  return (
    <nav className='navbar  bg-white rounded-box  py-0 lg:px-10 sm:px-5 shadow-black '>
        <div className="logo navbar-start text-blue-700" > LOGO </div>
        <div className="navbar-end  flex ">
        <ul className='   flex flex-row  dropdown-content  '>
            <li className="bg-blue-700 rounded-md z-[1]  px-3 py-1 shadow ml-5"> <a href="">STATS</a> </li>
            <li className=" rounded-md z-[1]  px-3 py-1 shadow ml-5 text-blue-700"> <a href="">SETTINGS</a> </li>
            <li className=" rounded-md z-[1]  px-3 py-1 shadow ml-5 text-blue-700"> <a href="">SG</a> </li>
        </ul>
        </div>
        
    </nav>
  )
}

export default Navbar