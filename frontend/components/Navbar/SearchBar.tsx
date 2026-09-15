"use client"
import { setSearchOpen } from '@/src/redux/slices/SearchSlice';
import { RootState } from '@/src/redux/store';
import { X } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const isOpen = useSelector((state: RootState) => state.search.isOpen);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        dispatch(setSearchOpen(false));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, dispatch]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur*/}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0  }}
            transition={{ duration: 0.2 }}
            onClick={() => dispatch(setSearchOpen(false))}
            className="fixed inset-x-0 bottom-0 top-16 z-50 bg-foreground/50 backdrop-blur-xs"
          />

          {/* Search Bar  */}
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-16 left-0 right-0 z-50 w-full bg-surface shadow-md border-y  border-border-strong px-3 md:px-14 py-4"
          >
            <div className="max-w-7xl mx-auto flex items-center gap-3">
              <IoIosSearch className="w-6 h-6 text-foreground/70 shrink-0" />
              
              <input
                ref={inputRef}
                type="text"
                name="search"
                id="search"
                placeholder="SEARCH FOR PRODUCT..."
                className="w-full px-4 py-2 text-base md:text-lg tracking-widest bg-transparent placeholder:font-mono focus:outline-none text-foreground"
              />

              <button 
                onClick={() => dispatch(setSearchOpen(false))}
                className="p-1 rounded-full hover:bg-foreground/5  transition-colors shrink-0"
              >
                <X className="w-6 h-6 text-foreground cursor-pointer active:scale-95 transition-all duration-300 ease-in-out" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;