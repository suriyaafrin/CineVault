import { useState } from "react";
import { MdClose } from "react-icons/md";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useWatchStore } from ".";

function WatchCard({ item }) {
  const [hovered, setHovered] = useState(false);
  const removeItem = useWatchStore((s) => s.removeItem);

  return (
    <div
      className="relative flex-none w-56 group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-200 shadow-sm">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          draggable={false}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-70"}`}
        >
          <BsFillPlayCircleFill
            className="w-10 h-10 drop-shadow-lg text-white"
            size={40}
          />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeItem(item.id);
          }}
          className={`absolute top-2 right-2 bg-black/50 hover:bg-black/80 rounded-full p-1 transition-all duration-200 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          title="Remove"
        >
          <MdClose className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="mt-2 h-0.75 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-500 rounded-full"
          style={{ width: `${item.progress}%` }}
        />
      </div>

     
      <div className="mt-1.5">
        <span className="text-gray-900 text-xs font-semibold truncate block">
          {item.title}
        </span>
        <p className="text-gray-400 text-[11px] mt-0.5">
          {item.episodesLeft
            ? item.episodesLeft
            : `${item.timeLeft} · ${item.totalTime}`}
        </p>
      </div>
    </div>
  );
}
export default WatchCard;
