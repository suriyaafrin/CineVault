import { create } from "zustand";

export const useExploreStore = create((set) => ({
  activeGenre: "All Genres",
  activeGenreId: null,
  sortBy: "Popularity",
  yearRange: "1970 - 2030",
  ageRating: "All",
  currentPage: 1,

  setGenre: (genreName, genreId = null) =>
    set({ activeGenre: genreName, activeGenreId: genreId, currentPage: 1 }),
  setSortBy: (sortBy) => set({ sortBy, currentPage: 1 }),
  setYearRange: (yearRange) => set({ yearRange, currentPage: 1 }),
  setAgeRating: (ageRating) => set({ ageRating, currentPage: 1 }),
  setPage: (page) => set({ currentPage: page }),
}));