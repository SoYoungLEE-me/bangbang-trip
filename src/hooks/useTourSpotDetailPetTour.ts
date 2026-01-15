import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getSpotDetailPetTour } from "../apis/tourDetailApi";
import type {
  SpotDetailPetTourRequest,
  SpotDetailPetTourResponse,
} from "../models/tourDetail";

export const useTourSpotDetailPetTour = (
  params: SpotDetailPetTourRequest
): UseQueryResult<SpotDetailPetTourResponse, Error> => {
  return useQuery({
    queryKey: ["spot-detail-pet-tour", params.contentId],
    queryFn: () => getSpotDetailPetTour(params),
    staleTime: 1000 * 60 * 60,
    retry: 0,
  });
};
