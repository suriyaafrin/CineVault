import ExploreSidebar from "../../movie-Section/exploreSidebar";
import FilterSidebar from "../../movie-Section/filterSidebar";
import GenreTabs from "../../movie-Section/genreTab";
import MovieGrid from "../../movie-Section/movieGrid";
import Pagination from "../../movie-Section/pagination";


export default function ExploreMovies() {
  return (
    <div className="min-h-screen bg-white px-6 py-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8">
        <main>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Explore <span className="text-[#C8102E]">Movies</span>
          </h1>

          <div className="mb-5">
            <GenreTabs />
          </div>

          <div className="mb-6">
            <FilterSidebar />
          </div>

          <MovieGrid />
          <Pagination totalPages={10} />
        </main>

        <ExploreSidebar />
      </div>
    </div>
  );
}