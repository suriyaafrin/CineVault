import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { searchMulti, getImageUrl } from "../../services/tmdb";
import { slugify } from "../../utils/slugify";
import { formatDuration } from "../../utils/formateDuration";
import MovieDetailModal from "./newReleaseSec/movieDetailModal";

// Maps a raw TMDb /search/multi result (movie OR tv shape) into the flat
// shape MovieDetailModal expects everywhere else in the app (posterUrl,
// releaseDate, rating, slug, etc). Mirrors the mapping conventions already
// used in TrendingSection / Top10Section.
function mapResult(raw) {
  const isTV = raw.media_type === "tv";
  const title = isTV ? raw.name : raw.title;
  const releaseDate = isTV ? raw.first_air_date : raw.release_date;
  const year = releaseDate ? releaseDate.slice(0, 4) : null;

  return {
    id: raw.id,
    title,
    posterUrl: getImageUrl(raw.poster_path),
    overview: raw.overview,
    releaseDate,
    rating: raw.vote_average,
    type: isTV ? "series" : "movie",
    // includeYear: true here (unlike GenreFilter's slugify(title, id) call,
    // which doesn't match this file's actual signature) since search
    // results are far more likely to collide on title across years/media.
    slug: slugify(title, { year, includeYear: true }),
  };
}

export default function SearchDropdown({ query, onClose }) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    debounceRef.current = setTimeout(async () => {
      try {
        const data = await searchMulti(trimmed);
        const mapped = (data.results || [])
          .filter((r) => r.media_type === "movie" || r.media_type === "tv")
          .filter((r) => r.poster_path) // drop entries with no artwork, looks broken in a thumb list
          .slice(0, 8)
          .map(mapResult);
        setResults(mapped);
      } catch (err) {
        console.error("Search failed:", err);
        setError("Something went wrong. Try again.");
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // Close dropdown on outside click.
  // Skipped entirely while a modal is open: MovieDetailModal renders via
  // createPortal(..., document.body), so its buttons (Watch Now, bookmark)
  // are NOT descendants of containerRef in the DOM tree even though they
  // visually appear "inside" the dropdown. Without this guard, every click
  // inside the modal gets misread as an outside click and closes both the
  // modal and the dropdown.
  useEffect(() => {
    if (activeItem) return;

    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, activeItem]);

  const trimmed = query.trim();
  if (!trimmed) return null;

  return (
    <>
      <div
        ref={containerRef}
        className="absolute top-full left-0 mt-2 w-full sm:w-96 max-h-[70vh] overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-2xl z-50"
      >
        {isLoading && (
          <div className="flex flex-col gap-2 p-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-10 h-14 bg-black/10 rounded shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-black/10 rounded w-3/4" />
                  <div className="h-2.5 bg-black/10 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && error && (
          <p className="text-center text-sm text-black/50 py-6">{error}</p>
        )}

        {!isLoading && !error && results.length === 0 && (
          <div className="flex flex-col items-center gap-1.5 py-8 text-black/40">
            <FaSearch size={16} />
            <p className="text-sm">No results for "{trimmed}"</p>
          </div>
        )}

        {!isLoading &&
          !error &&
          results.map((item) => (
            <button
              key={`${item.type}-${item.id}`}
              onClick={() => setActiveItem(item)}
              className="w-full flex items-center gap-3 p-2.5 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-10 h-14 rounded overflow-hidden bg-black/5 shrink-0">
                {item.posterUrl ? (
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#111] truncate">
                  {item.title}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {item.releaseDate && (
                    <span className="text-xs text-black/40">
                      {item.releaseDate.slice(0, 4)}
                    </span>
                  )}
                  <span className="text-[10px] font-medium uppercase tracking-wide text-[#C8102E] bg-red-50 px-1.5 py-0.5 rounded">
                    {item.type === "series" ? "Series" : "Movie"}
                  </span>
                </div>
              </div>
            </button>
          ))}
      </div>

      {activeItem && (
        <MovieDetailModal
          movie={activeItem}
          type={activeItem.type}
          formatDuration={formatDuration}
          onClose={() => setActiveItem(null)}
        />
      )}
    </>
  );
}