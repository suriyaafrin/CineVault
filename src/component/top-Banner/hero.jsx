import { useState, useRef } from "react";
import { featured, genres, movies } from "../../../data/heroData/hdata";
import { FaPlay } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { GiBat } from "react-icons/gi";
import MovieCard from "./MovieCard";
import GenreFilter from "./genre";
import { ScrollRow } from "./scrollRow";



export default function CineVaultHero() {
  const [activeGenre, setActiveGenre] = useState("All Genres");
  const [activeMovieId, setActiveMovieId] = useState(null);

  return (
    <div className="bg-white min-h-screen font-sans">
     
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_75%_50%,rgba(200,16,46,0.07)_0%,transparent_65%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-14 flex flex-col gap-8 sm:gap-10">

         
          <div className="flex flex-col-reverse sm:flex-row items-center sm:items-center justify-between gap-6 sm:gap-10">

            
            <div className="flex-1 w-full max-w-xl z-10 text-center sm:text-left">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded border mb-4 sm:mb-5 text-[#C8102E] border-[#C8102E]">
                Featured Movie
              </span>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3 sm:mb-4 leading-none text-[#111]">
                {featured.title}
              </h1>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500 mb-3 sm:mb-4 flex-wrap">
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

              <p className="text-gray-500 text-sm leading-relaxed mb-6 sm:mb-7 max-w-md mx-auto sm:mx-0">
                {featured.description}
              </p>

              <div className="flex gap-3 justify-center sm:justify-start">
                <button className="flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#C8102E] transition-all hover:opacity-90 active:scale-95">
                  <FaPlay size={14} color="white" />
                  Watch Now
                </button>
                <button className="flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 transition-all active:scale-95">
                  + My List
                </button>
              </div>
            </div>

    
            <div className="z-10 shrink-0">
              <div className="w-40 h-60 sm:w-64 sm:h-96 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-2xl bg-[linear-gradient(145deg,#1a0508,#3d0010)] shadow-[0_20px_60px_rgba(200,16,46,0.25),0_4px_24px_rgba(0,0,0,0.15)]">
                <div className="text-4xl sm:text-5xl text-[#C8102E] opacity-80"><GiBat /></div>
                <div className="text-white font-bold text-xs sm:text-sm tracking-widest text-center leading-tight uppercase">
                  The<br />Batman
                </div>
                <div className="text-xs tracking-widest uppercase text-[#C8102E]">2022</div>
              </div>
            </div>
          </div>

    
          <div className="w-full h-48 sm:h-56">
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

      <GenreFilter/>
    </div>
  );
}