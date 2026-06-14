import React, { useState } from 'react'
import { featured, genres, movies } from "../../../data/heroData/hdata";
import { ScrollRow } from './scrollRow';

function GenreFilter() {
     const [activeGenre, setActiveGenre] = useState("All Genres");
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-8 border-t border-gray-100 pt-5">
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
  )
}

export default GenreFilter
