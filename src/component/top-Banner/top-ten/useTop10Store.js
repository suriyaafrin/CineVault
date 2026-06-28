import { create } from "zustand";
import { getTopRatedMovies, getTopRatedTV, getImageUrl } from "../../../services/tmdb";

function mapResults(results) {
  return results.map((item) => ({
    id: item.id,
    title: item.title || item.name,
    posterUrl: getImageUrl(item.poster_path),
    backdropUrl: getImageUrl(item.backdrop_path, "original"),
    overview: item.overview,
    rating: item.vote_average,
    releaseDate: item.release_date || item.first_air_date,
  }));
}

const useTop10Store = create((set) => ({
  items: [],
  movieItems: [],
  tvItems: [],
  isLoading: false,
  error: null,
  activeId: null,

  fetchTop10: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getTopRatedMovies();
      const top10 = mapResults(data.results.slice(0, 10));
      set({ items: top10, movieItems: top10, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchTop10TV: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getTopRatedTV();
      const top10 = mapResults(data.results.slice(0, 10));
      set({ tvItems: top10, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  setActiveId: (id) => set({ activeId: id }),
  clearActiveId: () => set({ activeId: null }),
}));

export { useTop10Store };
export default useTop10Store;