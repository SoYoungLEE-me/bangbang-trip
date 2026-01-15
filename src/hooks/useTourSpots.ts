import { useQuery } from "@tanstack/react-query";
import { getNearbyCourses, getPopularSpots, getFestivals } from "../services/tourApi";
import type { TourSpot, Festival } from "../models/tour";

// 주변 관광지 코스 조회 훅
export const useNearbyCourses = () => {
  return useQuery<TourSpot[]>({
    queryKey: ["nearbyCourses"],
    queryFn: getNearbyCourses,
    staleTime: 1000 * 60 * 30,
    retry: 0,
    refetchOnWindowFocus: false,
  });
};

// 축제 정보 조회 훅
export const useFestivals = () => {
  return useQuery<Festival[]>({
    queryKey: ["festivals"],
    queryFn: getFestivals,
    staleTime: 1000 * 60 * 30,
    retry: 0,
    refetchOnWindowFocus: false,
  });
};

// 인기 관광지 조회 훅
export const usePopularSpots = () => {
  return useQuery<TourSpot[]>({
    queryKey: ["popularSpots"],
    queryFn: getPopularSpots,
    staleTime: 1000 * 60 * 30,
    retry: 0,
    refetchOnWindowFocus: false,
  });
};