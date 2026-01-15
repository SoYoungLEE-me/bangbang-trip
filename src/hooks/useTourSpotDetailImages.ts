import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getSpotDetailImage } from "../apis/tourDetailApi";
import type {
  SpotDetailImageRequest,
  SpotDetailImageResponse,
} from "../models/tourDetail";

export const useTourSpotDetailImage = (
  params: SpotDetailImageRequest
): UseQueryResult<SpotDetailImageResponse, Error> => {
  return useQuery({
    queryKey: ["spot-detail-image", params.contentId, params.imageYN],
    queryFn: () => getSpotDetailImage(params),
    enabled: !!params.contentId,
    staleTime: 1000 * 60 * 60,
    retry: 0,
  });
};
