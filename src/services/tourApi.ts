import { TOUR_API_KEY, TOUR_BASE_URL } from "../configs/env";
import type { TourApiResponse, TourSpot, Festival } from "../models/tour";

const getServiceKey = (): string => {
  return TOUR_API_KEY || "";
};

// arrange 대표이미지 있는 콘텐츠 우선 정렬: O=제목순, Q=수정일순, R=생성일순)

// 주변 관광지
export const getNearbyCourses = async (): Promise<TourSpot[]> => {
  const url = `${TOUR_BASE_URL}/areaBasedList2`;
  const serviceKey = getServiceKey();

  const otherParams = new URLSearchParams();
  otherParams.append("numOfRows", "10");
  otherParams.append("pageNo", "1");
  otherParams.append("MobileOS", "ETC");
  otherParams.append("MobileApp", "TourAPI");
  otherParams.append("arrange", "Q");
  otherParams.append("contentTypeId", "25");
  otherParams.append("_type", "json");

  const fullUrl = `${url}?ServiceKey=${serviceKey}&${otherParams.toString()}`;

  try {
    const response = await fetch(fullUrl);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API 호출 실패: ${response.status} - ${errorText.substring(0, 200)}`
      );
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

// 축제
export const getFestivals = async (): Promise<Festival[]> => {
  const url = `${TOUR_BASE_URL}/searchFestival2`;
  const serviceKey = getServiceKey();

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const eventStartDate = `${year}${month}${day}`;

  const nextMonth = new Date(year, today.getMonth() + 2, 0);
  const nextYear = nextMonth.getFullYear();
  const nextMonthStr = String(nextMonth.getMonth() + 1).padStart(2, "0");
  const nextDay = String(nextMonth.getDate()).padStart(2, "0");
  const eventEndDate = `${nextYear}${nextMonthStr}${nextDay}`;

  const params = new URLSearchParams();
  params.append("numOfRows", "8");
  params.append("pageNo", "1");
  params.append("arrange", "Q");
  params.append("MobileOS", "ETC");
  params.append("MobileApp", "TourAPI");
  params.append("eventStartDate", eventStartDate);
  params.append("eventEndDate", eventEndDate);
  params.append("_type", "json");

  const fullUrl = `${url}?ServiceKey=${serviceKey}&${params.toString()}`;

  try {
    const response = await fetch(fullUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API 응답 상태:", response.status);
      console.error("API 에러 응답:", errorText);
      throw new Error(
        `API 호출 실패: ${response.status} - ${errorText.substring(0, 200)}`
      );
    }

    const responseText = await response.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("JSON 파싱 실패:", parseError);
      console.error("응답 전체:", responseText);
      throw new Error("API 응답이 JSON 형식이 아닙니다.");
    }

    if (data.resultCode && data.resultCode !== "0000") {
      console.error("API 에러:", data.resultMsg);
      throw new Error(data.resultMsg || "API 호출 실패");
    }

    if (!data.response) {
      console.error("응답에 response 필드가 없습니다. 전체 응답:", data);
      throw new Error("API 응답 구조가 예상과 다릅니다.");
    }

    if (data.response.header.resultCode !== "0000") {
      throw new Error(data.response.header.resultMsg);
    }

    const items = data.response.body.items.item;
    const result = Array.isArray(items) ? items : [items];

    return result;
  } catch (error) {
    console.error("축제 API 호출 오류:", error);
    throw error;
  }
};

// 인기 관광지
export const getPopularSpots = async (): Promise<TourSpot[]> => {
  const url = `${TOUR_BASE_URL}/areaBasedList2`;
  const serviceKey = getServiceKey();

  const otherParams = new URLSearchParams();
  otherParams.append("numOfRows", "8");
  otherParams.append("pageNo", "1");
  otherParams.append("arrange", "Q");
  otherParams.append("MobileOS", "ETC");
  otherParams.append("MobileApp", "TourAPI");
  otherParams.append("contentTypeId", "12");
  otherParams.append("_type", "json");

  const fullUrl = `${url}?ServiceKey=${serviceKey}&${otherParams.toString()}`;

  try {
    const response = await fetch(fullUrl);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API 호출 실패: ${response.status} - ${errorText.substring(0, 200)}`
      );
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