"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";
import { navigation } from "./NavigationItems";
import { motion, AnimatePresence } from "framer-motion";

const DesktopNavigation = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="hidden h-16 w-3/4 justify-center lg:flex">
      <div className="flex h-full gap-2">
        {navigation.map((item: any, ind: number) => {
          const isHovered = hoveredIndex === ind;

          return (
            <div
              key={ind}
              onMouseEnter={() => setHoveredIndex(ind)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group  flex h-full items-center px-3 text-center"
            >
              <Link
                href={item.link || "#"}
                className="relative flex h-full items-center px-1 text-sm text-primary transition-colors duration-300 hover:text-primary-hover whitespace-nowrap"
              >
                <p className="text-sm">{item.title}</p>
                {item.chevronIcon && (
                  <BiChevronDown
                    className={`ml-1 text-lg transition-transform duration-300 ease-in-out ${
                      isHovered ? "rotate-180 scale-105" : "rotate-0"
                    }`}
                  />
                )}

                {/* Underline */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-full origin-left bg-primary-hover transition-transform duration-300 ease-out ${
                    isHovered ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {item.chevronIcon && isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, display: "none" }}
                    animate={{ opacity: 1, y: 0, display: "block" }}
                    exit={{ opacity: 0, y: 8, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-full max-w-7xl border border-border-strong bg-surface shadow-xl shadow-foreground/5 z-50 overflow-hidden"
                  >
                    {/* Content Container */}
                    <div className="mx-auto px-10 py-8">
                      <div className="flex items-start justify-center gap-16">
                        {/* Navigation Sections */}
                        {item.sections?.map((section: any, id: number) => (
                          <motion.div
                            key={id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.25,
                              delay: id * 0.04,
                            }}
                            className="text-left"
                          >
                            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-text-primary">
                              {section.title}
                            </p>

                            <div className="flex flex-col space-y-2.5">
                              {section.items?.map((cat: string, catIdx: number) => (
                                <Link
                                  key={catIdx}
                                  href="#"
                                  className="group/link flex items-center font-mono text-xs text-text-muted transition-colors duration-200 hover:text-foreground"
                                >
                                  <span className="transition-transform duration-200 group-hover/link:translate-x-1">
                                    {cat}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        ))}

                        {/* Banner Image Card */}
                        {item.image && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="group/img relative h-80 w-64 overflow-hidden rounded-md border border-border shadow-md"
                          >
                            <Image
                              className="object-cover object-center transition-transform duration-500 ease-out group-hover/img:scale-105"
                              alt={item.title || "Category banner"}
                              fill
                              src={item.image}
                              sizes="256px"
                            />
                            {/* Subtle dark*/}
                            <div className="absolute inset-0 bg-linear-to-t from-foreground/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/img:opacity-100" />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopNavigation;