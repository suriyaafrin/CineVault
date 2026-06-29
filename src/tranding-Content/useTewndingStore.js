import { create } from "zustand";
import {
  fetchTrending,
  getMovieGenres,
  getTVGenres,
  getImageUrl,
} from "../services/tmdb";

const CURRENT_YEAR = new Date().getFullYear();

function mapTrendingItem(raw, genreMap) {
  const isMovie = raw.media_type === "movie";
  const title = isMovie ? raw.title : raw.name;
  const dateStr = isMovie ? raw.release_date : raw.first_air_date;
  const year = dateStr ? Number(dateStr.slice(0, 4)) : null;
  const posterUrl = getImageUrl(raw.poster_path);

  const genreNames = (raw.genre_ids || [])
    .map((id) => genreMap[id])
    .filter(Boolean);

  const slug =
    `${title}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + `-${raw.id}`;

  return {
    id: raw.id,
    title,
    slug,
    type: isMovie ? "movie" : "series",
    year,
    releaseDate: dateStr || null,
    rating: raw.vote_average,
    overview: raw.overview || null,
    posterUrl,
    genres: genreNames,
    isNew: year === CURRENT_YEAR,
    badge: "Trending this week",
  };
}

export const useTrendingStore = create((set, get) => ({
  activeCategory: "all",
  items: [],
  genreMap: {},
  isLoading: false,
  error: null,
  setActiveCategory: (category) => set({ activeCategory: category }),

  fetchGenreMap: async () => {
    if (Object.keys(get().genreMap).length > 0) return get().genreMap;

    try {
      const [movieGenres, tvGenres] = await Promise.all([
        getMovieGenres(),
        getTVGenres(),
      ]);

      const map = {};
      [...(movieGenres.genres || []), ...(tvGenres.genres || [])].forEach(
        (g) => {
          map[g.id] = g.name;
        }
      );

      set({ genreMap: map });
      return map;
    } catch (err) {
      console.error("Failed to load genre lists:", err);
      return {};
    }
  },

  fetchTrendingItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const genreMap = await get().fetchGenreMap();
      const data = await fetchTrending("all", "week");
      const mapped = (data.results || [])
        .filter((r) => r.media_type === "movie" || r.media_type === "tv")
        .map((raw) => mapTrendingItem(raw, genreMap));

      set({ items: mapped, isLoading: false });
    } catch (err) {
      console.error("Failed to fetch trending items:", err);
      set({ error: err.message, isLoading: false });
    }
  },
}));