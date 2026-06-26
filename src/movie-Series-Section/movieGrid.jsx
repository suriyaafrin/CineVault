import { useMemo } from "react";
import MovieCard from "./movieMovieCard";
import { useExploreStore } from "./useExploreStore";
import { movies } from "../../data/movieData/movieData";
import { series } from "../../data/seriesData/seriesData";

const PAGE_SIZE = 20;

export default function MovieGrid({ type = "movie", onMovieClick }) {
  const activeGenre = useExploreStore((state) => state.activeGenre);
  const sortBy = useExploreStore((state) => state.sortBy);
  const ageRating = useExploreStore((state) => state.ageRating);
  const currentPage = useExploreStore((state) => state.currentPage);

  const sourceData = type === "series" ? series : movies;

  const filteredMovies = useMemo(() => {
    let result = sourceData;

    if (activeGenre !== "All Genres") {
      result = result.filter((movie) => movie.genres.includes(activeGenre));
    }

    if (ageRating !== "All") {
      result = result.filter((movie) => movie.ageRating === ageRating);
    }

    const sorted = [...result];
    if (sortBy === "A-Z") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Year") {
      sorted.sort((a, b) => b.year - a.year);
    }

    return sorted;
  }, [sourceData, activeGenre, sortBy, ageRating]);

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageMovies = filteredMovies.slice(start, start + PAGE_SIZE);

  if (pageMovies.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500">
        No {type === "series" ? "series" : "movies"} match these filters. Try a different genre or rating.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {pageMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onMovieClick?.(movie)}
        />
      ))}
    </div>
  );
}