import { useInfiniteQuery } from "@tanstack/react-query";
import { getNearbySpots, getReginalSpots, getSearchSpots } from "../apis/spotApi";
import type { SpotApiResponse } from "../models/spot";
import { useSpotFilterStore } from "../stores/spotFilterStore";

const useGetSpots = () => {
  const {
    selectedArea: areaCode,
    selectedSigungu: sigunguCode,
    selectedTouristType: contentTypeId,
    selectedRadius: radius,
    mapX,
    mapY,
    isNearbyMode,
    keyword,
  } = useSpotFilterStore();

  const isSearchMode = !!keyword;

  const queryInfo = useInfiniteQuery({
    queryKey: isSearchMode
      ? ["search-spots", keyword]
      : isNearbyMode
      ? ["nearby-spots", contentTypeId, radius, mapX, mapY]
      : ["reginal-spots", areaCode, sigunguCode, contentTypeId],
    queryFn: ({ pageParam }) => {
      if (isSearchMode) {
        return getSearchSpots({ pageParam, keyword });
      }

      if (isNearbyMode && mapX && mapY) {
        return getNearbySpots({ pageParam, contentTypeId, radius, mapX, mapY });
      }

      return getReginalSpots({ pageParam, areaCode, sigunguCode, contentTypeId });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const body = lastPage.response?.body;

      if (!body || body.totalCount === 0 || body.items === "") {
        return undefined;
      }

      const { pageNo, numOfRows, totalCount } = body;

      const isLastPage = pageNo * numOfRows >= totalCount;
      return isLastPage ? undefined : pageNo + 1;
    },
    staleTime: 1000 * 60 * 60,
    enabled: isSearchMode ? true : isNearbyMode ? !!(mapX && mapY) : true,
  });

  const flatData =
    queryInfo.data?.pages.flatMap((page: SpotApiResponse) => {
      const body = page.response?.body;
      if (!body || !body.items || typeof body.items === "string") {
        return [];
      }

      const itemData = body.items.item;

      if (!itemData) return [];

      if (!Array.isArray(itemData)) {
        return [itemData];
      }

      return itemData;
    }) ?? [];

  return {
    ...queryInfo,
    flatData,
  };
};

export default useGetSpots;
