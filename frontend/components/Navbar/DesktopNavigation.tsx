import Link from 'next/link';
import React from 'react'

interface NavProps {
    title : string;
    link : string;
}
const navigation : NavProps[] = [
        {title : "NEW IN", link : "#new-in"},
        {title : "MEN", link : "#men"},
        {title : "WOMEN", link : "#women"},
        {title : "ACCESSORIES", link : "#accessories"},
        {title : "BEST SELLERS", link : "#best-seller"},
        {title : "SALE", link : "#sale"},
    ]

const DesktopNavigation = () => {

  return (
    <div className='w-3/4  lg:flex hidden justify-between '>
      <div className='flex gap-10'> 
        {
            navigation.map((item : any,ind:any) => {
                return (
                    <Link href={item.link} key={ind}
                    className='text-primary hover:text-primary-hover text-sm   '
                    >{item.title}</Link>
                )
            })
        }
      </div>
    </div>
  )
}

export default DesktopNavigation
