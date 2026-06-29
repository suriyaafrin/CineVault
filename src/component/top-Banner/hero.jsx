import { useState, useEffect } from "react";
import { FaPlay, FaCheck } from "react-icons/fa";
import { GiBat } from "react-icons/gi";
import MovieCard from "./MovieCard";
import { ScrollRow } from "./scrollRow";
import TrendingSection from "./tranding";
import ContinueWatching from "./continue-Watching";
import Top10Section from "./top-ten/Top10Section";
import NewReleasesSection from "./newReleaseSec/newRelease";
import MovieDetailModal from "./newReleaseSec/movieDetailModal";
import { formatDuration } from "../../utils/formateDuration";
import { useWatchlistStore } from "../../wishList/wishHiro/useWatchlistStore";
import {
  fetchTrending,
  getPopularMovies,
  getMovieDetails,
  getImageUrl,
} from "../../services/tmdb"

export default function CineVaultHero() {
  const [activeGenre, setActiveGenre] = useState("All Genres");
  const [activeMovieId, setActiveMovieId] = useState(null);

  const [featured, setFeatured] = useState(null);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  const [movies, setMovies] = useState([]);
  const [rowLoading, setRowLoading] = useState(true);

  const watchlistItems = useWatchlistStore((state) => state.items);
  const toggleItem = useWatchlistStore((state) => state.toggleItem);

  const activeMovie = movies.find((movie) => movie.id === activeMovieId);

  const featuredWatchlistId = featured ? String(featured.id) : null;
  const isFeaturedSaved = featuredWatchlistId
    ? watchlistItems.some((i) => i.id === featuredWatchlistId)
    : false;

 
  useEffect(() => {
    let isMounted = true;

    async function loadFeatured() {
      try {
        const trending = await fetchTrending("movie", "week");
        const top = trending.results?.[0];
        if (!top || !isMounted) return;

        const details = await getMovieDetails(top.id);
        if (!isMounted) return;

        setFeatured({
          id: details.id,
          title: details.title,
          posterUrl: getImageUrl(details.poster_path),
          year: details.release_date ? details.release_date.slice(0, 4) : "",
          runtime: details.runtime ? formatDuration(details.runtime) : "",
          genres: (details.genres || []).map((g) => g.name).join(", "),
          rating: details.vote_average,
          description: details.overview,
          videos: details.videos,
        });
      } catch (err) {
        console.error("Failed to fetch featured movie:", err);
      } finally {
        if (isMounted) setFeaturedLoading(false);
      }
    }

    loadFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadPopular() {
      try {
        const data = await getPopularMovies();
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
        console.error("Failed to fetch popular movies:", err);
      } finally {
        if (isMounted) setRowLoading(false);
      }
    }

    loadPopular();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleWatchNow = () => {
    if (!featured?.videos?.results) return;
    const trailer =
      featured.videos.results.find(
        (v) => v.site === "YouTube" && v.type === "Trailer"
      ) || featured.videos.results.find((v) => v.site === "YouTube");

    if (trailer) {
      window.open(
        `https://www.youtube.com/watch?v=${trailer.key}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const handleToggleMyList = () => {
    if (!featured) return;
    toggleItem({
      id: featuredWatchlistId,
      slug: featured.slug,
      title: featured.title,
      type: "movie",
      year: featured.year ? Number(featured.year) : null,
      runtime: featured.runtime || null,
      rating: featured.rating,
      poster: featured.posterUrl,
    });
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none bg-[#F7F2F3] bg-[radial-gradient(ellipse_at_75%_50%,rgba(200,16,46,0.07)_0%,transparent_65%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-14 flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col-reverse sm:flex-row items-center sm:items-center justify-between gap-6 sm:gap-10">
            <div className="flex-1 w-full max-w-xl z-10 text-center sm:text-left">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded border mb-4 sm:mb-5 text-[#C8102E] border-[#C8102E]">
                Featured Movie
              </span>

              {featuredLoading || !featured ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-10 w-3/4 bg-gray-200 rounded mx-auto sm:mx-0" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded mx-auto sm:mx-0" />
                  <div className="h-16 w-full bg-gray-200 rounded" />
                </div>
              ) : (
                <>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3 sm:mb-4 leading-none text-[#111]">
                    {featured.title}
                  </h1>

                  <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500 mb-3 sm:mb-4 flex-wrap">
                    <span>{featured.year}</span>
                    {featured.runtime && (
                      <>
                        <span className="text-gray-300">·</span>
                        <span>{featured.runtime}</span>
                      </>
                    )}
                    {featured.genres && (
                      <>
                        <span className="text-gray-300">·</span>
                        <span>{featured.genres}</span>
                      </>
                    )}
                    <span className="text-gray-300">·</span>
                    <span className="flex items-center gap-1 font-semibold text-[#C8102E]">
                      ★ {featured.rating?.toFixed(1)}
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed mb-6 sm:mb-7 max-w-md mx-auto sm:mx-0">
                    {featured.description}
                  </p>
                </>
              )}

              <div className="flex gap-3 justify-center sm:justify-start">
                <button
                  onClick={handleWatchNow}
                  disabled={featuredLoading}
                  className="flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#C8102E] transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                >
                  <FaPlay size={14} color="white" />
                  Watch Now
                </button>
                <button
                  onClick={handleToggleMyList}
                  disabled={featuredLoading}
                  className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-lg text-sm font-semibold border transition-all active:scale-95 disabled:opacity-50 ${
                    isFeaturedSaved
                      ? "bg-[#C8102E] border-[#C8102E] text-white"
                      : "text-gray-700 border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  {isFeaturedSaved ? <FaCheck size={12} /> : null}
                  {isFeaturedSaved ? "In My List" : "+ My List"}
                </button>
              </div>
            </div>

            <div className="z-10 shrink-0">
              {featuredLoading || !featured?.posterUrl ? (
                <div className="w-40 h-60 sm:w-64 sm:h-96 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-2xl bg-[linear-gradient(145deg,#1a0508,#3d0010)] shadow-[0_20px_60px_rgba(200,16,46,0.25),0_4px_24px_rgba(0,0,0,0.15)] animate-pulse">
                  <div className="text-4xl sm:text-5xl text-[#C8102E] opacity-80">
                    <GiBat />
                  </div>
                </div>
              ) : (
                <img
                  src={featured.posterUrl}
                  alt={featured.title}
                  className="w-40 h-60 sm:w-64 sm:h-96 rounded-2xl object-cover shadow-2xl shadow-[0_20px_60px_rgba(200,16,46,0.25),0_4px_24px_rgba(0,0,0,0.15)]"
                />
              )}
            </div>
          </div>

          <div className="w-full h-48 sm:h-56">
            <ScrollRow>
              {rowLoading
                ? Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-40 h-60 bg-gray-200 rounded-lg animate-pulse shrink-0"
                    />
                  ))
                : movies.map((movie) => (
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

      <TrendingSection />
      <ContinueWatching />
      <Top10Section />
      <NewReleasesSection />

      {activeMovie && (
        <MovieDetailModal
          movie={activeMovie}
          onClose={() => setActiveMovieId(null)}
          formatDuration={formatDuration}
        />
      )}
    </div>
  );
}