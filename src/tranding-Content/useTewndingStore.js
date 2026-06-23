import { create } from "zustand";

export const useTrendingStore = create((set) => ({
  // ---- state ----
  activeCategory: "all",

  items: [
    {
      id: "oppenheimer",
      title: "Oppenheimer",
      type: "movie",
      year: 2023,
      duration: "3h 0m",
      views: "1.19K views",
      rating: 8.8,
      badge: "Trending due to high buzz",
      poster:
        "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&q=80",
    },
    {
      id: "the-last-of-us-s2",
      title: "The Last of Us S2",
      type: "series",
      year: 2023,
      duration: "1 Season",
      views: "1.73K views",
      rating: 9.3,
      badge: "Trending due to high buzz",
      poster:
        "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?w=400&q=80",
    },
    {
      id: "spider-man-4",
      title: "Spider-Man 4",
      type: "movie",
      year: 2024,
      duration: "2h 20m",
      views: "1.17K views",
      rating: 8.8,
      badge: "Trending due to high buzz",
      poster:
        "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80",
    },
    {
      id: "spider-man-4-conceptual",
      title: '"Spider-Man 4"',
      type: "movie",
      year: 2024,
      duration: "(Conceptual)",
      views: "1.17K views",
      rating: 8.7,
      badge: "Trending due to high buzz",
      poster:
        "https://images.unsplash.com/photo-1626814026160-2237a95fc5c0?w=400&q=80",
    },
    {
      id: "barbie",
      title: "Barbie",
      type: "movie",
      year: 2023,
      duration: "2h 2hm",
      views: "1.22K views",
      rating: 8.6,
      badge: "Trending due to high buzz",
      poster:
        "https://images.unsplash.com/photo-1593085260707-5377ba37f868?w=400&q=80",
    },
    {
      id: "stranger-things-finale",
      title: "Stranger Things Finale",
      type: "series",
      year: 2023,
      duration: "4 Seasons",
      views: "1.57K views",
      rating: 8.7,
      badge: "Trending due to high buzz",
      poster:
        "https://images.unsplash.com/photo-1626814026160-2237a95fc5c0?w=400&q=80",
    },
  ],

  // ---- actions ----
  setActiveCategory: (category) => set({ activeCategory: category }),

  // NOTE: filtering is intentionally NOT done here anymore.
  // A method that returns `items.filter(...)` creates a brand-new array
  // reference on every call. When used inside a Zustand selector
  // (e.g. `useTrendingStore((state) => state.getFilteredItems())`),
  // that new reference looks like a "state change" every render,
  // which triggers another render, which calls it again — infinite loop.
  // Filtering now happens in the component via useMemo instead.
}));