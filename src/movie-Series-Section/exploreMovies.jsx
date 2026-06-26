import { useState } from "react";
import ExploreSidebar from "./exploreSidebar";
import FilterSidebar from "./filterSidebar";
import GenreTabs from "./genreTab";
import MovieGrid from "./movieGrid";
import Pagination from "./pagination";


import MovieDetailModal from "../component/top-Banner/newReleaseSec/movieDetailModal";
import { formatDuration } from "../utils/formateDuration";

export default function ExploreContent({ type = "movie" }) {
  const isSeries = type === "series";
  const label = isSeries ? "Series" : "Movies";

  const [activeMovie, setActiveMovie] = useState(null);

  return (
    <div className="min-h-screen bg-white px-6 py-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8">
        <main>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Explore <span className="text-[#C8102E]">{label}</span>
          </h1>

          <div className="mb-5">
            <GenreTabs />
          </div>

          <div className="mb-6">
            <FilterSidebar />
          </div>

          <MovieGrid
            type={isSeries ? "series" : "movie"}
            onMovieClick={setActiveMovie}
          />
          <Pagination totalPages={10} />
        </main>

        <ExploreSidebar type={isSeries ? "series" : "movie"} />
      </div>

      {activeMovie && (
        <MovieDetailModal
          movie={activeMovie}
          onClose={() => setActiveMovie(null)}
          formatDuration={formatDuration}
        />
      )}
    </div>
  );
}