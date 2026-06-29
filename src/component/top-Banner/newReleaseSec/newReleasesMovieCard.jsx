export const MovieCard = ({ movie, onClick }) => (
  <div
    onClick={onClick}
    className="relative rounded-lg overflow-hidden cursor-pointer group aspect-2/3 bg-[#1a1a1f]"
  >
    {movie.posterUrl ? (
      <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-[#1a1a1f] p-2">
        <span className="text-[10px] font-semibold text-white/60 text-center leading-tight">{movie.title}</span>
      </div>
    )}
    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2">
      <p className="text-white text-[10px] font-medium leading-tight">{movie.title}</p>
      <p className="text-white/50 text-[9px] mt-0.5">{movie.year}</p>
    </div>
    {movie.rating && (
      <div className="absolute top-1.5 right-1.5 bg-black/70 text-yellow-400 text-[9px] font-medium px-1.5 py-0.5 rounded">
        ★ {movie.rating}
      </div>
    )}
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <div className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center">
        <FaPlay size={11} className="text-white ml-0.5" />
      </div>
    </div>
  </div>
);
