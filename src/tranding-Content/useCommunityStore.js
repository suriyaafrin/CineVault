import { create } from "zustand";
const buzzItems = [
  {
    id: 1,
    tag: "meme battle",
    title: "Barbie vs. Oppenheimer",
    subtitle: "Viral memes · Highest mentions",
    image:
      "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=600",
    detail:
      "The internet pitted Barbenheimer against itself this week. Browse the top fan edits, reaction memes, and the community's hottest takes on which film actually won the summer.",
    stat: "24.3k posts today",
  },
  {
    id: 2,
    tag: "review",
    title: "Creator spotlight",
    subtitle: "Top review video this week",
    image:
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600",
    detail:
      "Our most-watched creator review this week breaks down why The Last of Us S2 finale is splitting audiences. Watch the full review and join the comment thread.",
    stat: "312k views",
  },
  {
    id: 3,
    tag: "live",
    title: "Live watch party",
    subtitle: "15.2k joining now",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600",
    detail:
      "CineVault Socii is hosting a synced watch party for Stranger Things Finale right now. Jump in to chat live with thousands of other fans as the episode plays.",
    stat: "15.2k watching",
  },
];

export const useCommunityStore = create((set) => ({
  buzzItems,
  activeBuzzId: null,
  openBuzzModal: (id) => set({ activeBuzzId: id }),
  closeBuzzModal: () => set({ activeBuzzId: null }),
}));