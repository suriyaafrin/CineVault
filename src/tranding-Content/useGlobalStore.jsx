import { create } from "zustand";
const hotspots = [
  {
    id: 1,
    region: "Southeast Asia",
    genre: "Horror",
    detail: "Horror trending due to high buzz",
    titles: ["The Last of Us S2", "Smile 3", "Talk to Me 2"],
  },
  {
    id: 2,
    region: "North America",
    genre: "Action",
    detail: "Action trending due to high buzz",
    titles: ["Spider-Man 4", "The Batman", "Mission: Impossible 8"],
  },
  {
    id: 3,
    region: "Western Europe",
    genre: "Drama",
    detail: "Drama trending due to award buzz",
    titles: ["Oppenheimer", "Anatomy of a Fall", "The Zone of Interest"],
  },
  {
    id: 4,
    region: "South America",
    genre: "Comedy",
    detail: "Comedy trending due to high buzz",
    titles: ["Barbie", "Leo", "Loki S3"],
  },
];

export const useGlobalStore = create((set) => ({
  hotspots,
  activeHotspotId: null,
  openHotspotModal: (id) => set({ activeHotspotId: id }),
  closeHotspotModal: () => set({ activeHotspotId: null }),
}));