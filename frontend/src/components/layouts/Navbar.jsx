import React, { useState } from 'react'
import {HiOutlineMenu, HiOutlineX} from "react-icons/hi" 
 import SideMenu from './SideMenu'
import { FaWallet } from 'react-icons/fa'
 
const Navbar = ({activeMenu}) => {
     const [openSideMenu, setOpenSideMenu] = useState(false)
  return (
    <div className='flex gap-5 border border-b border-gray-200/50
   backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 bg-white/80 shadow-md shadow-gray-300/20'>
     <button className=' block lg:hidden text-black'
     onClick={() => {
    setOpenSideMenu(!openSideMenu)
     }}>
        {openSideMenu ? (
        <HiOutlineX className='text-2xl text-red-500' />
        ) : (
        <HiOutlineMenu className='text-2xl text-primary' />
        )}
        </button>

<div className='flex text-primary items-center space-x-1 flex-wrap'>
          <FaWallet className='sm:relative sm:bottom-5 md:bottom-0'/>
          <h2 className='sm:pb-9 md:pb-0 text-lg font-bold font-cinzel' >Cash<span className='font-serif'>Mind</span></h2>
        </div>
        {
            openSideMenu && (
                <div className='fixed top-[61px] -ml-4 bg-white'>
                    <SideMenu activeMenu={activeMenu} />
                </div>
                )   
        }
    </div>
  )
}

export default Navbar