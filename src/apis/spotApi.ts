import axios from "axios";
import { TOUR_API_KEY, TOUR_BASE_URL } from "../configs/env";
import type { SpotApiResponse } from "../models/spot";

interface GetSpotsParams {
  pageParam: number;
  areaCode?: string;
  sigunguCode?: string;
  contentTypeId: string;
}

export const getReginalSpots = async ({
  pageParam,
  areaCode,
  sigunguCode,
  contentTypeId,
}: GetSpotsParams): Promise<SpotApiResponse> => {
  const response = await axios.get(`${TOUR_BASE_URL}/areaBasedList2`, {
    params: {
      numOfRows: 12,
      pageNo: pageParam,
      MobileOS: "ETC",
      MobileApp: "AppTest",
      ServiceKey: TOUR_API_KEY,
      arrange: "A",
      contentTypeId: contentTypeId,
      areaCode: areaCode || "",
      sigunguCode: sigunguCode || "",
      _type: "json",
    },
  });

  return response.data;
};

export const getNearbySpots = async (pageParam: number) => {
  const response = await axios.get(
    `${TOUR_BASE_URL}/locationBasedList2?ServiceKey=${TOUR_API_KEY}&contentTypeId=12&mapX=127.0449237&mapY=37.579886&radius=2000&MobileOS=ETC&MobileApp=AppTest&arrange=A&numOfRows=12&pageNo=${pageParam}&_type=json`
  );

  return response.data;
};
