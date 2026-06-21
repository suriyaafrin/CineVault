export default function MovieCard({ movie }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-2/3 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 bg-black/70 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
          <span className="text-[#C8102E]">★</span>
          {movie.rating.toFixed(1)}
        </div>
      </div>
      <h3 className="mt-2 text-sm font-semibold text-gray-900 truncate">
        {movie.title}
      </h3>
      <p className="text-xs text-gray-500">
        {movie.year} · {movie.duration}
      </p>
    </div>
  );
}