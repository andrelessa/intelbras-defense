import { create } from "zustand";

interface CentralsCountState {
  totalCentrals: number;
  updateTotalCentrals: (count: number) => void;
  incrementCount: () => void;
  decrementCount: () => void;
}

export const useCentralsCountStore = create<CentralsCountState>((set) => ({
  totalCentrals: 0,
  updateTotalCentrals: (count: number) => set({ totalCentrals: count }),
  incrementCount: () =>
    set((state) => ({ totalCentrals: state.totalCentrals + 1 })),
  decrementCount: () =>
    set((state) => ({ totalCentrals: Math.max(0, state.totalCentrals - 1) })),
}));
