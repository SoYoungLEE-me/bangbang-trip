import { useQuery } from "@tanstack/react-query";
import { getSpotDetailCommon } from "../apis/tourDetailApi";
import type { SpotDetailCommonRequest } from "../models/tourDetail";

export const useTourSpotDetailCommon = (params: SpotDetailCommonRequest) => {
  return useQuery({
    queryKey: ["spot-detail-common", params.contentId],
    queryFn: () => getSpotDetailCommon(params),
    enabled: !!params.contentId, // contentId가 있을 때만
    staleTime: 1000 * 60 * 60,
    retry: 0,
  });
};
