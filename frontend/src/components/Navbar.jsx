import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa'
import { FaMailBulk } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";

function Home() {

    const [nav, setNav] = useState(false)

    function handleNav() {
        setNav(!nav)
    }

    return (
        <div className="Home">
            <div className='Navbar fixed w-full top-0 z-50'>
                <div className="flex w-full justify-between items-center h-16 px-8 absolute backdrop-blur-md bg-transparent font-bold">
                    <div className="text-lg sm:text-3xl md:text-xl text-black">Workspace Computers Limited</div>
                    {/* NavBar By Default */}
                    <ul className='hidden space-x-4 md:block lg:flex text-black'>
                        <div className="flex space-x-2">
                            <FaMailBulk size={20} className="text-black" />
                            <h1>workspacecomputers@gmail.com</h1>
                        </div>
                        <div className="flex space-x-26">
                            <FaPhoneVolume size={20} className="text-black" />
                            <h1>+255 766 598 445</h1>
                        </div>
                    </ul>

                    {/* FaBars icon for mobile */}
                    <div className="md:hidden z-20 text-white" onClick={handleNav}>
                        {nav ? <FaTimes size={20} className='text-black' /> : <FaBars size={20} className='text-black' />}
                    </div>

                    {/* NavBar in sm Screens only */}
                    <div className={`md:hidden absolute top-50 left-0 w-full h-full backdrop-blur-sm py-32 flex flex-row text-center transition duration-300 ${nav ? "" : "translate-x-full"}`}>
                        <ul className="mx-auto w-full p-4 font-bold block sm:flex text-lg">
                            <li className="flex items-center text-center sm:mr-4">
                                <FaMailBulk size={20} className="text-black mr-2" />
                                <h1>workspacecomputers@gmail.com</h1>
                            </li>
                            <li className="flex items-center text-center">
                                <FaPhoneVolume size={20} className="text-black mr-2" />
                                <h1>+255 766 598 445</h1>
                            </li>
                            <h1 className="italic font-sans text-2xl animate-bounce mt-3 sm:hidden">Welcome All</h1>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home