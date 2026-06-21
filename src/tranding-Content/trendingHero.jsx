import { useState, useEffect, useRef, useCallback } from "react";
import { FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { trendingHeroItems } from "../../data/trendingData/trendingData";


const AUTO_ADVANCE_MS = 5000;

const TrendingHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const total = trendingHeroItems.length;

  const goTo = useCallback(
    (index) => {
      setActiveIndex(((index % total) + total) % total);
    },
    [total]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goNext();
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(timer);
  }, [isPaused, goNext]);

  return (
    <section
      className="relative w-full overflow-hidden rounded-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {trendingHeroItems.map((item) => (
          <div
            key={item.id}
            className="relative w-full shrink-0 aspect-video sm:aspect-16/7 lg:aspect-16/5"
          >
            {/* Backdrop image */}
            <img
              src={item.backdrop}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />

            {/* Gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/10" />

            {/* Category badge */}
            <span className="absolute left-4 top-4 rounded bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              {item.type}
            </span>

            {/* Center play button */}
            <button
              type="button"
              aria-label={`Play ${item.title}`}
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:scale-105 hover:bg-white/30"
            >
              <FaPlay className="ml-0.5 h-5 w-5" />
            </button>

            {/* Bottom text content */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#C8102E]">
                Trending Now
              </p>
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                {item.title}
              </h2>
              <p className="mt-1 text-xs text-white/70 sm:text-sm">
                {item.year} &middot; {item.runtime} &middot; {item.genres.join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={goPrev}
        className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60 sm:flex"
      >
        <FaChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={goNext}
        className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60 sm:flex"
      >
        <FaChevronRight className="h-4 w-4" />
      </button>

      {/* Dot pagination */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
        {trendingHeroItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goTo(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === activeIndex
                ? "w-5 bg-[#C8102E]"
                : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingHero;