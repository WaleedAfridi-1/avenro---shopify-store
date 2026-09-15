"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

interface Banner {
  id: number
  image: string
  title: string
  subtitle: string
  link: string
}

const banners: Banner[] = [
  {
    id: 1,
    image: '/collections/womenStore.jpg',
    title: 'New Season Arrivals',
    subtitle: 'Discover the Autumn Edit',
    link: '#',
  },
  {
    id: 2,
    image: '/collections/women.jpg',
    title: 'Winter Essentials',
    subtitle: 'Layer Up In Style',
    link: '#',
  },
  {
    id: 3,
    image: '/collections/man.jpg',
    title: 'Casual Comfort',
    subtitle: 'Everyday Wear',
    link: '#',
  },
    {
    id: 4,
    image: '/collections/womenStore2.jpg',
    title: 'Formal Edit',
    subtitle: 'Elegance Redefined',
    link: '#',
  },
  {
    id: 5,
    image: '/collections/accessoriesWomen.jpg',
    title: 'Festive Collection',
    subtitle: 'Celebrate In Style',
    link: '#',
  },
]

const AUTOPLAY_DELAY: number = 5000

const Hero: React.FC = () => {
  const [current, setCurrent] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goToNext = useCallback((): void => {
    setCurrent((prev) => (prev + 1) % banners.length)
  }, [])

  const goToPrev = useCallback((): void => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
  }, [])

  const startInterval = useCallback((): void => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      goToNext()
    }, AUTOPLAY_DELAY)
  }, [goToNext])

  const resetInterval = (): void => {
    if (!isPaused) startInterval()
  }

  const goToSlide = (index: number): void => {
    setCurrent(index)
    resetInterval()
  }

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    startInterval()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, startInterval])

  const handleManualNav = (action: 'next' | 'prev'): void => {
    action === 'next' ? goToNext() : goToPrev()
    resetInterval()
  }

  return (
    <section className='relative w-full h-screen overflow-hidden '>
      <div className='relative w-full h-full overflow-hidden  '>
        <AnimatePresence initial={false} mode='sync'>
          <motion.div
            key={banners[current].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className='absolute inset-0 w-full h-full'
          >
            <Image
              className='object-center object-cover'
              fill
              priority={current === 0}
              alt={banners[current].title}
              src={banners[current].image}
              sizes="100vw"
            />

            {/* Overlay — theme ke overlay tokens use kiye */}
            <div className='absolute inset-0 bg-linear-to-t from-overlay-heavy via-overlay-light/40 to-overlay-light flex flex-col items-start justify-end  text-center px-4'>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='text-text-inverse text-sm md:text-base uppercase tracking-[0.3em] mb-3 font-medium'
              >
                {banners[current].subtitle}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='text-text-inverse text-3xl md:text-5xl lg:text-6xl font-bold font-sans mb-6'
              >
                {banners[current].title}
              </motion.h1>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                href={banners[current].link}
                className='border border-text-inverse text-text-inverse text-sm uppercase tracking-wider px-8 py-3 hover:bg-text-inverse hover:text-foreground transition-all duration-300'
              >
                Shop Now
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>


        {/* Pagination Dots */}
        <div className='absolute bottom-6 md:bottom-20 right-10 -translate-x-1/2 z-20 flex items-center gap-2'>
          {banners.map((banner: Banner, index: number) => (
            <button
              key={banner.id}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className='relative h-1.5 rounded-full overflow-hidden transition-all duration-300 bg-overlay-light'
              style={{ width: current === index ? '32px' : '8px' }}
            >
              {current === index && !isPaused && (
                <motion.span
                  key={current}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: AUTOPLAY_DELAY / 1000, ease: 'linear' }}
                  className='absolute inset-y-0 left-0 bg-text-inverse'
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero