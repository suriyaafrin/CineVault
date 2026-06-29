import React, { useState } from 'react'
import { featured, genres, movies } from "../../../data/heroData/hdata";
import { ScrollRow } from './scrollRow';

function GenreFilter() {
     const [activeGenre, setActiveGenre] = useState("All Genres");
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-8 border-t border-gray-100 pt-5">
        
      </div>
    </div>
  )
}

export default GenreFilter
