import axios from "axios";
import { TOUR_API_KEY, TOUR_BASE_URL } from "../configs/env";
import type { AreaCodeApiResponse } from "../models/areaCode";

export const getAreaCodes = async (): Promise<AreaCodeApiResponse> => {
  const firstResponse = await axios.get(
    `${TOUR_BASE_URL}/areaCode2?MobileOS=ETC&MobileApp=AppTest&numOfRows=1&_type=json&serviceKey=${TOUR_API_KEY}`
  );

  const totalCount = firstResponse.data.response.body.totalCount;

  const finalResponse = await axios.get(
    `${TOUR_BASE_URL}/areaCode2?MobileOS=ETC&MobileApp=AppTest&numOfRows=${totalCount}&_type=json&serviceKey=${TOUR_API_KEY}`
  );

  return finalResponse.data;
};

export const getSigunguCodes = async (areaCode: string): Promise<AreaCodeApiResponse> => {
  const firstResponse = await axios.get(
    `${TOUR_BASE_URL}/areaCode2?MobileOS=ETC&MobileApp=AppTest&numOfRows=1&areaCode=${
      areaCode === "0" ? "" : areaCode
    }&_type=json&serviceKey=${TOUR_API_KEY}`
  );

  const totalCount = firstResponse.data.response.body.totalCount;

  const finalResponse = await axios.get(
    `${TOUR_BASE_URL}/areaCode2?MobileOS=ETC&MobileApp=AppTest&numOfRows=${totalCount}&areaCode=${
      areaCode === "0" ? "" : areaCode
    }&_type=json&serviceKey=${TOUR_API_KEY}`
  );

  return finalResponse.data;
};
