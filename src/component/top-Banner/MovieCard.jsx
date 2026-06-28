export default function MovieCard({ movie, isActive = false, onClick }) {
  return (
    <div
      className={`shrink-0 w-27 cursor-pointer`}
      onClick={onClick}
    >

      <div
        className={`w-27 h-38 rounded-xl border overflow-hidden relative transition-all duration-200 hover:scale-[1.04] hover:border-[#C8102E] ${
          isActive
            ? "border-[#C8102E] ring-2 ring-[#C8102E]/20"
            : "border-gray-200"
        }`}
      >
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 px-2 bg-black/5">
            {movie.icon && (
              <span className="text-3xl opacity-80">{movie.icon}</span>
            )}
            <span className="text-[10px] font-medium text-center leading-snug text-black/50">
              {movie.title}
            </span>
          </div>
        )}

        {movie.badge && (
          <span
            className={`absolute top-1.5 left-1.5 text-[9px] font-medium px-1.5 py-0.5 rounded uppercase tracking-wide ${
              movie.badge === "New"
                ? "bg-[#C8102E] text-white"
                : "bg-black/55 text-white border border-white/20"
            }`}
          >
            {movie.badge}
          </span>
        )}


        {movie.rating && (
          <span className="absolute bottom-1.5 right-1.5 text-[9px] font-medium bg-black/55 text-white rounded px-1 py-0.5 flex items-center gap-0.5">
            <span className="text-[#C8102E]">★</span>
            {movie.rating}
          </span>
        )}
      </div>


      <p className="mt-1.5 text-[11px] font-medium text-gray-900 truncate">
        {movie.title}
      </p>
      <p className="text-[10px] text-gray-400">
        {movie.year} · {movie.genre}
      </p>


      {isActive && (
        <div className="w-6 h-0.5 bg-[#C8102E] rounded-full mx-auto mt-2" />
      )}
    </div>
  );
}