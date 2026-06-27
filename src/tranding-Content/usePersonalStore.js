import { create } from "zustand";

// Mirrors useGlobalStore / useCommunityStore shape.
// In a real app, swap personalItems for a personalized API
// call keyed off the logged-in user's watch history.
export const personalItems = [
  {
    id: 1,
    rank: 1,
    title: "Barbie",
    subtitle: "Viral soundtrack",
    image:
      "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=300",
    detail:
      "You watched Barbie last week — its soundtrack is now the most shared audio clip on CineVault Socii. Revisit your favorite scenes or jump into the fan remix thread.",
    reason: "Because you watched Barbie",
  },
  {
    id: 2,
    rank: 2,
    title: "The Bear S3",
    subtitle: "Teaser drop",
    image:
      "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=300",
    detail:
      "The Bear Season 3 teaser just dropped and matches your taste for tense, character-driven drama. Watch the teaser now before the full season lands.",
    reason: "Based on your watch history",
  },
  {
    id: 3,
    rank: 3,
    title: "The Dark Knight",
    subtitle: "",
    image:
      "https://images.unsplash.com/photo-1531259683007-016fe864c333?w=300",
    detail:
      "A perennial favorite among viewers who enjoyed The Batman. Still one of the highest-rated entries in the genre on CineVault.",
    reason: "Similar to titles you've rated highly",
  },
  {
    id: 4,
    rank: 4,
    title: "Oppenheimer",
    subtitle: "",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300",
    detail:
      "Still trending across your region this week. Pick up where you left off or start a rewatch with commentary mode.",
    reason: "Trending in your region",
  },
  {
    id: 5,
    rank: 5,
    title: "The Last of Us S2",
    subtitle: "",
    image:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300",
    detail:
      "New episodes are climbing the charts fast. Based on your watch history, this is a strong match for your taste in tense, story-driven series.",
    reason: "Because you watched similar series",
  },
];

export const usePersonalStore = create((set) => ({
  personalItems,
  activePersonalId: null,
  openPersonalModal: (id) => set({ activePersonalId: id }),
  closePersonalModal: () => set({ activePersonalId: null }),
}));