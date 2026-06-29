import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaChevronRight, FaChevronLeft, FaTimes } from "react-icons/fa";
import TrendingMovieCard from "./trendingMovieCard";
import { useTrendingStore } from "./useTewndingStore";
import { formatDuration } from "../utils/formateDuration";
import MovieDetailModal from "../component/top-Banner/newReleaseSec/movieDetailModal";
import MovieCard from "../movie-Series-Section/movieMovieCard";



function TrendingSection() {
  const scrollRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);

  const activeCategory = useTrendingStore((state) => state.activeCategory);
  const setActiveCategory = useTrendingStore((state) => state.setActiveCategory);
  const allItems = useTrendingStore((state) => state.items);
  const isLoading = useTrendingStore((state) => state.isLoading);
  const error = useTrendingStore((state) => state.error);
  const fetchTrendingItems = useTrendingStore((state) => state.fetchTrendingItems);

  useEffect(() => {
    fetchTrendingItems();
  }, [fetchTrendingItems]);

 
  const items = useMemo(() => {
    if (activeCategory === "all") return allItems;
    return allItems.filter((item) => item.type === activeCategory);
  }, [allItems, activeCategory]);

  const categories = [
    { key: "all", label: "All" },
    { key: "movie", label: "Movies" },
    { key: "series", label: "Series" },
  ];


  const scrollByAmount = (direction) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "next" ? clientWidth * 0.85 : -clientWidth * 0.85,
      behavior: "smooth",
    });
  };

  const handleSelect = (item) => {
    setActiveItem(item);
  };

  const handleCategoryClick = (key) => {
    setActiveCategory(key);

    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-6xl mx-auto bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-[#C8102E] sm:text-xl">
            Trending This Week{" "}
            <span className="text-slate-400">(Movies &amp; Series)</span>
          </h2>
        </div>

        <div className="flex items-center gap-3">

          <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => handleCategoryClick(cat.key)}
                aria-pressed={activeCategory === cat.key}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  activeCategory === cat.key
                    ? "bg-[#C8102E] text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsViewAllOpen(true)}
            className="flex items-center gap-1 text-sm font-semibold text-[#C8102E] hover:underline"
          >
            View All
            <FaChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>


      <div className="group/row relative">
        <button
          type="button"
          onClick={() => scrollByAmount("prev")}
          aria-label="Scroll left"
          className="absolute -left-3 top-1/2 z-10 flex -translate-y-1/2 rounded-full bg-white p-2 shadow-md ring-1 ring-slate-200 transition-opacity hover:bg-slate-50 sm:hidden sm:group-hover/row:flex"
        >
          <FaChevronLeft className="h-3.5 w-3.5 text-slate-700" />
        </button>

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-3 sm:gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-none] [&::-webkit-scrollbar]:hidden"
        >
          {isLoading ? (
            
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-2/3 w-[31%] shrink-0 animate-pulse rounded-md bg-slate-200 sm:w-[23%] md:w-[18%] lg:w-[15%]"
              />
            ))
          ) : error ? (
            <p className="py-8 text-sm text-red-500">
              Couldn&apos;t load trending titles right now.
            </p>
          ) : items.length === 0 ? (
            <p className="py-8 text-sm text-slate-500">
              Nothing trending in this category right now.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="w-[31%] shrink-0 snap-start sm:w-[23%] md:w-[18%] lg:w-[15%]"
              >
                <TrendingMovieCard item={item} onSelect={handleSelect} />
              </div>
            ))
          )}
        </div>

        <button
          type="button"
          onClick={() => scrollByAmount("next")}
          aria-label="Scroll right"
          className="absolute -right-3 top-1/2 z-10 flex -translate-y-1/2 rounded-full bg-white p-2 shadow-md ring-1 ring-slate-200 transition-opacity hover:bg-slate-50 sm:hidden sm:group-hover/row:flex"
        >
          <FaChevronRight className="h-3.5 w-3.5 text-slate-700" />
        </button>
      </div>

      {isViewAllOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-8"
            onClick={(e) => e.target === e.currentTarget && setIsViewAllOpen(false)}
          >
            <div className="relative max-h-[85vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#C8102E] sm:text-xl">
                  Trending This Week{" "}
                  <span className="text-slate-400">(Movies &amp; Series)</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setIsViewAllOpen(false)}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                >
                  <FaTimes className="h-3.5 w-3.5" />
                </button>
              </div>

              {allItems.length === 0 ? (
                <p className="py-8 text-sm text-[#C8102E]">
                  Nothing trending right now.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                  {allItems.map((item) => (
                    <MovieCard
                      key={item.id}
                      movie={item}
                      onClick={() => setActiveItem(item)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}

      {activeItem && (
        <MovieDetailModal
          movie={activeItem}
          type={activeItem.type}
          formatDuration={formatDuration}
          onClose={() => setActiveItem(null)}
        />
      )}
    </section>
  );
}

export default TrendingSection;