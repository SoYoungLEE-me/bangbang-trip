import axios from "axios";
import { TOUR_API_KEY, TOUR_BASE_URL } from "../configs/env";
import type { SpotApiResponse } from "../models/spot";

interface GetSpotsParams {
  pageParam: number;
  areaCode?: string;
  sigunguCode?: string;
  contentTypeId?: string;
  mapX?: string;
  mapY?: string;
  radius?: string;
  keyword?: string;
}

export const getReginalSpots = async ({
  pageParam,
  areaCode,
  sigunguCode,
  contentTypeId,
}: GetSpotsParams): Promise<SpotApiResponse> => {
  const response = await axios.get(
    `${TOUR_BASE_URL}/areaBasedList2?numOfRows=12&pageNo=${pageParam}&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${TOUR_API_KEY}&arrange=C&contentTypeId=${contentTypeId}&areaCode=${
      areaCode === "0" ? "" : areaCode
    }&sigunguCode=${sigunguCode === "0" ? "" : sigunguCode}&cat1=&cat2=&cat3=&_type=json`
  );

  return response.data;
};

export const getNearbySpots = async ({
  pageParam,
  contentTypeId,
  mapX,
  mapY,
  radius,
}: GetSpotsParams): Promise<SpotApiResponse> => {
  const response = await axios.get(
    `http://apis.data.go.kr/B551011/KorService2/locationBasedList2?ServiceKey=${TOUR_API_KEY}&contentTypeId=${contentTypeId}&mapX=${mapX}&mapY=${mapY}&radius=${radius}&MobileOS=ETC&MobileApp=AppTest&arrange=C&numOfRows=12&pageNo=${pageParam}&_type=json`
  );

  return response.data;
};

export const getSearchSpots = async ({ pageParam, keyword }: GetSpotsParams): Promise<SpotApiResponse> => {
  const response = await axios.get(
    `http://apis.data.go.kr/B551011/KorService2/searchKeyword2?numOfRows=12&pageNo=${pageParam}&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${TOUR_API_KEY}&arrange=C&areaCode=&sigunguCode=&cat1=&cat2=&cat3=&keyword=${keyword}&_type=json`
  );

  return response.data;
};
