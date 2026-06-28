import { FaStar, FaTrash } from "react-icons/fa";
import { useWatchlistStore } from "./useWatchlistStore";

export default function WatchlistCard({ item, onOpen }) {
  const removeItem = useWatchlistStore((state) => state.removeItem);

  // Guard: if item is missing, log it and render nothing instead of crashing.
  if (!item) {
    console.warn("WatchlistCard received no `item` prop — check the parent's .map()");
    return null;
  }

  const metaLine =
    item.type === "movie"
      ? `${item.year} • ${item.runtime}`
      : `${item.year} • ${item.seasons} Season${item.seasons > 1 ? "s" : ""}`;

  return (
    <div className="flex flex-col cursor-pointer" onClick={() => onOpen?.(item)}>
      <div className="relative aspect-2/3 rounded-lg overflow-hidden bg-[#1a1a1a] hover:border-2 hover:border-[#C8102E]">
        <span className="absolute top-2 left-2 z-10 bg-[#C8102E] text-white text-[10px] font-bold tracking-wide px-2 py-1 rounded">
          {item.type === "movie" ? "MOVIE" : "SERIES"}
        </span>

        <img
          src={item.poster}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="mt-3">
        <h3 className="text-[#111] font-semibold text-base leading-tight truncate">
          {item.title}
        </h3>

        <div className="flex items-center justify-between mt-1">
          <span className="text-sm text-gray-500">{metaLine}</span>
          <span className="flex items-center gap-1 text-sm font-medium text-[#111]">
            <FaStar className="text-[#C8102E] w-3.5 h-3.5" />
            {item.rating}
          </span>
        </div>

        <button
          onClick={(e) => {
            // Stop the click from also bubbling up to the card's onClick,
            // which would open the detail modal right as the item is removed.
            e.stopPropagation();
            removeItem(item.id);
          }}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-[#FCE9EB] hover:bg-[#f7d4d8] text-[#C8102E] font-medium text-sm py-2.5 rounded-md transition-colors"
        >
          <FaTrash className="w-3.5 h-3.5" />
          Remove from List
        </button>
      </div>
    </div>
  );
}