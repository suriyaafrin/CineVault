import { useMemo, useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useWatchlistStore } from "./useWatchlistStore";
import WatchlistCard from "./watchListCard";
import MovieDetailModal from "../../component/top-Banner/newReleaseSec/movieDetailModal";
import { formatDuration } from "../../utils/formateDuration";

const TABS = [
  { key: "all", label: "All Content" },
  { key: "movie", label: "Movies" },
  { key: "series", label: "Series" },
];

const SORT_OPTIONS = [
  { key: "recent", label: "Recently Added" },
  { key: "rating", label: "Highest Rated" },
  { key: "az", label: "Title (A-Z)" },
];

export default function WatchlistPage() {
  const items = useWatchlistStore((state) => state.items);
  const activeTab = useWatchlistStore((state) => state.activeTab);
  const setActiveTab = useWatchlistStore((state) => state.setActiveTab);
  const sortBy = useWatchlistStore((state) => state.sortBy);
  const setSortBy = useWatchlistStore((state) => state.setSortBy);
  const searchQuery = useWatchlistStore((state) => state.searchQuery);
  const setSearchQuery = useWatchlistStore((state) => state.setSearchQuery);

  const [activeItem, setActiveItem] = useState(null);

  const visibleItems = useMemo(() => {
    let result = items;

    if (activeTab !== "all") {
      result = result.filter((item) => item.type === activeTab);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((item) => item.title.toLowerCase().includes(q));
    }

    result = [...result];
    if (sortBy === "recent") {
      result.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [items, activeTab, searchQuery, sortBy]);

  const handleOpen = (item) => {
    setActiveItem({
      ...item,
      posterUrl: item.poster,
      releaseDate: item.year ? String(item.year) : null,
    });
  };

  return (
    <section className="relative bg-white">

      <div className="absolute inset-0 h-48 sm:h-56 lg:h-64 bg-linear-to-b" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 pt-8 sm:pt-10 pb-12 sm:pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#C8102E]">
            My Watchlist
          </h1>      
        </div>


        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mb-1 sm:pb-0 sm:mb-0 scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === tab.key
                    ? "bg-[#C8102E] text-white"
                    : "bg-gray-100 text-[#C8102E] hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm shrink-0">
            <span className="text-[#C8102E] hidden sm:inline">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-md px-3 py-1.5 text-[#111] bg-white focus:outline-none focus:ring-1 focus:ring-[#C8102E] w-full sm:w-auto"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative mb-8 w-full sm:max-w-2xl">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8102E] w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search My Watchlist"
            className="w-full pl-11 pr-4 py-3 rounded-md border border-gray-200 text-sm text-[#111] focus:outline-none focus:ring-1 focus:ring-[#C8102E]"
          />
        </div>

        {visibleItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4">
            {visibleItems.map((item) => (
              <WatchlistCard key={item.id} item={item} onOpen={handleOpen} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-20 text-gray-500 text-sm sm:text-base">
            No titles match your search.
          </div>
        )}
      </div>

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