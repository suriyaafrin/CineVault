import { useEffect, useMemo, useState } from "react";
import { MdClose, MdPlayArrow, MdAdd, MdLocalFireDepartment } from "react-icons/md";
import { useTop10Store } from "./useTop10Store";
import MovieDetailModal from "../newReleaseSec/movieDetailModal";
import { formatDuration } from "../../../utils/formateDuration";

const TABS = ["Movies", "TV Shows", "All"];

const Top10Modal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Movies");
  const [activeId, setActiveId] = useState(null);
  const { movieItems, tvItems, fetchTop10, fetchTop10TV } = useTop10Store();

  useEffect(() => {
    if (movieItems.length === 0) fetchTop10();
    if (tvItems.length === 0) fetchTop10TV();
  }, [fetchTop10, fetchTop10TV, movieItems.length, tvItems.length]);

  const items = useMemo(() => {
    if (activeTab === "Movies") return movieItems;
    if (activeTab === "TV Shows") return tvItems;
    return [...movieItems, ...tvItems].sort((a, b) => b.rating - a.rating);
  }, [activeTab, movieItems, tvItems]);

  const featured = items[0];
  const rest = items.slice(1, 10);
  const activeMovie = items.find((m) => m.id === activeId);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white  rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 bg-[#C8102E] shrink-0">
          <div className="flex items-center gap-2.5">
            <MdLocalFireDepartment size={20} className="text-white" />
            <span className="text-white text-[17px] font-semibold">Top 10 this month</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <MdClose size={16} />
          </button>
        </div>


        <div className="flex border-b border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 shrink-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-[13px] font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? "text-[#C8102E] border-[#C8102E]"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto flex-1 p-5">

          {!featured ? (
            <p className="text-center text-gray-400 text-sm py-8">Loading...</p>
          ) : (
            <>
              <div className="flex gap-0 rounded-xl overflow-hidden border border-gray-100  bg-gray-50  mb-4">
                <div className="relative w-28 min-w-28 shrink-0">
                  <img src={featured.posterUrl} alt={featured.title} className="w-full h-full object-cover" />
                  <div className="absolute top-0 left-0 bg-[#C8102E] px-2 py-1 rounded-br-lg">
                    <span className="text-white text-[11px] font-medium">#1</span>
                  </div>
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <div className="w-10 h-10 rounded-full bg-[#C8102E] flex items-center justify-center">
                      <MdPlayArrow size={22} className="text-white ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-3.5 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="text-[34px] font-black leading-none shrink-0" style={{ color: "transparent", WebkitTextStroke: "1.5px #C8102E" }}>
                        01
                      </span>
                      <div className="min-w-0">
                        <p className="text-gray-900 dark:text-white text-[15px] font-semibold leading-snug">{featured.title}</p>
                        <div className="flex items-center gap-1 flex-wrap mt-0.5">
                          <span className="text-[11px] text-gray-500">
                            {featured.releaseDate ? featured.releaseDate.slice(0, 4) : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="text-[12px] font-semibold text-gray-900 dark:text-white">{featured.rating}</span>
                      <span className="text-[12px] text-gray-400">/10</span>
                    </div>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{featured.overview}</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => setActiveId(featured.id)}
                      className="flex items-center gap-1.5 bg-[#C8102E] text-white text-[12px] font-medium px-3.5 py-1.5 rounded-full hover:opacity-90 transition-opacity"
                    >
                      <MdPlayArrow size={15} /> Watch now
                    </button>
                    <button className="flex items-center gap-1.5 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 text-[12px] font-medium px-3.5 py-1.5 rounded-full hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                      <MdAdd size={15} /> My list
                    </button>
                  </div>
                </div>
              </div>


              <div className="grid grid-cols-2 gap-2.5">
                {rest.map((movie, index) => {
                  const rank = String(index + 2).padStart(2, "0");
                  return (
                    <div
                      key={movie.id}
                      className="flex flex-col rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/40 cursor-pointer group"
                    >

                      <div className="flex items-stretch">
                        <div className="relative w-13 min-w-13 shrink-0">
                          <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <MdPlayArrow size={20} className="text-white ml-0.5" />
                          </div>
                        </div>

                        <div className="px-2.5 py-2 flex flex-col justify-center min-w-0">
                          <div className="flex items-baseline gap-1.5 mb-0.5">
                            <span className="text-[18px] font-black leading-none shrink-0" style={{ color: "transparent", WebkitTextStroke: "1.5px #C8102E" }}>
                              {rank}
                            </span>
                            <p className="text-gray-900 dark:text-white text-[12px] font-medium leading-snug truncate">{movie.title}</p>
                          </div>
                          <p className="text-[11px] text-gray-400 truncate">
                            {movie.releaseDate ? movie.releaseDate.slice(0, 4) : ""}
                          </p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-yellow-400 text-[11px]">★</span>
                            <span className="text-[11px] font-semibold text-gray-900 dark:text-white">{movie.rating}</span>
                          </div>
                        </div>
                      </div>


                      <div className="flex gap-1.5 px-2.5 pb-2.5 pt-1.5 border-t border-gray-100 dark:border-zinc-700">
                        <button
                          onClick={() => setActiveId(movie.id)}
                          className="flex-1 flex items-center justify-center gap-1 bg-[#C8102E] text-white text-[11px] font-medium py-1.5 rounded-full hover:opacity-90 transition-opacity"
                        >
                          <MdPlayArrow size={13} /> Watch now
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1 border border-gray-200 dark:border-zinc-600 text-gray-700 dark:text-gray-300 text-[11px] font-medium py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors">
                          <MdAdd size={13} /> My list
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {activeMovie && (
        <MovieDetailModal
          movie={activeMovie}
          onClose={() => setActiveId(null)}
          formatDuration={formatDuration}
        />
      )}
    </div>
  );
};

export default Top10Modal;