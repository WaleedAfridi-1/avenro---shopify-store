"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IoArrowForward } from "react-icons/io5";
import Link from "next/link";
import { banners , Banner } from "./hero-data"


const AUTOPLAY_DELAY: number = 5000;

const Hero: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToNext = useCallback((): void => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, []);

  const startInterval = useCallback((): void => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goToNext();
    }, AUTOPLAY_DELAY);
  }, [goToNext]);

  const resetInterval = (): void => {
    if (!isPaused) startInterval();
  };

  const goToSlide = (index: number): void => {
    setCurrent(index);
    resetInterval();
  };

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, startInterval]);

  const slideNumber = String(current + 1).padStart(2, "0");
  const totalSlides = String(banners.length).padStart(2, "0");

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={banners[current].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {/* zoom wrapper */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: AUTOPLAY_DELAY / 1000 + 0.9, ease: "linear" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                className="object-center object-cover"
                fill
                priority={current === 0}
                alt={banners[current].title}
                src={banners[current].image}
                sizes="100vw"
              />
            </motion.div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-overlay-heavy via-overlay-light/30 to-transparent" />

            {/* Content Block */}
            <div className="absolute inset-0  flex flex-col justify-end">
              <div className="px-6 md:px-12 lg:px-20 pb-24 md:pb-28 lg:pb-32 max-w-3xl">
                
                {/* Eyebrow  */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3 mb-4 md:mb-5"
                >
                  <span className="w-8 md:w-12 h-px bg-text-inverse/70" />
                  <p className="text-text-inverse text-xs md:text-sm font-mono uppercase font-medium tracking-[0.35em]">
                    {banners[current].eyebrow}
                  </p>
                </motion.div>

                {/* Title —  */}
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="text-text-inverse text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold uppercase tracking-tight leading-[0.95] mb-7 md:mb-9"
                >
                  {banners[current].title}
                </motion.h1>

                {/* Button  */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={banners[current].link}
                    className="group isolate relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-text-inverse/80 pl-6 pr-2 py-2 md:pl-7 md:pr-2.5 md:py-2.5 transition-colors duration-300 hover:border-text-inverse"
                  >
                    <span className="text-text-inverse text-xs md:text-sm font-medium uppercase tracking-[0.2em] transition-colors duration-300">
                      Shop Now
                    </span>
                    <span className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-text-inverse text-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:rotate-45">
                      <IoArrowForward className="w-4 h-4" />
                    </span>
                    {/* Hover fill sweep */}
                    <span className="absolute inset-0 -z-10 bg-text-inverse/0 group-hover:bg-text-inverse/20 transition-colors duration-300 rounded-full" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom bar — pagination dots,*/}
        <div className="absolute bottom-6 md:bottom-10 left-0 right-0 z-20 px-6 md:px-12 lg:px-20 flex items-center justify-center">
          

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0">
            {banners.map((banner: Banner, index: number) => (
              <button
                key={banner.id}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="relative h-1 rounded-full cursor-pointer overflow-hidden transition-all duration-300 bg-text-inverse/30"
                style={{ width: current === index ? "40px" : "8px" }}
              >
                {current === index && !isPaused && (
                  <motion.span
                    key={current}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTOPLAY_DELAY / 1000, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-text-inverse"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right spacer for symmetry on desktop */}
          <div className="hidden sm:block w-10" />
        </div>
      </div>
    </section>
  );
};

export default Hero;