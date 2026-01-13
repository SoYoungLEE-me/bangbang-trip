import { TOUR_API_KEY } from "../configs/env";
import type { TourApiResponse, TourSpot } from "../models/tour";

const getServiceKey = (): string => {
  return TOUR_API_KEY || "";
};

export const getPopularSpots = async (): Promise<TourSpot[]> => {
  const url = `/api/tour/areaBasedList2`;
  const serviceKey = getServiceKey();
  
  const otherParams = new URLSearchParams();
  otherParams.append("numOfRows", "10");
  otherParams.append("pageNo", "1");
  otherParams.append("MobileOS", "ETC");
  otherParams.append("MobileApp", "TourAPI");
  otherParams.append("arrange", "P");
  otherParams.append("contentTypeId", "12");
  otherParams.append("_type", "json");
  
  const fullUrl = `${url}?ServiceKey=${serviceKey}&${otherParams.toString()}`;

  try {
    const response = await fetch(fullUrl);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API 호출 실패: ${response.status} - ${errorText.substring(0, 200)}`);
    }
    
    const data: TourApiResponse = await response.json();
    
    if (data.response.header.resultCode !== "0000") {
      throw new Error(data.response.header.resultMsg);
    }
    
    const items = data.response.body.items.item;
    return Array.isArray(items) ? items : [items];
  } catch (error) {
    console.error("Tour API 호출 오류:", error);
    throw error;
  }
};

export const getNearbyCourses = async (): Promise<TourSpot[]> => {
  const url = `/api/tour/areaBasedList2`;
  const serviceKey = getServiceKey();
  
  const otherParams = new URLSearchParams();
  otherParams.append("numOfRows", "8");
  otherParams.append("pageNo", "1");
  otherParams.append("MobileOS", "ETC");
  otherParams.append("MobileApp", "TourAPI");
  otherParams.append("arrange", "A");
  otherParams.append("contentTypeId", "25");
  otherParams.append("_type", "json");
  
  const fullUrl = `${url}?ServiceKey=${serviceKey}&${otherParams.toString()}`;

  try {
    const response = await fetch(fullUrl);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API 호출 실패: ${response.status} - ${errorText.substring(0, 200)}`);
    }
    
    const data: TourApiResponse = await response.json();
    
    if (data.response.header.resultCode !== "0000") {
      throw new Error(data.response.header.resultMsg);
    }
    
    const items = data.response.body.items.item;
    return Array.isArray(items) ? items : [items];
  } catch (error) {
    console.error("Tour API 호출 오류:", error);
    throw error;
  }
};