import Image from "next/image";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";
import { navigation } from "./NavigationItems";

const DesktopNavigation = () => {
  return (
    <div className="h-16 w-3/4 lg:flex hidden justify-center">
      <div className="h-full flex gap-2">
        {navigation.map((item, ind) => (
          <div
            key={ind}
            className="group  h-full flex px-3 items-center text-center "
          >
            <Link
              href={item.link}
              className="relative flex items-center px-1 h-full text-primary whitespace-nowrap group-hover:text-primary-hover text-sm transition-colors duration-300"
            >
              <p className="text-sm">{item.title}</p>
              {item.chevronIcon && (
                <BiChevronDown className="group-hover:scale-101 group-hover:-rotate-180 transition-all duration-300 ease-in-out" />
              )}
              {/* Animated underline */}
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-primary-hover scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>

            {/*  Dropdown */}
            {item.chevronIcon && (
              <div className="absolute    bg-surface border border-border-strong shadow-sm shadow-foreground left-1/2 -translate-x-1/2 top-full hidden w-full group-hover:block transition-all duration-500 ease-in-out">
                {/* Content Container */}
                <div className="mx-auto max-w-360 px-10 py-4 mt-4">
                  <div className="flex items-start justify-center gap-20">
                    {/* Sections  */}
                    {item.chevronIcon  &&
                      item.sections?.map((item: any, id:number) => {
                        return (
                          <div key={id} className="justify-start ">
                            <p className="mb-5 text-start text-sm tracking-[0.25em] font-normal font-mono">
                              {item.title}
                            </p>

                            <div className="space-y-3  flex flex-col items-start ">
                              {item.items.map((cat : any) => {
                                return (
                                  <Link key={cat} href="#" className="text-text-muted hover:text-foreground/80 font-mono transition-all duration-300 ease-in-out">
                                    {cat}
                                  </Link>
                                ) 
                              })}
                            </div>
                          </div>
                        );
                      })}
                      <div className="relative   w-64 h-80 items-start overflow-hidden rounded shadow-sm border border-border">
                        <Image
                        className="object-cover object-center "
                        alt="man"
                        fill
                        src={`${item.image}`}
                        />
                      </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopNavigation;
