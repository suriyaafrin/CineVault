import { useState, useEffect, useRef, useCallback } from "react";
import { FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { fetchTrending, getImageUrl } from "../services/tmdb";
import MovieDetailModal from "../component/top-Banner/newReleaseSec/movieDetailModal";
import { formatDuration } from "../utils/formateDuration";
import { fetchTrending, getImageUrl } from "../services/tmdb"

const AUTO_ADVANCE_MS = 5000;

const TrendingHero = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeItemId, setActiveItemId] = useState(null);
  const trackRef = useRef(null);
  const total = items.length;

  const activeItem = items.find((item) => item.id === activeItemId);

  useEffect(() => {
    let isMounted = true;

    async function loadTrending() {
      try {
        const data = await fetchTrending("all", "week");
        if (!isMounted) return;

        const mapped = (data.results || [])
          .filter((item) => item.media_type === "movie" || item.media_type === "tv")
          .map((item) => ({
            id: item.id,
            mediaType: item.media_type,
            title: item.title || item.name,
            backdrop: getImageUrl(item.backdrop_path, "w1280"),
            posterUrl: getImageUrl(item.poster_path),
            overview: item.overview,
            releaseDate: item.release_date || item.first_air_date,
            rating: item.vote_average,
            type: item.media_type === "tv" ? "Series" : "Movie",
          }));

        setItems(mapped);
      } catch (err) {
        console.error("Failed to fetch trending hero items:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadTrending();
    return () => {
      isMounted = false;
    };
  }, []);

  const goTo = useCallback(
    (index) => {
      if (total === 0) return;
      setActiveIndex(((index % total) + total) % total);
    },
    [total],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused || total === 0) return;

    const timer = setInterval(() => {
      goNext();
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(timer);
  }, [isPaused, goNext, total]);

  if (loading) {
    return (
      <section className="relative max-w-6xl mx-auto overflow-hidden rounded-xl aspect-video sm:aspect-16/7 lg:aspect-16/5 bg-gray-200 animate-pulse" />
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="relative max-w-6xl mx-auto overflow-hidden rounded-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="relative w-full shrink-0 aspect-video sm:aspect-16/7 lg:aspect-16/5 cursor-pointer"
            onClick={() => setActiveItemId(item.id)}
          >
            <img
              src={item.backdrop}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/10" />
            <span className="absolute left-4 top-4 rounded bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white sm:left-6 lg:left-8">
              {item.type}
            </span>

            <button
              type="button"
              aria-label={`Play ${item.title}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveItemId(item.id);
              }}
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:scale-105 hover:bg-white/30"
            >
              <FaPlay className="ml-0.5 h-5 w-5" />
            </button>

            <div className="absolute inset-x-0 bottom-0 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#C8102E]">
                Trending Now
              </p>
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                {item.title}
              </h2>
              <p className="mt-1 text-xs text-white/70 sm:text-sm">
                {item.releaseDate ? item.releaseDate.slice(0, 4) : ""}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={goPrev}
        className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60 sm:flex sm:left-4 lg:left-6"
      >
        <FaChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={goNext}
        className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60 sm:flex sm:right-4 lg:right-6"
      >
        <FaChevronRight className="h-4 w-4" />
      </button>

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
        {items.map((item, index) => (
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

      {activeItem && (
        <MovieDetailModal
          movie={activeItem}
          onClose={() => setActiveItemId(null)}
          formatDuration={formatDuration}
          type={activeItem.mediaType === "tv" ? "series" : "movie"}
        />
      )}
    </section>
  );
};

export default TrendingHero;