import axios from "axios";
import type { SpotResponse } from "../models/spot";
import { TOUR_API_KEY, TOUR_BASE_URL } from "../configs/env";

export const getReginalSpots = async (pageParam: number): Promise<SpotResponse> => {
  const response = await axios.get(
    `${TOUR_BASE_URL}/areaBasedList2?numOfRows=12&pageNo=${pageParam}&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${TOUR_API_KEY}&arrange=A&contentTypeId=12&areaCode=&sigunguCode=&cat1=&cat2=&cat3=&_type=json`
  );

  return response.data;
};

export const getNearbySpots = async (pageParam: number) => {
  const response = await axios.get(
    `${TOUR_BASE_URL}/locationBasedList2?ServiceKey=${TOUR_API_KEY}&contentTypeId=12&mapX=127.0449237&mapY=37.579886&radius=2000&MobileOS=ETC&MobileApp=AppTest&arrange=A&numOfRows=12&pageNo=${pageParam}&_type=json`
  );

  return response.data;
};
