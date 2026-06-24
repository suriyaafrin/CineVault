import MovieCard from "../movie-Series-Section/movieMovieCard";

function TrendingMovieCard({ item, onSelect }) {
  if (!item) return null;

  const badgeStyles =
    item.type === "movie"
      ? "bg-[#C8102E] text-white"
      : "bg-slate-900 text-white";

  return (
    <div
      className="relative w-28 sm:w-32 md:w-36 lg:w-40 mr-1.5 sm:mr-3 md:mr-4 cursor-pointer"
      onClick={() => onSelect?.(item)}
    >
      <MovieCard movie={item} />

      <span
        className={`absolute left-1 top-1 sm:left-1.5 sm:top-1.5 rounded px-1 py-0.5 sm:px-1.5 text-[7px] sm:text-[8px] font-bold uppercase tracking-wide ${badgeStyles}`}
      >
        {item.type === "movie" ? "Movie" : "Series"}
      </span>

      <div className="pointer-events-none absolute inset-x-0 bottom-7 sm:bottom-8 md:bottom-9 flex items-center gap-1 bg-linear-to-t from-black/80 to-transparent px-1 sm:px-1.5 pb-1 pt-2 sm:pt-3">
        <span className="text-orange-400 text-[9px] sm:text-[10px]">●</span>
        <span className="truncate text-[8px] sm:text-[9px] font-medium text-white">
          {item.badge}
        </span>
      </div>
    </div>
  );
}

export default TrendingMovieCard;