import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getSpotDetailIntro } from "../apis/tourDetailApi";
import type {
  SpotDetailIntroRequest,
  SpotDetailIntroResponse,
} from "../models/tourDetail";

export const useTourSpotDetailIntro = (
  params: SpotDetailIntroRequest
): UseQueryResult<SpotDetailIntroResponse, Error> => {
  return useQuery({
    queryKey: ["spot-detail-intro", params.contentId, params.contentTypeId],
    queryFn: () => getSpotDetailIntro(params),
    enabled: !!params.contentId && !!params.contentTypeId,
    staleTime: 1000 * 60 * 60,
    retry: 0,
  });
};
