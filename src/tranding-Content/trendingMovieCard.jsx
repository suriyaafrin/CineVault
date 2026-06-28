import MovieCard from "../movie-Series-Section/movieMovieCard";

function TrendingMovieCard({ item, onSelect }) {
  if (!item) return null;

  const badgeStyles =
    item.type === "movie"
      ? "bg-[#C8102E] text-white"
      : "bg-slate-900 text-white";

  const genreLabel =
    item.genres && item.genres.length > 0
      ? item.genres.slice(0, 2).join(", ")
      : null;

  return (
    // NOTE: width is intentionally NOT set here anymore (no more
    // w-28 sm:w-32 md:w-36 lg:w-40). It used to live on this root div,
    // which silently overrode the *parent* wrapper's responsive
    // w-[46%] sm:w-[30%] md:w-[22%] lg:w-[16%] sizing in TrendingSection —
    // two competing sizing systems fighting each other, with this one
    // always winning since it's more specific (fixed px vs %). Width now
    // comes entirely from the parent; this component just fills it
    // (w-full h-full) so there's a single source of truth for card size.
    <div className="relative w-full h-full cursor-pointer" onClick={() => onSelect?.(item)}>
      <MovieCard movie={item} />

      <span
        className={`absolute left-1 top-1 sm:left-1.5 sm:top-1.5 rounded px-1 py-0.5 sm:px-1.5 text-[7px] sm:text-[8px] font-bold uppercase tracking-wide ${badgeStyles}`}
      >
        {item.type === "movie" ? "Movie" : "Series"}
      </span>

      {item.isNew && (
        <span className="absolute right-1 top-1 sm:right-1.5 sm:top-1.5 rounded bg-emerald-500 px-1 py-0.5 sm:px-1.5 text-[7px] sm:text-[8px] font-bold uppercase tracking-wide text-white">
          New
        </span>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-7 sm:bottom-8 md:bottom-9 flex flex-col gap-0.5 bg-linear-to-t from-black/80 to-transparent px-1 sm:px-1.5 pb-1 pt-2 sm:pt-3">
        <div className="flex items-center gap-1">
          <span className="text-orange-400 text-[9px] sm:text-[10px]">●</span>
          <span className="truncate text-[8px] sm:text-[9px] font-medium text-white">
            {item.badge}
          </span>
        </div>
        {genreLabel && (
          <span className="truncate text-[7px] sm:text-[8px] font-medium text-slate-300">
            {genreLabel}
          </span>
        )}
      </div>
    </div>
  );
}

export default TrendingMovieCard;