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
    `${TOUR_BASE_URL}/areaBasedList2?numOfRows=12&pageNo=${pageParam}&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${TOUR_API_KEY}&arrange=Q&contentTypeId=${contentTypeId}&areaCode=${
      areaCode === "0" ? "" : areaCode
    }&sigunguCode=${sigunguCode === "0" ? "" : sigunguCode}&cat1=&cat2=&cat3=&_type=json`
  );

  const header = response.data?.response?.header;

  if (header && header.resultCode !== "0000" && header.resultCode !== "00") {
    throw new Error(`[${header.resultCode}] ${header.resultMsg}`);
  }

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
    `http://apis.data.go.kr/B551011/KorService2/locationBasedList2?ServiceKey=${TOUR_API_KEY}&contentTypeId=${contentTypeId}&mapX=${mapX}&mapY=${mapY}&radius=${radius}&MobileOS=ETC&MobileApp=AppTest&arrange=Q&numOfRows=12&pageNo=${pageParam}&_type=json`
  );

  const header = response.data?.response?.header;

  if (header && header.resultCode !== "0000" && header.resultCode !== "00") {
    throw new Error(`[${header.resultCode}] ${header.resultMsg}`);
  }

  return response.data;
};

export const getSearchSpots = async ({
  pageParam,
  keyword,
  areaCode,
  sigunguCode,
}: GetSpotsParams): Promise<SpotApiResponse> => {
  const response = await axios.get(
    `http://apis.data.go.kr/B551011/KorService2/searchKeyword2?numOfRows=12&pageNo=${pageParam}&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${TOUR_API_KEY}&arrange=Q&areaCode=${areaCode === "0" ? "" : areaCode}&sigunguCode=${sigunguCode === "0" ? "" : sigunguCode}&cat1=&cat2=&cat3=&keyword=${keyword}&_type=json`
  );

  const header = response.data?.response?.header;

  if (header && header.resultCode !== "0000" && header.resultCode !== "00") {
    throw new Error(`[${header.resultCode}] ${header.resultMsg}`);
  }

  return response.data;
};

export const getOngoingFestivals = async ({
  pageParam,
  areaCode,
  sigunguCode,
}: GetSpotsParams): Promise<SpotApiResponse> => {
  const currentDate = new Date().toISOString().split("T")[0].replace(/-/g, "");

  const response = await axios.get(
    `${TOUR_BASE_URL}/searchFestival2?eventStartDate=${currentDate}&eventEndDate=&areaCode=${areaCode === "0" ? "" : areaCode}&sigunguCode=${sigunguCode === "0" ? "" : sigunguCode}&ServiceKey=${TOUR_API_KEY}&MobileOS=ETC&MobileApp=AppTest&arrange=Q&numOfRows=12&pageNo=${pageParam}&_type=json`
  );

  const header = response.data?.response?.header;

  if (header && header.resultCode !== "0000" && header.resultCode !== "00") {
    throw new Error(`[${header.resultCode}] ${header.resultMsg}`);
  }

  return response.data;
};
