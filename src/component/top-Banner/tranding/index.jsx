import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

import MovieCard from "../MovieCard";
import MovieDetailModal from "../newReleaseSec/movieDetailModal";
import { formatDuration } from "../../../utils/formateDuration";
import { fetchTrending, getImageUrl } from "../../../services/tmdb";

export default function TrendingSection() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function loadTrending() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchTrending("movie", "week");
        if (cancelled) return;
        const mapped = data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          posterUrl: getImageUrl(movie.poster_path),
          backdropUrl: getImageUrl(movie.backdrop_path, "original"),
          overview: movie.overview,
          rating: movie.vote_average ? movie.vote_average.toFixed(1) : null,
          releaseDate: movie.release_date,
          year: movie.release_date ? movie.release_date.slice(0, 4) : "",
        }));
        setMovies(mapped);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadTrending();
    return () => {
      cancelled = true;
    };
  }, []);

  const activeMovie = movies.find((movie) => movie.id === activeId);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 240, behavior: "smooth" });
  };

  return (
    <section className="py-6 w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[21px] font-bold text-[#C8102E]">Trending this week</h2>
          <Link
            to="/trending"
            className="flex items-center gap-1 text-[13px] text-[#C8102E] hover:opacity-80 transition-opacity"
          >
            View All <FaChevronRight size={11} />
          </Link>
        </div>

        {isLoading && (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="shrink-0 w-27 animate-pulse">
                <div className="w-27 h-38 rounded-xl bg-gray-200" />
                <div className="mt-1.5 h-2.5 w-20 rounded bg-gray-200" />
                <div className="mt-1 h-2 w-14 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-[#C8102E] text-sm">Failed to load: {error}</p>}

        {!isLoading && !error && (
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
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isActive={activeId === movie.id}
                  onClick={() => setActiveId(movie.id)}
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
        )}
      </div>

      {activeMovie && (
        <MovieDetailModal
          movie={activeMovie}
          onClose={() => setActiveId(null)}
          formatDuration={formatDuration}
        />
      )}
    </section>
  );
}