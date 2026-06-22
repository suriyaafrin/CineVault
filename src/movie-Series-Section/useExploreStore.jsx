import { create } from "zustand";
export const useExploreStore = create((set) => ({
  activeGenre: "All Genres",
  sortBy: "A-Z",
  yearRange: "1970 - 2030",
  ageRating: "All",
  currentPage: 1,

  setGenre: (genre) => set({ activeGenre: genre, currentPage: 1 }),
  setSortBy: (sortBy) => set({ sortBy }),
  setYearRange: (yearRange) => set({ yearRange, currentPage: 1 }),
  setAgeRating: (ageRating) => set({ ageRating, currentPage: 1 }),
  setPage: (page) => set({ currentPage: page }),
}));
