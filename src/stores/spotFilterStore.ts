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

  setTouristType: (type: string) => void;
  setArea: (area: string) => void;
  setSigungu: (sigungu: string) => void;
  setRadius: (radius: string) => void;
  setLocation: (mapX: string, mapY: string) => void;
  setIsNearbyMode: (isNearby: boolean) => void;
  setKeyword: (keyword: string) => void;
  setErrorMessage: (message: string) => void;

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
};

export const useSpotFilterStore = create<SpotFilterState>((set) => ({
  ...initialState,

  setKeyword: (keyword) =>
    set({
      ...initialState,
      keyword,
      isNearbyMode: false,
    }),

  setTouristType: (type) =>
    set({
      selectedTouristType: type,
    }),

  setArea: (area) =>
    set({
      selectedArea: area,
      selectedSigungu: initialState.selectedSigungu,
      keyword: initialState.keyword,
      isNearbyMode: false,
    }),

  setSigungu: (sigungu) =>
    set({
      selectedSigungu: sigungu,
      keyword: "",
    }),

  setRadius: (radius) =>
    set({
      selectedRadius: radius,
      isNearbyMode: true,
      selectedArea: initialState.selectedArea,
      selectedSigungu: initialState.selectedSigungu,
      keyword: initialState.keyword,
    }),

  setLocation: (mapX, mapY) =>
    set({
      mapX,
      mapY,
    }),

  setIsNearbyMode: (isNearby) =>
    set((state) => ({
      isNearbyMode: isNearby,
      keyword: isNearby ? "" : state.keyword,
    })),

  setErrorMessage: (message) => set({ errorMessage: message }),

  resetFilters: () =>
    set({
      ...initialState,
    }),
}));
