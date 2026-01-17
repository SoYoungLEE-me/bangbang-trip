import { useQuery } from "@tanstack/react-query";
import { getSigunguCodes } from "../apis/areaCodeApi";
import { useSpotFilterStore } from "../stores/spotFilterStore";

const useGetSigunguCodes = () => {
  const { selectedArea: areaCode } = useSpotFilterStore();

  return useQuery({
    queryKey: ["sigungu-codes", areaCode],
    queryFn: () => getSigunguCodes(areaCode),
    select: (result) => {
      const items = result.response.body.items;

      if (!items || typeof items === "string") {
        return [];
      }

      if (!items.item) {
        return [];
      }

      return Array.isArray(items.item) ? items.item : [items.item];
    },
    staleTime: Infinity,
    enabled: !!areaCode && areaCode !== "0",
  });
};

export default useGetSigunguCodes;
