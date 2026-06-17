import useTop10Store from "./useTop10Store";


const Top10Card = ({ movie }) => {
  const { activeId, setActiveId } = useTop10Store();
  const isActive = activeId === movie.id;
  const rank = String(movie.id).padStart(2, "0");

  return (
    <div
      className="flex items-end cursor-pointer group"
      onClick={() => setActiveId(isActive ? null : movie.id)}
    >
      {/* Big rank number — overlaps poster slightly */}
      <span
        className="text-6xl font-black leading-none select-none z-10 -mr-3"
        style={{
          color: "transparent",
          WebkitTextStroke: "2px #C8102E",
          transition: "all 0.2s",
        }}
      >
        {rank}
      </span>

      {/* Poster */}
      <div
        className={`relative w-38 h-45 rounded overflow-hidden border-2 shrink-0 transition-all duration-200 z-20 ${
          isActive ? "border-[#C8102E]" : "border-transparent group-hover:border-gray-500"
        }`}
      >
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        {/* Title overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-1 py-0.5">
          <p className="text-white text-[9px] font-semibold leading-tight line-clamp-2">
            {movie.title}
          </p>
          <p className="text-yellow-400 text-[9px] font-bold">⭐ {movie.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default Top10Card;