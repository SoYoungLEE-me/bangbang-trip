import axios from "axios";
import { TOUR_API_KEY, TOUR_BASE_URL } from "../configs/env";
import type { AreaCodeApiResponse } from "../models/areaCode";

export const getAreaCodes = async (): Promise<AreaCodeApiResponse> => {
  const response = await axios.get(
    `${TOUR_BASE_URL}/areaCode2?MobileOS=ETC&MobileApp=AppTest&numOfRows=100&_type=json&serviceKey=${TOUR_API_KEY}`
  );

  const header = response.data?.response?.header;

  if (header && header.resultCode !== "0000" && header.resultCode !== "00") {
    throw new Error(`[${header.resultCode}] ${header.resultMsg}`);
  }

  return response.data;
};

export const getSigunguCodes = async (areaCode: string): Promise<AreaCodeApiResponse> => {
  const response = await axios.get(
    `${TOUR_BASE_URL}/areaCode2?MobileOS=ETC&MobileApp=AppTest&numOfRows=100&areaCode=${
      areaCode === "0" ? "" : areaCode
    }&_type=json&serviceKey=${TOUR_API_KEY}`
  );

  const header = response.data?.response?.header;

  if (header && header.resultCode !== "0000" && header.resultCode !== "00") {
    throw new Error(`[${header.resultCode}] ${header.resultMsg}`);
  }

  return response.data;
};
