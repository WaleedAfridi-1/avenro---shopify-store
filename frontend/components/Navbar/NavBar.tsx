"use client"
import React from 'react'
import DesktopNavigation from './DesktopNavigation'
import { CiUser } from "react-icons/ci";
import { IoIosSearch, IoIosMenu, IoMdHeartEmpty } from "react-icons/io";
import { BsHandbag } from "react-icons/bs";
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setSearchOpen } from '@/src/redux/slices/SearchSlice';

const NavBar = () => {
  const dispatch = useDispatch()
  return (
    <nav  className=' sticky top-0 z-99  w-full h-16 px-2 md:px-4 lg:px-10 py-6 flex justify-between  items-center bg-surface/ backdrop-blur-sm  border-b border-border shadow-sm '>
      
      {/* sm Menu  */}
      <label htmlFor='avenro-drawer' className=' block lg:hidden '>
        <IoIosMenu className='h-6 w-6 cursor-pointer  active:scale-95'/>
      </label>

      {/* Logo  */}
      <div className='w-fit px-4 py-1.5  '>
        <p className='text-base uppercase text-primary-active hover:text-primary-hover transition-all duration-300 font-bold font-sans cursor-pointer '>AVENRO</p>
      </div>

      <DesktopNavigation/>

      {/* icons - login, search, wishlist,  cart   */}
      <div className='px-4   flex items-center gap-6'>
        <Link href={"#"} className='hidden md:block'>
          <CiUser className='w-6 h-6  active:scale-95 text-foreground'/>
        </Link>

        <button
        onClick={() => dispatch(setSearchOpen(true))}
        >
          <IoIosSearch 
          className='w-6 h-6 cursor-pointer active:scale-95'/>
        </button>

        <Link href={"#"} className='hidden lg:block'>
          <IoMdHeartEmpty className='w-6 h-6 active:scale-95'/>
        </Link>

        <Link href={"#"}>
          <BsHandbag className='w-6 h-6 active:scale-95'/>
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
