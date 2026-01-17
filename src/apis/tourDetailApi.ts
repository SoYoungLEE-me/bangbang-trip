import { TOUR_API_KEY, TOUR_BASE_URL } from "../configs/env";
import type {
  SpotDetailCommonRequest,
  SpotDetailCommonResponse,
  SpotDetailImageRequest,
  SpotDetailImageResponse,
  SpotDetailInfoRequest,
  SpotDetailInfoResponse,
  SpotDetailIntroRequest,
  SpotDetailIntroResponse,
  SpotDetailPetTourRequest,
  SpotDetailPetTourResponse,
} from "../models/tourDetail";

export const getSpotDetailCommon = async (
  params: SpotDetailCommonRequest,
): Promise<SpotDetailCommonResponse> => {
  const { contentId, numOfRows = 10, pageNo = 1 } = params;

  const url = new URL(`${TOUR_BASE_URL}/detailCommon2`);

  const otherParams = new URLSearchParams();
  otherParams.append("ServiceKey", TOUR_API_KEY);
  otherParams.append("contentId", contentId);
  otherParams.append("MobileOS", "ETC");
  otherParams.append("MobileApp", "AppTest");
  otherParams.append("pageNo", String(pageNo));
  otherParams.append("numOfRows", String(numOfRows));
  otherParams.append("_type", "json");

  const fullUrl = `${url}?ServiceKey=${TOUR_API_KEY}&${otherParams.toString()}`;

  const response = await fetch(fullUrl.toString());

  if (!response.ok) {
    throw new Error("관광정보 상세 조회 실패");
  }

  return response.json();
};

export const getSpotDetailInfo = async (
  params: SpotDetailInfoRequest,
): Promise<SpotDetailInfoResponse> => {
  const { contentId, contentTypeId, numOfRows = 10, pageNo = 1 } = params;

  const baseUrl = `${TOUR_BASE_URL}/detailInfo2`;

  const queryParams = new URLSearchParams();
  queryParams.append("contentId", contentId);
  queryParams.append("contentTypeId", contentTypeId);
  queryParams.append("MobileOS", "ETC");
  queryParams.append("MobileApp", "AppTest");
  queryParams.append("pageNo", String(pageNo));
  queryParams.append("numOfRows", String(numOfRows));
  queryParams.append("_type", "json");

  const fullUrl = `${baseUrl}?ServiceKey=${TOUR_API_KEY}&${queryParams.toString()}`;

  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error("관광정보 상세 반복정보 조회 실패");
  }

  return response.json();
};

export const getSpotDetailIntro = async (
  params: SpotDetailIntroRequest,
): Promise<SpotDetailIntroResponse> => {
  const { contentId, contentTypeId, numOfRows = 10, pageNo = 1 } = params;

  const baseUrl = `${TOUR_BASE_URL}/detailIntro2`;

  const queryParams = new URLSearchParams();
  queryParams.append("contentId", contentId);
  queryParams.append("contentTypeId", contentTypeId);
  queryParams.append("MobileOS", "ETC");
  queryParams.append("MobileApp", "AppTest");
  queryParams.append("pageNo", String(pageNo));
  queryParams.append("numOfRows", String(numOfRows));
  queryParams.append("_type", "json");

  const fullUrl = `${baseUrl}?ServiceKey=${TOUR_API_KEY}&${queryParams.toString()}`;

  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error("관광정보 소개정보 조회 실패");
  }

  return response.json();
};

export const getSpotDetailPetTour = async (
  params: SpotDetailPetTourRequest,
): Promise<SpotDetailPetTourResponse> => {
  const { contentId, numOfRows = 10, pageNo = 1 } = params;

  const baseUrl = `${TOUR_BASE_URL}/detailPetTour2`;

  const queryParams = new URLSearchParams();
  if (contentId) {
    queryParams.append("contentId", contentId);
  }
  queryParams.append("MobileOS", "ETC");
  queryParams.append("MobileApp", "AppTest");
  queryParams.append("pageNo", String(pageNo));
  queryParams.append("numOfRows", String(numOfRows));
  queryParams.append("_type", "json");

  const fullUrl = `${baseUrl}?ServiceKey=${TOUR_API_KEY}&${queryParams.toString()}`;

  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error("반려동물 동반 여행 정보 조회 실패");
  }

  return response.json();
};

export const getSpotDetailImage = async (
  params: SpotDetailImageRequest,
): Promise<SpotDetailImageResponse> => {
  const { contentId, imageYN = "Y", numOfRows = 10, pageNo = 1 } = params;

  const baseUrl = `${TOUR_BASE_URL}/detailImage2`;

  const queryParams = new URLSearchParams();
  queryParams.append("contentId", contentId);
  queryParams.append("imageYN", imageYN);
  queryParams.append("MobileOS", "ETC");
  queryParams.append("MobileApp", "AppTest");
  queryParams.append("pageNo", String(pageNo));
  queryParams.append("numOfRows", String(numOfRows));
  queryParams.append("_type", "json");

  const fullUrl = `${baseUrl}?ServiceKey=${TOUR_API_KEY}&${queryParams.toString()}`;

  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error("이미지 정보 조회 실패");
  }

  return response.json();
};
