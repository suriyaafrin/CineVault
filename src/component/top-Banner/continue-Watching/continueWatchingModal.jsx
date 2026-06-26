import { createPortal } from "react-dom";
import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useWatchStore } from "../continue-Watching/index";

function ProgressBar({ progress }) {
  return (
    <div className="mt-1.5 h-0.75 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-red-500 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function FeaturedRow({ item, onPlay }) {
  return (
    <div className="px-6 pt-2 pb-5">
      <div
        className="relative rounded-xl overflow-hidden aspect-video bg-gray-200 cursor-pointer group"
        onClick={(e) => {
          e.stopPropagation();
          onPlay();
        }}
      >
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-200" />
        <div className="absolute inset-0 flex items-center justify-center">
          <BsFillPlayCircleFill className="w-14 h-14 text-white drop-shadow-lg" />
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-gray-900 text-base font-semibold">{item.title}</h3>
        <p className="text-gray-400 text-xs mt-0.5">
          Continue to watch (from the hero banner)
        </p>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
          <span>
            {item.episodesLeft
              ? item.episodesLeft
              : `${item.timeLeft} / ${item.totalTime} left`}
          </span>
        </div>
        <ProgressBar progress={item.progress} />
      </div>
    </div>
  );
}

function GridCard({ item, onPlay }) {
  return (
    <div
      className="cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        onPlay();
      }}
    >
      <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-200 group">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-200" />
        <div className="absolute inset-0 flex items-center justify-center">
          <BsFillPlayCircleFill className="w-9 h-9 text-white drop-shadow-lg" />
        </div>
      </div>
      <div className="mt-1.5">
        <span className="text-gray-900 text-xs font-semibold truncate block">
          {item.title}
        </span>
        <p className="text-gray-400 text-[11px] mt-0.5">
          {item.episodesLeft
            ? item.episodesLeft
            : `${item.timeLeft} left`}
        </p>
        <ProgressBar progress={item.progress} />
      </div>
    </div>
  );
}

// NOTE: This component no longer owns its own "which movie is open" state.
// Previously it had its own activeId + rendered its own MovieDetailModal,
// completely disconnected from ContinueWatching's activeId. That meant
// clicking a card inside this grid never told the parent anything, so the
// parent's MovieDetailModal never opened. Now this component just reports
// the click upward via onSelectMovie, and the parent (ContinueWatching) is
// the single source of truth for which MovieDetailModal is shown.
export default function ContinueWatchingModal({ onClose, onSelectMovie }) {
  const items = useWatchStore((s) => s.items);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (items.length === 0) return null;

  const [featured, ...rest] = items;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5">
          <h2 className="text-lg font-bold text-gray-900">Continue Watching</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors"
            title="Close"
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        <FeaturedRow item={featured} onPlay={() => onSelectMovie(featured.id)} />

        {rest.length > 0 && (
          <div className="px-6 pb-6 grid grid-cols-2 gap-4">
            {rest.map((item) => (
              <GridCard
                key={item.id}
                item={item}
                onPlay={() => onSelectMovie(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}