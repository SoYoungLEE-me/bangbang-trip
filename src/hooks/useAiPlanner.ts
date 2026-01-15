import { useMutation } from "@tanstack/react-query";
import { requestAiPlanner } from "../apis/geminiApi";
import type { TourSpot } from "../models/tour";
import type { UserPlannerFormValue } from "../models/aiPlanner";

export const useAiPlanner = () => {
  return useMutation({
    mutationFn: ({
      spots,
      form,
    }: {
      spots: TourSpot[];
      form: UserPlannerFormValue;
    }) => requestAiPlanner(spots, form),
  });
};
