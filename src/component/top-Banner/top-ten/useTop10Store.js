import { create } from "zustand";

export const useTop10Store = create((set) => ({
  activeId: null,
  setActiveId: (id) => set({ activeId: id }),
}));

export default useTop10Store;