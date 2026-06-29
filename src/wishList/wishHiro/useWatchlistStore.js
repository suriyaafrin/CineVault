import { create } from "zustand";

export const useWatchlistStore = create((set, get) => ({
  items: [],
  activeTab: "all",
  setActiveTab: (tab) => set({ activeTab: tab }),

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

  isInWatchlist: (id) => get().items.some((item) => item.id === id),

  toggleItem: (item) =>
  set((state) => {
    console.log("TOGGLE RUNNING, current items:", state.items.length); // ADD THIS
    const exists = state.items.some((i) => i.id === item.id);
    if (exists) {
      return { items: state.items.filter((i) => i.id !== item.id) };
    }
    return { items: [...state.items, { ...item, addedAt: new Date().toISOString() }] };
  }),
}));