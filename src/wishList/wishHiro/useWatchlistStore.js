import { create } from "zustand";

// Mock seed data — swap for your real moviesData/seriesData source later.
// "type" matches your existing pattern: "movie" | "series"
const initialItems = [
  {
    id: "oppenheimer",
    slug: "oppenheimer",
    title: "Oppenheimer",
    type: "movie",
    year: 2023,
    runtime: "3h 0m",
    rating: 8.3,
    poster: "/posters/oppenheimer.jpg",
    addedAt: "2026-06-20T10:00:00Z",
  },
  {
    id: "the-batman",
    slug: "the-batman",
    title: "The Batman",
    type: "movie",
    year: 2022,
    runtime: "2h 55m",
    rating: 8.7,
    poster: "/posters/the-batman.jpg",
    addedAt: "2026-06-21T10:00:00Z",
  },
  {
    id: "interstellar",
    slug: "interstellar",
    title: "Interstellar",
    type: "movie",
    year: 2016,
    runtime: "2h 49m",
    rating: 8.6,
    poster: "/posters/interstellar.jpg",
    addedAt: "2026-06-19T10:00:00Z",
  },
  {
    id: "stranger-things",
    slug: "stranger-things",
    title: "Stranger Things",
    type: "series",
    year: 2024,
    seasons: 4,
    rating: 8.7,
    poster: "/posters/stranger-things.jpg",
    addedAt: "2026-06-22T10:00:00Z",
  },
];

export const useWatchlistStore = create((set, get) => ({
  items: initialItems,

  // tab: "all" | "movie" | "series"
  activeTab: "all",
  setActiveTab: (tab) => set({ activeTab: tab }),

  // sortBy: "recent" | "rating" | "az"
  sortBy: "recent",
  setSortBy: (sortBy) => set({ sortBy }),

  searchQuery: "",
  setSearchQuery: (q) => set({ searchQuery: q }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  addItem: (item) =>
    set((state) => {
      if (state.items.some((i) => i.id === item.id)) return state;
      return { items: [...state.items, { ...item, addedAt: new Date().toISOString() }] };
    }),
}));