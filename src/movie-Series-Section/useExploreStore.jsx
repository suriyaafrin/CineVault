import { create } from "zustand";

// Single source of truth for all Explore Movies filter state.
// Keeping it in one slice avoids the prop-drilling that usually causes
// filter/data mismatches between sibling components.
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