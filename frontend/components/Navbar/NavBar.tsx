import React from 'react'
import DesktopNavigation from './DesktopNavigation'

const NavBar = () => {
  return (
    <nav className='w-full h-16 px-2 md:px-4 lg:px-10 py-6 flex justify-between  items-center bg-surface border-b border-border shadow-sm '>
      
      {/* Logo  */}
      <div className='w-fit px-4 py-1.5  '>
        <p className='text-base uppercase text-primary-active hover:text-primary-hover transition-all duration-300 font-bold font-sans cursor-pointer '>AVENRO</p>
      </div>

      <DesktopNavigation/>
    </nav>
  )
}

export default NavBar
