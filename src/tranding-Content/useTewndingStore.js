import { create } from "zustand";
import {
  fetchTrending,
  getMovieGenres,
  getTVGenres,
  getImageUrl,
} from "../services/tmdb";
// NOTE: import path depth guessed to match the established 3-levels-under-src
// convention from past sessions. Double-check against this file's actual
// folder location before running.

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

  // slug mirrors the title+id convention used elsewhere in the project
  // (see slugify.js) so items opened from Trending behave the same way
  // in the watchlist as items opened from other sections.
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
    // MovieDetailModal reads movie.releaseDate directly (not year),
    // so the raw date string needs to be carried through too.
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
  // ---- state ----
  activeCategory: "all",
  items: [],
  genreMap: {},
  isLoading: false,
  error: null,

  // ---- actions ----
  setActiveCategory: (category) => set({ activeCategory: category }),

  fetchGenreMap: async () => {
    // Skip refetch if already populated.
    if (Object.keys(get().genreMap).length > 0) return get().genreMap;

    try {
      const [movieGenres, tvGenres] = await Promise.all([
        getMovieGenres(),
        getTVGenres(),
      ]);

      const map = {};
      // Movie and TV genre id spaces overlap but aren't identical
      // (e.g. some ids only exist on one side). Merging both into a
      // single map is fine here since each item only looks up the ids
      // relevant to its own media_type, but if a movie and a TV genre
      // ever share an id with different names, the later merge wins.
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
        // trending/all can include "person" results — filter those out,
        // this row only renders movies/series.
        .filter((r) => r.media_type === "movie" || r.media_type === "tv")
        .map((raw) => mapTrendingItem(raw, genreMap));

      set({ items: mapped, isLoading: false });
    } catch (err) {
      console.error("Failed to fetch trending items:", err);
      set({ error: err.message, isLoading: false });
    }
  },

  // NOTE: filtering is intentionally NOT done here.
  // A method that returns `items.filter(...)` creates a brand-new array
  // reference on every call. When used inside a Zustand selector
  // (e.g. `useTrendingStore((state) => state.getFilteredItems())`),
  // that new reference looks like a "state change" every render,
  // which triggers another render, which calls it again — infinite loop.
  // Filtering happens in the component via useMemo instead.
}));