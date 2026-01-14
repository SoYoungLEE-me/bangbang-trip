import { create } from "zustand";
import type { TourSpot } from "../models/tour";

interface SelectedSpotsState {
  selectedSpots: TourSpot[];
  toggleSpot: (spot: TourSpot) => void;
  removeSpot: (contentid: string) => void;
  clear: () => void;
}

export const useSelectedSpotsStore = create<SelectedSpotsState>((set, get) => ({
  selectedSpots: [],

  toggleSpot: (spot) => {
    const exists = get().selectedSpots.some(
      (s) => s.contentid === spot.contentid
    );

    set({
      selectedSpots: exists
        ? get().selectedSpots.filter((s) => s.contentid !== spot.contentid)
        : [...get().selectedSpots, spot],
    });
  },

  removeSpot: (contentid) =>
    set({
      selectedSpots: get().selectedSpots.filter(
        (s) => s.contentid !== contentid
      ),
    }),

  clear: () => set({ selectedSpots: [] }),
}));
