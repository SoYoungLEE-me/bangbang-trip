import { useQuery } from "@tanstack/react-query";
import { getAreaCodes } from "../apis/areaCodeApi";

const useGetAreaCodes = () => {
  return useQuery({
    queryKey: ["area-codes"],
    queryFn: () => getAreaCodes(),
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
  });
};

export default useGetAreaCodes;
