import { useEffect, useRef, useState } from "react";
import { create } from "zustand";
import { FaChevronRight } from "react-icons/fa";
import WatchCard from "./watchCard";
import ContinueWatchingModal from "./ContinueWatchingModal";
import MovieDetailModal from "../newReleaseSec/movieDetailModal";
import { formatDuration } from "../../../utils/formateDuration";
import { getPopularMovies, getImageUrl } from "../../../services/tmdb";


const FAKE_PROGRESS = [
  { progress: 62, timeLeft: "1h 12m", totalTime: "2h 56m" },
  { progress: 33, episodesLeft: "3 Episodes left" },
  { progress: 75, episodesLeft: "2 Episodes left" },
  { progress: 88, timeLeft: "19m", totalTime: "2h 28m" },
  { progress: 45, timeLeft: "55m", totalTime: "1h 40m" },
  { progress: 20, episodesLeft: "5 Episodes left" },
];

export const useWatchStore = create((set) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchContinueWatching: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getPopularMovies();
      const items = data.results.slice(0, 6).map((movie, index) => ({
        id: movie.id,
        title: movie.title,
        thumbnail: getImageUrl(movie.backdrop_path, "w500") || getImageUrl(movie.poster_path),
        posterUrl: getImageUrl(movie.poster_path),
        overview: movie.overview,
        rating: movie.vote_average,
        releaseDate: movie.release_date,
        ...FAKE_PROGRESS[index % FAKE_PROGRESS.length],
      }));
      set({ items, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  updateProgress: (id, progress) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, progress } : i)),
    })),
}));

export default function ContinueWatching() {
  const { items, isLoading, error, fetchContinueWatching } = useWatchStore();
  const scrollRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    fetchContinueWatching();
  }, [fetchContinueWatching]);

  const activeItem = items.find((item) => item.id === activeId);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 240, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <section className="py-6 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-6 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <p className="text-[#C8102E] text-sm">Failed to load: {error}</p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="py-6 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <p className="text-gray-400 text-sm">Nothing left to watch.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[21px] font-bold text-[#C8102E]">
            Continue Watching
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 text-[13px] text-[#C8102E] hover:opacity-80 transition-opacity"
          >
            View All <FaChevronRight size={11} />
          </button>
        </div>

        <div className="relative group/row">
          <button
            onClick={() => scroll(-1)}
            className="absolute -left-4 top-1/3 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity shadow-md"
          >
            ‹
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
            style={{ scrollbarWidth: "none" }}
          >
            {items.map((item) => (
              <WatchCard
                key={item.id}
                item={item}
                onClick={() => setActiveId(item.id)}
              />
            ))}
          </div>

          <button
            onClick={() => scroll(1)}
            className="absolute -right-4 top-1/3 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity shadow-md"
          >
            ›
          </button>
        </div>
      </div>

      {showModal && (
        <ContinueWatchingModal
          onClose={() => setShowModal(false)}
          onSelectMovie={(id) => {
            setActiveId(id);
            setShowModal(false);
          }}
        />
      )}

      {activeItem && (
        <MovieDetailModal
          movie={activeItem}
          onClose={() => setActiveId(null)}
          formatDuration={formatDuration}
        />
      )}
    </section>
  );
}