import { useState, useRef } from "react";
import { featured, genres, movies } from "../../../data/heroData/hdata";
import { FaPlay } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { GiBat } from "react-icons/gi";
import MovieCard from "./MovieCard";

function ScrollRow({ children, className = "" }) {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: dir * 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow text-gray-600 hover:text-[#C8102E] hover:border-[#C8102E] transition-all sm:hidden"
        aria-label="Scroll left"
      >
        <FaChevronLeft size={14} />
      </button>

      <div
        ref={rowRef}
        className={`flex gap-3 overflow-x-auto pb-2 scrollbar-hide scroll-smooth px-8 sm:px-0 ${className}`}
      >
        {children}
      </div>

      <button
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow text-gray-600 hover:text-[#C8102E] hover:border-[#C8102E] transition-all sm:hidden"
        aria-label="Scroll right"
      >
        <FaChevronRight size={14} />
      </button>
    </div>
  );
}

export default function CineVaultHero() {
  const [activeGenre, setActiveGenre] = useState("All Genres");
  const [activeMovieId, setActiveMovieId] = useState(null);

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_75%_50%,rgba(200,16,46,0.07)_0%,transparent_65%)]" />

        <div className="max-w-7xl mx-auto px-8 py-14 flex flex-col gap-10">

          {/* Top row: left content + poster */}
          <div className="flex items-center justify-between gap-10">
            {/* Left Content */}
            <div className="flex-1 max-w-xl z-10">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded border mb-5 text-[#C8102E] border-[#C8102E]">
                Featured Movie
              </span>

              <h1 className="text-5xl font-black tracking-tight mb-4 leading-none text-[#111]">
                {featured.title}
              </h1>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 flex-wrap">
                <span>{featured.year}</span>
                <span className="text-gray-300">·</span>
                <span>{featured.runtime}</span>
                <span className="text-gray-300">·</span>
                <span>{featured.genres}</span>
                <span className="text-gray-300">·</span>
                <span className="flex items-center gap-1 font-semibold text-[#C8102E]">
                  ★ {featured.rating}
                </span>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-7 max-w-md">
                {featured.description}
              </p>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#C8102E] transition-all hover:opacity-90 active:scale-95">
                  <FaPlay size={14} color="white" />
                  Watch Now
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 transition-all active:scale-95">
                  + My List
                </button>
              </div>
            </div>

            {/* Right - Poster Card */}
            <div className="z-10 shrink-0">
              <div className="w-64 h-100 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-2xl bg-[linear-gradient(145deg,#1a0508,#3d0010)] rotate-2 shadow-[0_20px_60px_rgba(200,16,46,0.25),0_4px_24px_rgba(0,0,0,0.15)]">
                <div className="text-5xl text-[#C8102E] opacity-80"><GiBat /></div>
                <div className="text-white font-bold text-sm tracking-widest text-center leading-tight uppercase">
                  The<br />Batman
                </div>
                <div className="text-xs tracking-widest uppercase text-[#C8102E]">2022</div>
              </div>
            </div>
          </div>

          {/* Carousel - full width spanning both columns */}
          <div className="w-full">
            <ScrollRow>
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isActive={activeMovieId === movie.id}
                  onClick={() => setActiveMovieId(movie.id)}
                />
              ))}
            </ScrollRow>
          </div>

        </div>
      </div>

      {/* Genre Filter */}
      <div className="max-w-7xl mx-auto px-8 pb-8 border-t border-gray-100 pt-5">
        <ScrollRow>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${
                activeGenre === genre
                  ? "bg-[#C8102E] text-white border-[#C8102E]"
                  : "bg-transparent text-[#666] border-[#e5e7eb]"
              }`}
            >
              {genre}
            </button>
          ))}
        </ScrollRow>
      </div>
    </div>
  );
}