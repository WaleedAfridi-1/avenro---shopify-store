import React from 'react'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'

interface NavigationArrowsProps {
    handleNext : () => void;
    handlePrevious : () => void;
}

const NavigationArrows : React.FC<NavigationArrowsProps> = ({handleNext, handlePrevious } ) => {
  return (
        <div className="hidden pointer-events-none absolute inset-x-0 top-1/2 z-20 lg:flex -translate-y-1/2 items-center justify-between px-3 md:px-4">
          <button
            type="button"
            onClick={handlePrevious}
            aria-label="Previous slide"
            className="group pointer-events-auto flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full border border-border-border bg-foreground/10 text-text-inverse backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-105 hover:border-text-inverse hover:bg-text-inverse hover:text-foreground hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-inverse focus-visible:ring-offset-2 focus-visible:ring-offset-foreground/20 cursor-pointer"
          >
            <IoArrowBack className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="group pointer-events-auto flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full border border-border-border bg-foreground/10 text-text-inverse backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-105 hover:border-text-inverse hover:bg-text-inverse hover:text-foreground hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-inverse focus-visible:ring-offset-2 focus-visible:ring-offset-foreground/20 cursor-pointer"
          >
            <IoArrowForward className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
  )
}

export default NavigationArrows
