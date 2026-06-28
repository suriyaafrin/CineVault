import { useEffect, useState } from "react";
// import { getMovieGenres, getTVGenres } from "../../../services/tmdb";
import { useExploreStore } from "./useExploreStore";
import { getMovieGenres, getTVGenres } from "../services/tmdb"

export default function GenreTabs({ type = "movie" }) {
  const activeGenre = useExploreStore((state) => state.activeGenre);
  const setGenre = useExploreStore((state) => state.setGenre);

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadGenres() {
      try {
        const data =
          type === "series" ? await getTVGenres() : await getMovieGenres();
        if (!isMounted) return;
        setGenres(data.genres || []);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    }

    loadGenres();
    return () => {
      isMounted = false;
    };
  }, [type]);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setGenre("All Genres")}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
          activeGenre === "All Genres"
            ? "bg-[#C8102E] text-white"
            : "bg-gray-100 text-[#C8102E] hover:bg-gray-200"
        }`}
      >
        All Genres
      </button>
      {genres.map((genre) => {
        const isActive = genre.name === activeGenre;
        return (
          <button
            key={genre.id}
            onClick={() => setGenre(genre.name, genre.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              isActive
                ? "bg-[#C8102E] text-white"
                : "bg-gray-100 text-[#C8102E] hover:bg-gray-200"
            }`}
          >
            {genre.name}
          </button>
        );
      })}
    </div>
  );
}