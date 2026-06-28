import { create } from "zustand";
import {
  getTopRatedMovies,
  getTopRatedTV,
  getMovieDetails,
  getTVDetails,
  getImageUrl,
} from "../services/tmdb";
// NOTE: import path depth guessed to match the established 3-levels-under-src
// convention used elsewhere in the project. Verify against this file's
// actual location before running.

// There's no real "personalized to this user" endpoint available (no watch
// history / auth-scoped recommendation API wired up), so this uses top-rated
// movies + TV as an honest stand-in for "Recommended for you" rather than
// pretending to be personalized. Swap this for a real recommendations
// endpoint later if/when user watch history is tracked server-side.
function mapPersonalItem(raw, isMovie, rank) {
  const title = isMovie ? raw.title : raw.name;
  return {
    id: raw.id,
    rank,
    title,
    type: isMovie ? "movie" : "series",
    subtitle: raw.vote_average ? `★ ${raw.vote_average.toFixed(1)}` : "",
    image: getImageUrl(raw.poster_path),
    posterUrl: getImageUrl(raw.poster_path),
    overview: raw.overview || null,
    rating: raw.vote_average,
    releaseDate: isMovie ? raw.release_date : raw.first_air_date,
  };
}

export const usePersonalStore = create((set, get) => ({
  // ---- state ----
  personalItems: [],
  activePersonalId: null,
  isLoading: false,
  error: null,

  // Detail cache for the active item — holds trailer/genre/runtime info
  // fetched lazily when a modal opens, same pattern as MovieDetailModal.
  activeDetails: null,
  isLoadingDetails: false,

  // ---- actions ----
  fetchPersonalItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const [movies, tv] = await Promise.all([
        getTopRatedMovies(),
        getTopRatedTV(),
      ]);

      const mappedMovies = (movies.results || [])
        .slice(0, 3)
        .map((r) => mapPersonalItem(r, true));
      const mappedTV = (tv.results || [])
        .slice(0, 2)
        .map((r) => mapPersonalItem(r, false));

      const merged = [...mappedMovies, ...mappedTV].map((item, i) => ({
        ...item,
        rank: i + 1,
      }));

      set({ personalItems: merged, isLoading: false });
    } catch (err) {
      console.error("Failed to fetch personal trending items:", err);
      set({ error: err.message, isLoading: false });
    }
  },

  openPersonalModal: async (id) => {
    set({ activePersonalId: id, activeDetails: null, isLoadingDetails: true });

    const item = get().personalItems.find((i) => i.id === id);
    if (!item) {
      set({ isLoadingDetails: false });
      return;
    }

    try {
      const data =
        item.type === "series"
          ? await getTVDetails(item.id)
          : await getMovieDetails(item.id);
      set({ activeDetails: data, isLoadingDetails: false });
    } catch (err) {
      console.error("Failed to load personal item details:", err);
      set({ isLoadingDetails: false });
    }
  },

  closePersonalModal: () =>
    set({ activePersonalId: null, activeDetails: null }),
}));