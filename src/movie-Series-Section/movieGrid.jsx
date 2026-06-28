import { useEffect, useState } from "react";
import MovieCard from "./movieMovieCard";
import { useExploreStore } from "./useExploreStore";
import { discoverMovies, discoverTV, getImageUrl } from "../services/tmdb";

const SORT_MAP = {
  Popularity: "popularity.desc",
  Rating: "vote_average.desc",
  Year: "primary_release_date.desc",
};

function parseYearRange(yearRange) {
  const [start, end] = yearRange.split("-").map((s) => s.trim());
  return { yearGte: start, yearLte: end };
}

export default function MovieGrid({ type = "movie", onMovieClick }) {
  const activeGenreId = useExploreStore((state) => state.activeGenreId);
  const sortBy = useExploreStore((state) => state.sortBy);
  const yearRange = useExploreStore((state) => state.yearRange);
  const ageRating = useExploreStore((state) => state.ageRating);
  const currentPage = useExploreStore((state) => state.currentPage);

  const [pageMovies, setPageMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function loadDiscover() {
      try {
        const { yearGte, yearLte } = parseYearRange(yearRange);

        const params = {
          page: currentPage,
          sortBy: SORT_MAP[sortBy] || "popularity.desc",
          genreId: activeGenreId,
          yearGte,
          yearLte,
        };

        // Age rating only applies to movies — TV uses a different cert scheme
        if (type !== "series" && ageRating !== "All") {
          params.certification = ageRating;
        }

        const data =
          type === "series" ? await discoverTV(params) : await discoverMovies(params);

        if (!isMounted) return;

        const mapped = (data.results || []).map((item) => ({
          id: item.id,
          title: item.title || item.name,
          posterUrl: getImageUrl(item.poster_path),
          overview: item.overview,
          releaseDate: item.release_date || item.first_air_date,
          rating: item.vote_average,
          genre_ids: item.genre_ids,
        }));

        setPageMovies(mapped);
      } catch (err) {
        console.error("Failed to fetch discover results:", err);
        setPageMovies([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadDiscover();
    return () => {
      isMounted = false;
    };
  }, [type, activeGenreId, sortBy, yearRange, ageRating, currentPage]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="aspect-2/3 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

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