import { createPortal } from "react-dom";
import { FaBookmark, FaPlay, FaTimes } from "react-icons/fa";

const MovieDetailModal = ({ movie, onClose, formatDuration }) =>
  createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl border border-black/10 w-full max-w-md overflow-hidden shadow-2xl">

        <div className="relative h-44">
          {movie.poster ? (
            <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover opacity-70" />
          ) : (
            <div className="w-full h-full bg-black/5 flex items-center justify-center">
              <span className="text-black/20 text-2xl font-bold tracking-wide">{movie.title}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-white to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 hover:bg-white border border-black/10 flex items-center justify-center text-black/70 transition-colors"
          >
            <FaTimes size={13} />
          </button>

          <div className="absolute left-4 -bottom-7 w-16 h-24 rounded-lg overflow-hidden border-2 border-white bg-black/5 flex items-center justify-center shadow-md">
            {movie.poster ? (
              <img src={movie.poster} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-[8px] text-black/40 text-center p-1 leading-tight">{movie.title}</span>
            )}
          </div>
        </div>

        <div className="pt-2 pb-4 px-4 pl-24">
          <h3 className="text-black text-base font-semibold leading-tight">{movie.title}</h3>
          <p className="text-black/40 text-xs mt-0.5">{movie.year}</p>
          {movie.genre && (
            <span className="inline-block mt-1.5 bg-black/5 text-black/60 text-[10px] px-2 py-0.5 rounded">
              {movie.genre}
            </span>
          )}
          <div className="flex gap-4 mt-3">
            {movie.rating && (
              <div>
                <p className="text-black/40 text-[10px]">Rating</p>
                <p className="text-yellow-500 text-sm font-medium">★ {movie.rating}</p>
              </div>
            )}
            {movie.duration && (
              <div>
                <p className="text-black/40 text-[10px]">Duration</p>
                <p className="text-black text-sm font-medium">{formatDuration(movie.duration)}</p>
              </div>
            )}
          </div>
        </div>

        {movie.desc && (
          <div className="px-4 pb-4">
            <p className="text-black/60 text-xs leading-relaxed border-t border-black/[0.07] pt-3">{movie.desc}</p>
          </div>
        )}

        <div className="flex gap-2 px-4 py-3 border-t border-black/[0.07]">
          <button className="flex-1 flex items-center justify-center gap-1.5 bg-[#C8102E] hover:bg-[#a50d26] text-white text-xs font-medium py-2 rounded-lg transition-colors">
            <FaPlay size={11} />
            Watch now
          </button>
          <button className="w-9 h-9 flex items-center justify-center bg-black/4 hover:bg-black/10 border border-black/10 text-black/70 rounded-lg transition-colors">
            <FaBookmark size={14} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );

export default MovieDetailModal;