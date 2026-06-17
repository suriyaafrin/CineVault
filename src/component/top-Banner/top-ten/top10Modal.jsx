import { useState } from "react";
import { MdClose, MdPlayArrow, MdAdd } from "react-icons/md";
import { top10Movies } from "../../../../data/top10Data/top10Data";

const TABS = ["Movies", "TV Shows", "All"];

const Top10Modal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Movies");

  const featured = top10Movies[0];
  const rest = top10Movies.slice(1);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      {/* Modal box */}
      <div
        className="relative bg-white rounded-xl w-[95vw] max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-gray-500 hover:text-black transition-colors"
        >
          <MdClose size={22} />
        </button>

        <div className="p-5">
          {/* Title */}
          <h2 className="text-black text-xl font-bold mb-4">Top 10 This Month</h2>

          {/* Tabs */}
          <div className="flex rounded-lg overflow-hidden border border-gray-200 mb-5">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? "bg-[#C8102E] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Featured #1 card */}
          <div className="flex gap-3 mb-5">
            <img
              src={featured.poster}
              alt={featured.title}
              className="w-28 h-40 object-cover rounded-lg shrink-0"
            />
            <div className="flex flex-col justify-between py-1">
              <div>
                <span
                  className="text-5xl font-black leading-none"
                  style={{ color: "transparent", WebkitTextStroke: "2px #C8102E" }}
                >
                  01
                </span>
                <h3 className="text-black text-base font-bold mt-1">{featured.title}</h3>
                <p className="text-gray-500 text-xs mt-0.5">
                  {featured.year} · {featured.duration} · {featured.genre} · ⭐ {featured.rating}
                </p>
                <p className="text-gray-600 text-xs mt-2 line-clamp-3">
                  {featured.description}
                </p>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex items-center gap-1 bg-[#C8102E] text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity">
                  <MdPlayArrow size={15} /> Watch Now
                </button>
                <button className="flex items-center gap-1 border border-gray-300 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors">
                  <MdAdd size={15} /> My List
                </button>
              </div>
            </div>
          </div>

          {/* #2–#10 grid */}
          <div className="grid grid-cols-2 gap-3">
            {rest.map((movie) => {
              const rank = String(movie.id).padStart(2, "0");
              return (
                <div key={movie.id} className="flex items-end gap-1">
                  {/* Rank */}
                  <span
                    className="text-4xl font-black leading-none shrink-0 -mr-2 z-10"
                    style={{ color: "transparent", WebkitTextStroke: "2px #C8102E" }}
                  >
                    {rank}
                  </span>
                  {/* Poster */}
                  <div className="relative w-16 h-24 rounded overflow-hidden shrink-0 z-20">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Info */}
                  <div className="pl-1 flex flex-col justify-end pb-0.5 min-w-0">
                    <p className="text-black text-[11px] font-semibold leading-tight line-clamp-2">
                      {movie.title}
                    </p>
                    <p className="text-gray-500 text-[10px] mt-0.5">{movie.genre}</p>
                    <p className="text-gray-400 text-[10px]">
                      {movie.year} · {movie.duration}
                    </p>
                    <p className="text-yellow-500 text-[10px] font-bold">⭐ {movie.rating}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All button */}
          <button className="w-full mt-5 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Top10Modal;