import { create } from "zustand";
import type { UserPlannerFormValue } from "../models/aiPlanner";

interface PlannerFormStore {
  plannerForm: UserPlannerFormValue;
  setPlannerForm: (value: UserPlannerFormValue) => void;
  resetPlannerForm: () => void;
}

const initialState: UserPlannerFormValue = {
  startDate: "",
  endDate: "",
  companions: "혼자만의 여행",
  peopleCount: 1,
  mood: "힐링과 휴식",
};

export const usePlannerFormStore = create<PlannerFormStore>((set) => ({
  plannerForm: initialState,
  setPlannerForm: (value) => set({ plannerForm: value }),
  resetPlannerForm: () => set({ plannerForm: initialState }),
}));
