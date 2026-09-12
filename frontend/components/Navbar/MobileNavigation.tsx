"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navigation } from "./NavigationItems";
import { GoPlus } from "react-icons/go";
import Image from "next/image";

const MobileNavigation = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(null);

  const selectedCategory = navigation.find((item) => item.title === category);

  const toggleSection = (index: number) => {
    setOpenSectionIndex(openSectionIndex === index ? null : index);
  };

  return (
    <nav className="flex-1 overflow-hidden px-4 py-6">
      <AnimatePresence mode="wait" initial={false}>
        {category === null ? (
          <motion.div
            key="main"
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -24, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="mb-3 px-3 text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
              Shop
            </p>
            <motion.ul
              className="space-y-1"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.04 },
                },
              }}
            >
              {navigation.map((item: any, ind: number) => (
                <motion.li
                  key={ind}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.chevronIcon ? (
                    <button
                      onClick={() => {
                        setCategory(item.title);
                        setOpenSectionIndex(null);
                      }}
                      className="group flex w-full items-center justify-between px-3 py-3 text-sm font-medium text-text-primary transition hover:bg-surface-hover"
                    >
                      <span>{item.title}</span>
                      <ChevronRight
                        size={16}
                        strokeWidth={1.5}
                        className="text-text-muted transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  ) : (
                    <Link
                      onClick={() => setCategory(null)}
                      href={"/"}
                      className="group flex items-center justify-between px-3 py-3 text-sm font-medium text-text-primary transition hover:bg-surface-hover"
                    >
                      {item.title}
                    </Link>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ) : (
          <motion.div
            key="category"
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 24, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            <button
              onClick={() => {
                setCategory(null);
                setOpenSectionIndex(null);
              }}
              className="mb-3 flex cursor-pointer items-center gap-1 px-3 text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted transition hover:text-foreground/80"
            >
              <ChevronLeft size={14} strokeWidth={1.5} />
              <span>{category}</span>
            </button>

            <div className="space-y-1">
              {selectedCategory?.sections?.map((item: any, ind: number) => {
                const isOpen = openSectionIndex === ind;

                return (
                  <div
                    key={ind}
                    className="w-full border-b border-border/40 last:border-none"
                  >
                    {/* Accordion Header */}
                    <button
                      type="button"
                      onClick={() => toggleSection(ind)}
                      className="flex cursor-pointer w-full items-center justify-between px-3 py-3 text-sm font-medium text-text-primary transition hover:bg-surface-hover/30"
                    >
                      <span>{item.title}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-text-muted"
                      >
                        {isOpen ? <Minus size={16} /> : <GoPlus size={16} />}
                      </motion.span>
                    </button>

                    {/* Sub-items List */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.25,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                          className="ml-4 space-y-1 overflow-hidden border-l border-border pl-3"
                        >
                          {item.items.map((subItem: string, subInd: number) => (
                            <li
                              key={subInd}
                              className="pt-1.5 first:pt-2 last:pb-2"
                            >
                              <Link
                                href="#"
                                className="block py-1.5 text-xs text-text-muted transition hover:text-text-primary"
                              >
                                {subItem}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            <div className="group/img mt-5 relative h-80 w-64 overflow-hidden rounded-md border border-border shadow-md">
              <Image
                className="object-center object-cover group-hover/img:scale-105 transition-all duration-500 ease-in-out"
                src={`${selectedCategory?.image}`}
                fill
                alt={`${selectedCategory?.title}`}
              />
              {/* Subtle dark*/}
              <div className="absolute  inset-0 bg-linear-to-t from-foreground/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/img:opacity-100" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MobileNavigation;
