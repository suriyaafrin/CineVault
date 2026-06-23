import { useMemo, useRef } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import TrendingMovieCard from "./trendingMovieCard";
import { useTrendingStore } from "./useTewndingStore";



function TrendingSection() {
  const scrollRef = useRef(null);

  
  const activeCategory = useTrendingStore((state) => state.activeCategory);
  const setActiveCategory = useTrendingStore((state) => state.setActiveCategory);
  const allItems = useTrendingStore((state) => state.items);

  // Derived/filtered list is computed here (not in the store) and memoized,
  // so we only get a new array when items or activeCategory actually change —
  // this is what prevents the "Maximum update depth exceeded" loop.
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
    
    console.log("Selected:", item.title);
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
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
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
          className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-md ring-1 ring-slate-200 transition-opacity hover:bg-slate-50 sm:group-hover/row:flex"
        >
          <FaChevronLeft className="h-3.5 w-3.5 text-slate-700" />
        </button>

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-none] [&::-webkit-scrollbar]:hidden"
        >
          {items.length === 0 ? (
            <p className="py-8 text-sm text-slate-500">
              Nothing trending in this category right now.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="w-[46%] shrink-0 sm:w-[30%] md:w-[22%] lg:w-[16%]"
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
          className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-md ring-1 ring-slate-200 transition-opacity hover:bg-slate-50 sm:group-hover/row:flex"
        >
          <FaChevronRight className="h-3.5 w-3.5 text-slate-700" />
        </button>
      </div>
    </section>
  );
}

export default TrendingSection;