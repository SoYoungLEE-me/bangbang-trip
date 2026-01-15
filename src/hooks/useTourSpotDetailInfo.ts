import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getSpotDetailInfo } from "../apis/tourDetailApi";
import type {
  SpotDetailInfoRequest,
  SpotDetailInfoResponse,
} from "../models/tourDetail";

export const useTourSpotDetailInfo = (
  params: SpotDetailInfoRequest
): UseQueryResult<SpotDetailInfoResponse, Error> => {
  return useQuery({
    queryKey: ["spot-detail-info", params.contentId, params.contentTypeId],
    queryFn: () => getSpotDetailInfo(params),
    enabled: !!params.contentId && !!params.contentTypeId,
    staleTime: 1000 * 60 * 60,
    retry: 0,
  });
};
