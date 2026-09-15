"use client"
import React, { useState, useEffect } from 'react'
import DesktopNavigation from './DesktopNavigation'
import { CiUser } from "react-icons/ci";
import { IoIosSearch, IoIosMenu, IoMdHeartEmpty } from "react-icons/io";
import { BsHandbag } from "react-icons/bs";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchOpen } from '@/src/redux/slices/SearchSlice';
import { RootState } from '@/src/redux/store';

const NavBar = () => {
  const dispatch = useDispatch()
  const searchIsOpen = useSelector((state: RootState) => state.search.isOpen)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getNavStyles = () => {
    if (searchIsOpen) return 'bg-surface text-foreground shadow-sm'
    if (isScrolled) return 'bg-surface-glass backdrop-blur-md shadow-sm text-foreground'
    return 'bg-transparent shadow-none'
  }

  const showLightScrim = !isScrolled && !searchIsOpen

return (
  <>
    
    {!isScrolled && !searchIsOpen && (
      <div className="fixed top-0 left-0 w-full h-24 bg-linear-to-b from-foreground/30 via-foreground/15 to-transparent pointer-events-none z-40 transition-opacity duration-300" />
    )}

    <nav 
      className={`group hover:bg-surface fixed top-0 left-0 z-50 w-full px-2 md:px-4 lg:px-10 py-4 lg:py-2 flex justify-between items-center transition-all duration-300 ${getNavStyles()}`}
    >
      {/* Mobile Menu */}
      <label htmlFor='avenro-drawer' className='block lg:hidden'>
        <IoIosMenu className={`${isScrolled ? `text-foreground`:`${searchIsOpen ? "text-foreground" : "text-text-inverse"}`} h-6 w-6 cursor-pointer active:scale-95`}/>
      </label>

      {/* Logo */}
      <div className='w-fit px-4 py-1.5'>
        <p className={`${ isScrolled ? `text-primary-active`:`${searchIsOpen ? "text-primary" : "text-text-inverse"}`} text-base uppercase group-hover:text-primary-active hover:text-primary-hover transition-all duration-300 font-bold font-sans cursor-pointer`}>
          AVENRO
        </p>
      </div>

      <DesktopNavigation isScrolled={isScrolled} searchIsOpen={searchIsOpen}/>

      {/* Icons */}
      <div className={`${ isScrolled ? `text-primary-active`:`${searchIsOpen ? "text-primary" : "text-text-inverse"}`} px-4 text-primary group-hover:text-primary flex items-center gap-6`}>
        <Link href={"#"} className='hidden md:block'>
          <CiUser className='w-6 h-6 active:scale-95'/>
        </Link>
        <button onClick={() => dispatch(setSearchOpen(true))}>
          <IoIosSearch className='w-6 h-6 cursor-pointer active:scale-95'/>
        </button>
        <Link href={"#"} className='hidden lg:block'>
          <IoMdHeartEmpty className='w-6 h-6 active:scale-95'/>
        </Link>
        <Link href={"#"}>
          <BsHandbag className='w-6 h-6 active:scale-95'/>
        </Link>
      </div>
    </nav>
  </>
)
}

export default NavBar