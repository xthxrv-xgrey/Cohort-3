import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";

const carouselVariants = cva(
  "relative overflow-hidden rounded-xl border transition-all duration-300 select-none",
  {
    variants: {
      variant: {
        light: "bg-white text-gray-800 border-gray-200 shadow-md",
        dark: "bg-slate-950 text-white border-slate-800 shadow-md",
        glass: "backdrop-blur-md bg-white/10 text-white border-white/20 shadow-lg",
      },
      size: {
        sm: "w-full max-w-md h-64",
        md: "w-full max-w-3xl h-96",
        lg: "w-full max-w-5xl h-[500px]",
        full: "w-full h-full min-h-[400px]",
      },
    },
    defaultVariants: {
      variant: "light",
      size: "md",
    },
  }
);

export interface CarouselItem {
  image: string;
  title?: string;
  description?: string;
  link?: string;
}

export interface CarouselProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof carouselVariants> {
  items?: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  transitionEffect?: "slide" | "fade";
  children?: React.ReactNode;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      className,
      variant,
      size,
      items = [],
      autoPlay = false,
      interval = 3000,
      showArrows = true,
      showDots = true,
      transitionEffect = "slide",
      children,
      ...props
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const slidesContainerRef = useRef<HTMLDivElement | null>(null);
    const autoplayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Resolve slides: either children or items list
    const slides = children ? React.Children.toArray(children) : items;
    const slidesCount = slides.length;

    // Transition animations
    useEffect(() => {
      if (slidesCount <= 0 || !slidesContainerRef.current) return;

      const container = slidesContainerRef.current;
      const childrenElements = container.children;

      if (transitionEffect === "slide") {
        // Slide transition: shift container xPercent
        gsap.to(container, {
          xPercent: -activeIndex * 100,
          duration: 0.6,
          ease: "power2.out",
        });
      } else {
        // Fade transition: fade-out current, fade-in active
        Array.from(childrenElements).forEach((el, idx) => {
          gsap.to(el, {
            opacity: idx === activeIndex ? 1 : 0,
            zIndex: idx === activeIndex ? 10 : 0,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      }
    }, [activeIndex, transitionEffect, slidesCount]);

    // Autoplay logic
    useEffect(() => {
      if (!autoPlay || slidesCount <= 1) return;

      const startAutoplay = () => {
        autoplayTimer.current = setInterval(() => {
          setActiveIndex((prev) => (prev + 1) % slidesCount);
        }, interval);
      };

      startAutoplay();

      return () => {
        if (autoplayTimer.current) clearInterval(autoplayTimer.current);
      };
    }, [autoPlay, interval, slidesCount]);

    const handlePrev = () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
      }
      setActiveIndex((prev) => (prev - 1 + slidesCount) % slidesCount);
    };

    const handleNext = () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
      }
      setActiveIndex((prev) => (prev + 1) % slidesCount);
    };

    const handleDotClick = (idx: number) => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
      }
      setActiveIndex(idx);
    };

    if (slidesCount === 0) {
      return (
        <div className="flex items-center justify-center p-8 bg-gray-100 rounded-lg text-gray-500">
          No slides to display.
        </div>
      );
    }

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(carouselVariants({ variant, size }), className)}
        {...props}
      >
        {/* Slides viewport */}
        <div className="relative w-full h-full overflow-hidden">
          <div
            ref={slidesContainerRef}
            className={cn(
              "w-full h-full",
              transitionEffect === "slide" ? "flex" : "relative"
            )}
          >
            {slides.map((slide, index) => {
              const isReactChild = React.isValidElement(slide);

              if (isReactChild) {
                return (
                  <div
                    key={index}
                    className={cn(
                      "w-full h-full shrink-0",
                      transitionEffect === "fade" &&
                        "absolute inset-0 opacity-0"
                    )}
                    style={{
                      opacity: transitionEffect === "fade" && index === 0 ? 1 : undefined,
                    }}
                  >
                    {slide}
                  </div>
                );
              }

              // Otherwise it's CarouselItem type
              const item = slide as CarouselItem;
              return (
                <div
                  key={index}
                  className={cn(
                    "relative w-full h-full shrink-0 overflow-hidden",
                    transitionEffect === "fade" && "absolute inset-0 opacity-0"
                  )}
                  style={{
                    opacity: transitionEffect === "fade" && index === 0 ? 1 : undefined,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title || `Slide ${index + 1}`}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                  {(item.title || item.description) && (
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                      {item.title && (
                        <h4 className="text-2xl font-bold mb-2 animate-slideUp">
                          {item.title}
                        </h4>
                      )}
                      {item.description && (
                        <p className="text-gray-200 text-sm max-w-md">
                          {item.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Arrow Navigation */}
        {showArrows && slidesCount > 1 && (
          <>
            <button
              onClick={handlePrev}
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-200 z-20 cursor-pointer shadow-sm hover:scale-105 active:scale-95",
                variant === "dark"
                  ? "bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700"
                  : "bg-white/80 hover:bg-white text-gray-800 border border-gray-200"
              )}
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-200 z-20 cursor-pointer shadow-sm hover:scale-105 active:scale-95",
                variant === "dark"
                  ? "bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700"
                  : "bg-white/80 hover:bg-white text-gray-800 border border-gray-200"
              )}
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Dot Pagination Indicator */}
        {showDots && slidesCount > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {Array.from({ length: slidesCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                  idx === activeIndex
                    ? variant === "dark"
                      ? "bg-indigo-500 w-6"
                      : "bg-indigo-600 w-6"
                    : "bg-gray-400/60 hover:bg-gray-400"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

Carousel.displayName = "Carousel";

export { Carousel };
