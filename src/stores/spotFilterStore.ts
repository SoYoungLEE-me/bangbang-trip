import { create } from "zustand";

interface SpotFilterState {
  selectedTouristType: string;
  selectedArea: string;
  selectedSigungu: string;
  selectedRadius: string;
  mapX: string;
  mapY: string;
  isNearbyMode: boolean;
  keyword: string;
  errorMessage: string;
  isRegionalFilterActive: boolean;
  isNearbyFilterActive: boolean;

  setTouristType: (type: string) => void;
  setArea: (area: string) => void;
  setSigungu: (sigungu: string) => void;
  setRadius: (radius: string) => void;
  setLocation: (mapX: string, mapY: string) => void;
  setIsNearbyMode: (isNearby: boolean) => void;
  setKeyword: (keyword: string) => void;
  setErrorMessage: (message: string) => void;
  setIsRegionalFilterActive: (isActive: boolean) => void;
  setIsNearbyFilterActive: (isActive: boolean) => void;
  resetFilters: () => void;
}

const initialState = {
  selectedTouristType: "12",
  selectedArea: "0",
  selectedSigungu: "0",
  selectedRadius: "1000",
  isNearbyMode: false,
  keyword: "",
  mapX: "",
  mapY: "",
  errorMessage: "",
  isRegionalFilterActive: false,
  isNearbyFilterActive: false,
};

export const useSpotFilterStore = create<SpotFilterState>((set) => ({
  ...initialState,

  setKeyword: (keyword) => set({ selectedTouristType: "12", keyword, isNearbyMode: false }),

  setTouristType: (type) => set({ selectedTouristType: type }),

  setArea: (area) => set({ selectedArea: area }),

  setSigungu: (sigungu) => set({ selectedSigungu: sigungu }),

  setRadius: (radius) => set({ selectedRadius: radius }),

  setLocation: (mapX, mapY) => set({ mapX, mapY }),

  setIsNearbyMode: (isNearby) => set({ isNearbyMode: isNearby }),

  setErrorMessage: (message) => set({ errorMessage: message }),

  setIsRegionalFilterActive: (isActive) => set({ isRegionalFilterActive: isActive }),
  setIsNearbyFilterActive: (isActive) => set({ isNearbyFilterActive: isActive }),

  resetFilters: () => set({ ...initialState }),
}));
