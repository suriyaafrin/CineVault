import { useState, useRef } from "react";
import { create } from "zustand";
import { FaChevronRight } from "react-icons/fa";
import WatchCard from "./watchCard";
import ContinueWatchingModal from "./ContinueWatchingModal";
import MovieDetailModal from "../newReleaseSec/movieDetailModal";
import { formatDuration } from "../../../utils/formateDuration";

export const useWatchStore = create((set) => ({
  items: [
    {
      id: 1,
      title: "The Batman",
      thumbnail:
        "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80",
      progress: 62,
      timeLeft: "1h 12m",
      totalTime: "2h 56m",
    },
    {
      id: 2,
      title: "Stranger Things S4",
      thumbnail:
        "https://images.unsplash.com/photo-1604975999044-188783d54fb3?w=400&q=80",
      progress: 33,
      episodesLeft: "3 Episodes left",
    },
    {
      id: 3,
      title: "The Last of Us",
      thumbnail:
        "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&q=80",
      progress: 75,
      episodesLeft: "2 Episodes left",
    },
    {
      id: 4,
      title: "Inception",
      thumbnail:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
      progress: 88,
      timeLeft: "19m",
      totalTime: "2h 28m",
    },
  ],
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  updateProgress: (id, progress) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, progress } : i)),
    })),
}));

export default function ContinueWatching() {
  const items = useWatchStore((s) => s.items);
  const scrollRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const activeItem = items.find((item) => item.id === activeId);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 240, behavior: "smooth" });
  };

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
            setShowModal(false); // close the grid popup, show the detail modal on top
          }}
        />
      )}

      {activeItem && (
        <MovieDetailModal
          movie={{ ...activeItem, posterUrl: activeItem.thumbnail }}
          onClose={() => setActiveId(null)}
          formatDuration={formatDuration}
        />
      )}
    </section>
  );
}
