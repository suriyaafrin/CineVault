import { useState, useEffect } from "react";
import {
  FaTimes,
  FaPlay,
  FaBookmark,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import MovieCard from "../MovieCard";
import MovieDetailModal from "./movieDetailModal";

const PER_PAGE = 18;

const AllNewReleasesModal = ({ isOpen, onClose, movies = [] }) => {
  const [sort, setSort] = useState("newest");
  const [genre, setGenre] = useState("all");
  const [year, setYear] = useState("all");
  const [filtered, setFiltered] = useState(movies);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const genres = [
    "all",
    ...new Set(movies.map((m) => m.genre).filter(Boolean)),
  ];
  const years = [
    "all",
    ...new Set(movies.map((m) => String(m.year)).filter(Boolean)).values(),
  ].sort((a, b) => b - a);

  useEffect(() => {
    let result = [...movies];
    if (genre !== "all") result = result.filter((m) => m.genre === genre);
    if (year !== "all") result = result.filter((m) => String(m.year) === year);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    else if (sort === "title")
      result.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "duration")
      result.sort((a, b) => a.duration - b.duration);
    else result.sort((a, b) => b.year - a.year);
    setFiltered(result);
    setCurrentPage(1);
  }, [sort, genre, year, movies]);

  if (!isOpen) return null;

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const formatDuration = (mins) => {
    if (!mins) return "";
    return `${Math.floor(mins / 60)}h ${mins % 60}m`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-10 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-5xl bg-white rounded-2xl border border-black/10 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
          <h2 className="text-[#C8102E] text-lg font-bold">All New Releases</h2>
          <div className="flex items-center gap-3">
            <span className="text-black/40 text-sm">
              {filtered.length} titles
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/70 transition-colors"
            >
              <FaTimes size={15} />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-2 px-6 py-3 border-b border-black/[0.07]">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-black/4 border border-black/15 text-black/80 text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-[#C8102E]/50 cursor-pointer"
          >
            <option value="newest">Sort: Newest releases</option>
            <option value="rating">Sort: Highest rated</option>
            <option value="title">Sort: A–Z</option>
            <option value="duration">Sort: Shortest first</option>
          </select>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="bg-black/4 border border-black/15 text-black/80 text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-[#C8102E]/50 cursor-pointer"
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g === "all" ? "Filter: All genres" : g}
              </option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="bg-black/4 border border-black/15 text-black/80 text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-[#C8102E]/50 cursor-pointer"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y === "all" ? "Filter: All years" : y}
              </option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div className="p-6">
          {paginated.length === 0 ? (
            <div className="text-center py-16 text-black/30 text-sm">
              No titles match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {paginated.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => setSelectedMovie(movie)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 px-6 py-4 border-t border-black/[0.07]">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-lg bg-black/4 border border-black/10 text-black/60 flex items-center justify-center disabled:opacity-30 hover:bg-black/10 transition-colors"
            >
              <FaChevronLeft size={12} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                  p === currentPage
                    ? "bg-[#C8102E] text-white border border-[#C8102E]"
                    : "bg-black/4 border border-black/10 text-black/60 hover:bg-black/10"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-lg bg-black/4  border border-black/10 text-black/60 flex items-center justify-center disabled:opacity-30 hover:bg-black/10 transition-colors"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        )}

        {/* Detail Modal */}
        {selectedMovie && (
          <MovieDetailModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            formatDuration={formatDuration}
          />
        )}
      </div>
    </div>
  );
};

export default AllNewReleasesModal;
