

// Generalized page shared by both the /movies and /series routes.
// Each route's page component (pages/movies/movies.jsx,
// pages/series/series.jsx) renders this and just passes its own

import ExploreSidebar from "./exploreSidebar";
import FilterSidebar from "./filterSidebar";
import GenreTabs from "./genreTab";
import MovieGrid from "./movieGrid";
import Pagination from "./pagination";

// `type` prop — no route param needed since routes stay /movies and /series.
export default function ExploreContent({ type = "movie" }) {
  const isSeries = type === "series";
  const label = isSeries ? "Series" : "Movies";

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

          <MovieGrid type={isSeries ? "series" : "movie"} />
          <Pagination totalPages={10} />
        </main>

        <ExploreSidebar />
      </div>
    </div>
  );
}