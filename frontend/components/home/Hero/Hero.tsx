"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  animate,
  motion,
  PanInfo,
  useMotionValue,
} from "framer-motion";
import { IoArrowForward } from "react-icons/io5";
import Link from "next/link";
import { banners, Banner } from "./hero-data";
import NavigationArrows from "./NavigationArrows";

const AUTOPLAY_DELAY = 5000;
const SWIPE_THRESHOLD = 80;
const SWIPE_VELOCITY = 500;
const TRANSITION_DURATION = 0.65;

type SwipeDirection = 1 | -1;

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const trackX = useMotionValue(0);

  const isAnimatingRef = useRef(false);
  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /*
   * --------------------------------------------------
   * DEVICE / VIEWPORT
   * --------------------------------------------------
   */

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;

      setViewportWidth(width);
      setIsTouchDevice(width < 1024);
    };

    updateViewport();

    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  /*
   * --------------------------------------------------
   * KEEP TRACK CENTERED
   *
   * Track structure:
   *
   * [ Previous ][ Current ][ Next ]
   *
   * Current starts at:
   * -viewportWidth
   * --------------------------------------------------
   */

  useEffect(() => {
    if (!viewportWidth) return;

    trackX.set(-viewportWidth);
  }, [viewportWidth, trackX]);

  /*
   * --------------------------------------------------
   * INDEX HELPERS
   * --------------------------------------------------
   */

  const getPreviousIndex = useCallback(
    (index: number): number => {
      return (index - 1 + banners.length) % banners.length;
    },
    [],
  );

  const getNextIndex = useCallback(
    (index: number): number => {
      return (index + 1) % banners.length;
    },
    [],
  );

  /*
   * --------------------------------------------------
   * AUTOPLAY
   * --------------------------------------------------
   */

  const clearAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  /*
   * --------------------------------------------------
   * SLIDE NAVIGATION
   * --------------------------------------------------
   */

  const navigate = useCallback(
    (direction: SwipeDirection) => {
      if (
        !viewportWidth ||
        isAnimatingRef.current ||
        banners.length <= 1
      ) {
        return;
      }

      isAnimatingRef.current = true;
      clearAutoplay();

      const targetX =
        direction === 1
          ? -viewportWidth * 2
          : 0;

      animate(trackX, targetX, {
        duration: TRANSITION_DURATION,
        ease: [0.16, 1, 0.3, 1],

        onComplete: () => {
          setCurrent((prev) =>
            direction === 1
              ? getNextIndex(prev)
              : getPreviousIndex(prev),
          );

          /*
           * Immediately put the track back
           * in the centered position.
           *
           * No visible jump because the slide
           * data has already changed.
           */
          trackX.set(-viewportWidth);

          isAnimatingRef.current = false;
        },
      });
    },
    [
      viewportWidth,
      trackX,
      clearAutoplay,
      getNextIndex,
      getPreviousIndex,
    ],
  );

  const handleNext = useCallback(() => {
    navigate(1);
  }, [navigate]);

  const handlePrevious = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  /*
   * --------------------------------------------------
   * SWIPE START
   * --------------------------------------------------
   */

  const handleDragStart = useCallback(() => {
    if (!isTouchDevice) return;

    clearAutoplay();
    setIsDragging(true);
  }, [isTouchDevice, clearAutoplay]);

  /*
   * --------------------------------------------------
   * SWIPE END
   * --------------------------------------------------
   */

  const handleDragEnd = useCallback(
    (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
    ) => {
      setIsDragging(false);

      if (!isTouchDevice || !viewportWidth) {
        return;
      }

      const offsetX = info.offset.x;
      const velocityX = info.velocity.x;

      const shouldGoNext =
        offsetX < -SWIPE_THRESHOLD ||
        velocityX < -SWIPE_VELOCITY;

      const shouldGoPrevious =
        offsetX > SWIPE_THRESHOLD ||
        velocityX > SWIPE_VELOCITY;

      /*
       * Swipe LEFT
       */
      if (shouldGoNext) {
        navigate(1);
        return;
      }

      /*
       * Swipe RIGHT
       */
      if (shouldGoPrevious) {
        navigate(-1);
        return;
      }

      /*
       * Swipe wasn't strong enough.
       *
       * Smoothly return to center.
       */
      animate(trackX, -viewportWidth, {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],

        onComplete: () => {
          /*
           * Restart autoplay after
           * the failed swipe.
           */
          if (!isPaused) {
            scheduleAutoplay();
          }
        },
      });
    },
    [
      isTouchDevice,
      viewportWidth,
      navigate,
      trackX,
      isPaused,
    ],
  );

  /*
   * --------------------------------------------------
   * GO TO SPECIFIC SLIDE
   * --------------------------------------------------
   */

  const goToSlide = useCallback(
    (index: number) => {
      if (
        index === current ||
        isAnimatingRef.current ||
        !viewportWidth
      ) {
        return;
      }

      clearAutoplay();

      const direction: SwipeDirection =
        index > current ? 1 : -1;

      /*
       * For pagination we use the same
       * slide transition system.
       */
      isAnimatingRef.current = true;

      const targetX =
        direction === 1
          ? -viewportWidth * 2
          : 0;

      animate(trackX, targetX, {
        duration: TRANSITION_DURATION,
        ease: [0.16, 1, 0.3, 1],

        onComplete: () => {
          setCurrent(index);

          trackX.set(-viewportWidth);

          isAnimatingRef.current = false;
        },
      });
    },
    [
      current,
      viewportWidth,
      clearAutoplay,
      trackX,
    ],
  );

  /*
   * --------------------------------------------------
   * AUTOPLAY SCHEDULER
   * --------------------------------------------------
   */

  const scheduleAutoplay = useCallback(() => {
    clearAutoplay();

    if (
      isPaused ||
      isDragging ||
      isAnimatingRef.current ||
      banners.length <= 1
    ) {
      return;
    }

    autoplayRef.current = setTimeout(() => {
      handleNext();
    }, AUTOPLAY_DELAY);
  }, [
    clearAutoplay,
    isPaused,
    isDragging,
    handleNext,
  ]);

  /*
   * --------------------------------------------------
   * AUTOPLAY EFFECT
   * --------------------------------------------------
   */

  useEffect(() => {
    if (!viewportWidth) return;

    if (isPaused || isDragging) {
      clearAutoplay();
      return;
    }

    scheduleAutoplay();

    return () => {
      clearAutoplay();
    };
  }, [
    current,
    viewportWidth,
    isPaused,
    isDragging,
    scheduleAutoplay,
    clearAutoplay,
  ]);

  /*
   * --------------------------------------------------
   * CLEANUP
   * --------------------------------------------------
   */

  useEffect(() => {
    return () => {
      clearAutoplay();
    };
  }, [clearAutoplay]);

  /*
   * --------------------------------------------------
   * CURRENT / ADJACENT SLIDES
   * --------------------------------------------------
   */

  const previousIndex = getPreviousIndex(current);
  const nextIndex = getNextIndex(current);

  const visibleSlides = [
    banners[previousIndex],
    banners[current],
    banners[nextIndex],
  ];

  const slideNumber = String(current + 1).padStart(2, "0");
  const totalSlides = String(banners.length).padStart(2, "0");

  /*
   * --------------------------------------------------
   * RENDER
   * --------------------------------------------------
   */

  return (
    <section
      className="
        relative
        w-full
        h-screen
        overflow-hidden
        bg-black
      "
      aria-label="Featured products"
    >
      <div className="relative w-full h-full overflow-hidden">

        {/* ==========================================
            SWIPE TRACK
            ========================================== */}

        <motion.div
          className="
            absolute
            top-0
            left-0
            h-full
            flex
            touch-pan-y
            select-none
          "
          style={{
            width: viewportWidth
              ? viewportWidth * 3
              : "300vw",
            x: trackX,
          }}
          drag={isTouchDevice ? "x" : false}
          dragConstraints={{
            left: viewportWidth
              ? -viewportWidth * 2
              : 0,
            right: 0,
          }}
          dragElastic={0.04}
          dragDirectionLock
          onDragStart={
            isTouchDevice
              ? handleDragStart
              : undefined
          }
          onDragEnd={
            isTouchDevice
              ? handleDragEnd
              : undefined
          }
        >
          {visibleSlides.map(
            (banner: Banner, index: number) => {
              const isCurrentSlide = index === 1;

              return (
                <div
                  key={`${banner.id}-${index}`}
                  className="
                    relative
                    h-full
                    shrink-0
                    overflow-hidden
                  "
                  style={{
                    width: viewportWidth || "100vw",
                  }}
                >
                  {/* ==================================
                      IMAGE + ZOOM
                      ================================== */}

                  <motion.div
                    className="
                      absolute
                      inset-0
                      w-full
                      h-full
                    "
                    initial={{
                      scale: isCurrentSlide ? 1 : 1.05,
                    }}
                    animate={{
                      scale: isCurrentSlide ? 1.05 : 1.05,
                    }}
                    transition={{
                      duration:
                        AUTOPLAY_DELAY / 1000 +
                        TRANSITION_DURATION,
                      ease: "linear",
                    }}
                  >
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      priority={
                        isCurrentSlide ||
                        current === 0
                      }
                      sizes="100vw"
                      draggable={false}
                      className="
                        object-cover
                        object-[60%_center]
                      "
                    />
                  </motion.div>

                  {/* ==================================
                      OVERLAY
                      ================================== */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-linear-to-t
                      from-overlay-heavy
                      via-overlay-light/30
                      to-transparent
                    "
                  />

                  {/* ==================================
                      CONTENT
                      Only render content for the
                      current slide.
                      ================================== */}

                  {isCurrentSlide && (
                    <div
                      className="
                        absolute
                        inset-0
                        flex
                        flex-col
                        justify-end
                      "
                    >
                      <div
                        className="
                          px-6
                          md:px-12
                          lg:px-20
                          pb-24
                          md:pb-28
                          lg:pb-32
                          max-w-3xl
                        "
                      >
                        {/* Eyebrow */}

                        <motion.div
                          initial={{
                            opacity: 0,
                            x: -20,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            duration: 0.7,
                            delay: 0.3,
                            ease: [
                              0.16,
                              1,
                              0.3,
                              1,
                            ],
                          }}
                          className="
                            flex
                            items-center
                            gap-3
                            mb-4
                            md:mb-5
                          "
                        >
                          <span
                            className="
                              w-8
                              md:w-12
                              h-px
                              bg-text-inverse/70
                            "
                          />

                          <p
                            className="
                              text-text-inverse
                              text-xs
                              md:text-sm
                              font-mono
                              uppercase
                              font-medium
                              tracking-[0.35em]
                            "
                          >
                            {banner.eyebrow}
                          </p>
                        </motion.div>

                        {/* Title */}

                        <motion.h1
                          initial={{
                            opacity: 0,
                            y: 40,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.8,
                            delay: 0.45,
                            ease: [
                              0.16,
                              1,
                              0.3,
                              1,
                            ],
                          }}
                          className="
                            text-text-inverse
                            text-4xl
                            sm:text-5xl
                            md:text-6xl
                            lg:text-7xl
                            font-semibold
                            uppercase
                            tracking-tight
                            leading-[0.95]
                            mb-7
                            md:mb-9
                          "
                        >
                          {banner.title}
                        </motion.h1>

                        {/* Shop Button */}

                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.7,
                            delay: 0.6,
                            ease: [
                              0.16,
                              1,
                              0.3,
                              1,
                            ],
                          }}
                        >
                          <Link
                            href={banner.link}
                            className="
                              group
                              isolate
                              relative
                              inline-flex
                              items-center
                              gap-3
                              overflow-hidden
                              rounded-full
                              border
                              border-text-inverse/80
                              pl-6
                              pr-2
                              py-2
                              md:pl-7
                              md:pr-2.5
                              md:py-2.5
                              transition-colors
                              duration-300
                              hover:border-text-inverse
                            "
                          >
                            <span
                              className="
                                text-text-inverse
                                text-xs
                                md:text-sm
                                font-medium
                                uppercase
                                tracking-[0.2em]
                                transition-colors
                                duration-300
                              "
                            >
                              Shop Now
                            </span>

                            <span
                              className="
                                flex
                                items-center
                                justify-center
                                w-8
                                h-8
                                md:w-9
                                md:h-9
                                rounded-full
                                bg-text-inverse
                                text-foreground
                                transition-transform
                                duration-300
                                group-hover:translate-x-0.5
                                -rotate-45
                                group-hover:rotate-0
                              "
                            >
                              <IoArrowForward className="w-4 h-4" />
                            </span>

                            {/* Hover fill */}

                            <span
                              className="
                                absolute
                                inset-0
                                -z-10
                                bg-text-inverse/0
                                group-hover:bg-text-inverse/20
                                transition-colors
                                duration-300
                                rounded-full
                              "
                            />
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  )}
                </div>
              );
            },
          )}
        </motion.div>

        {/* ==========================================
            DESKTOP NAVIGATION
            NavigationArrows component itself can
            handle its responsive visibility.
            ========================================== */}

        <NavigationArrows
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />

        {/* ==========================================
            PAGINATION
            ========================================== */}

        <div
          className="
            absolute
            bottom-6
            md:bottom-10
            left-0
            right-0
            z-20
            px-6
            md:px-12
            lg:px-20
            flex
            items-center
            justify-center
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              gap-2
              mx-auto
              sm:mx-0
            "
          >
            {banners.map(
              (banner: Banner, index: number) => (
                <button
                  key={banner.id}
                  type="button"
                  onClick={() =>
                    goToSlide(index)
                  }
                  aria-label={`Go to slide ${
                    index + 1
                  }`}
                  aria-current={
                    current === index
                      ? "true"
                      : undefined
                  }
                  className="
                    relative
                    h-1
                    rounded-full
                    cursor-pointer
                    overflow-hidden
                    transition-all
                    duration-300
                    bg-text-inverse/30
                  "
                  style={{
                    width:
                      current === index
                        ? "40px"
                        : "8px",
                  }}
                >
                  {current === index &&
                    !isPaused &&
                    !isDragging && (
                      <motion.span
                        key={`${current}-${isDragging}`}
                        initial={{
                          width: "0%",
                        }}
                        animate={{
                          width: "100%",
                        }}
                        transition={{
                          duration:
                            AUTOPLAY_DELAY / 1000,
                          ease: "linear",
                        }}
                        className="
                          absolute
                          inset-y-0
                          left-0
                          bg-text-inverse
                        "
                      />
                    )}
                </button>
              ),
            )}
          </div>

          {/* Desktop symmetry spacer */}

          <div className="hidden sm:block w-10" />
        </div>

        {/* ==========================================
            SLIDE COUNTER
            Hidden visually for now but useful for
            screen readers / future design.
            ========================================== */}

        <span className="sr-only">
          Slide {slideNumber} of {totalSlides}
        </span>
      </div>
    </section>
  );
};

export default Hero;
