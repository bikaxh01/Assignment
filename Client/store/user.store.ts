import { create } from "zustand";

export const useStore = create((set) => ({
  user: null,
  addUser: (userData:any) => set((state) => ({ user: userData })),

  logout: () => set({ bears: null }),
}));
