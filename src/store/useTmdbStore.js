import { create } from "zustand";
import { fetchTrending } from "../utils/tmdb";

export const useTmdbStore = create((set) => ({
  items: [],
  isLoading: false,
  error: null,

  loadTrending: async () => {
    set({ isLoading: true, error: null });
    try {
      const results = await fetchTrending();
      set({ items: results, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
}));