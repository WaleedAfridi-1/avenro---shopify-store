import Link from 'next/link';



interface NavProps {
    title: string;
    link: string;
}

const navigation: NavProps[] = [
    { title: "NEW IN", link: "#new-in" },
    { title: "MEN", link: "#men" },
    { title: "WOMEN", link: "#women" },
    { title: "ACCESSORIES", link: "#accessories" },
    { title: "BEST SELLERS", link: "#best-seller" },
    { title: "SALE", link: "#sale" },
]

const DesktopNavigation = () => {
  return (
    <div className='h-16 w-3/4 lg:flex hidden justify-center'>
      <div className='h-full flex gap-6'>
        {navigation.map((item, ind) => (
          <Link
            href={item.link}
            key={ind}
            className='relative h-full flex px-3 items-center text-center group'
          >
            <p className='text-primary group-hover:text-primary-hover text-sm transition-colors duration-300'>
              {item.title}
            </p>

            {/* Animated underline */}
            <span className='absolute left-0 bottom-0 h-0.5 w-full bg-primary-hover scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100' />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DesktopNavigation