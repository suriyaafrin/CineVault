import { useState, useEffect } from "react";
import { getNowPlayingMovies, getImageUrl } from "../../../services/tmdb"
import MovieCard from "../MovieCard";
import { ScrollRow } from "../scrollRow";
import AllNewReleasesModal from "./allNewReleasesModal";
import MovieDetailModal from "./movieDetailModal";

const formatDuration = (mins) => {
  if (!mins) return "";
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
};

const NewReleasesSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadNowPlaying() {
      try {
        const data = await getNowPlayingMovies();
        if (!isMounted) return;

        const mapped = data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          posterUrl: getImageUrl(movie.poster_path),
          overview: movie.overview,
          releaseDate: movie.release_date,
          rating: movie.vote_average,
          genre_ids: movie.genre_ids,
        }));

        setMovies(mapped);
      } catch (err) {
        console.error("Failed to fetch now playing movies:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadNowPlaying();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-6 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[21px] font-bold text-[#C8102E]">New Releases</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1 text-sm font-medium text-[#C8102E] hover:underline"
          >
            View All
            <span className="text-base leading-none">›</span>
          </button>
        </div>

        <ScrollRow>
          {loading
            ? Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="w-40 h-60 bg-white/10 rounded-lg animate-pulse flex-shrink-0"
                />
              ))
            : movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => setSelectedMovie(movie)}
                />
              ))}
        </ScrollRow>

        {selectedMovie && (
          <MovieDetailModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            formatDuration={formatDuration}
          />
        )}
      </section>

      <AllNewReleasesModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        movies={movies}
      />
    </>
  );
};

export default NewReleasesSection;