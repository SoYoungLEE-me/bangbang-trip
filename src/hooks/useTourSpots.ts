import { useQuery } from "@tanstack/react-query";
import { getNearbyCourses, getPopularSpots, getFestivals } from "../services/tourApi";
import type { TourSpot, Festival } from "../models/tour";

// 주변 관광지 코스 조회 훅
export const useNearbyCourses = () => {
  return useQuery<TourSpot[]>({
    queryKey: ["nearbyCourses"],
    queryFn: getNearbyCourses,
    staleTime: 1000 * 60 * 10, // 10분간 캐시 유지
    retry: 0, // 재시도 비활성화 (에러 반복 방지)
    refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
  });
};

// 축제 정보 조회 훅
export const useFestivals = () => {
  return useQuery<Festival[]>({
    queryKey: ["festivals"],
    queryFn: getFestivals,
    staleTime: 1000 * 60 * 10,
    retry: 0,
    refetchOnWindowFocus: false,
  });
};

// 인기 관광지 조회 훅
export const usePopularSpots = () => {
  return useQuery<TourSpot[]>({
    queryKey: ["popularSpots"],
    queryFn: getPopularSpots,
    staleTime: 1000 * 60 * 10, // 10분간 캐시 유지
    retry: 0, // 재시도 비활성화 (에러 반복 방지)
    refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
  });
};