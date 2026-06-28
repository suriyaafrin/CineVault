export default function MovieCard({ movie, onClick }) {
  const year = movie.releaseDate ? movie.releaseDate.slice(0, 4) : "";

  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative aspect-2/3 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 hover:border-2 hover:border-[#C8102E] "
        />
        <div className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 bg-black/70 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
          <span className="text-[#C8102E]">★</span>
          {movie.rating?.toFixed(1)}
        </div>
      </div>
      <h3 className="mt-2 text-sm font-semibold text-[#C8102E] truncate">
        {movie.title}
      </h3>
      <p className="text-xs text-gray-500">{year}</p>
    </div>
  );
}