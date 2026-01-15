import { useInfiniteQuery } from "@tanstack/react-query";
import { getReginalSpots } from "../apis/spotApi";
import type { SpotApiResponse } from "../models/spot";

interface UseGetSpotsProps {
  areaCode?: string;
  sigunguCode?: string;
  contentTypeId: string;
}

const useGetSpots = ({ areaCode, sigunguCode, contentTypeId }: UseGetSpotsProps) => {
  const queryInfo = useInfiniteQuery({
    queryKey: ["reginal-spots", areaCode, sigunguCode, contentTypeId],
    queryFn: ({ pageParam }) => getReginalSpots({ pageParam, areaCode, sigunguCode, contentTypeId }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const body = lastPage.response?.body;

      if (!body || body.totalCount === 0) {
        return undefined;
      }

      const { pageNo, numOfRows, totalCount } = body;

      const isLastPage = pageNo * numOfRows >= totalCount;

      return isLastPage ? undefined : pageNo + 1;
    },
    staleTime: 1000 * 60 * 60,
  });

  const flatData =
    queryInfo.data?.pages.flatMap((page: SpotApiResponse) => {
      const items = page.response?.body?.items;

      if (!items || !("item" in items) || !items.item) {
        return [];
      }

      return items.item;
    }) ?? [];

  return {
    ...queryInfo,
    flatData,
  };
};

export default useGetSpots;
