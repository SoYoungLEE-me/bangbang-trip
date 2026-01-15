// 공통 타입
interface BaseApiResponse<T> {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: T[];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

interface BaseRequest {
  numOfRows?: number;
  pageNo?: number;
}

// ContentType 상수
export const CONTENT_TYPE = {
  TOURIST_SPOT: "12", // 관광지
  CULTURE: "14", // 문화시설
  FESTIVAL: "15", // 축제공연행사
  TOUR_COURSE: "25", // 여행코스
  LEPORTS: "28", // 레포츠
  LODGING: "32", // 숙박
  SHOPPING: "38", // 쇼핑
  RESTAURANT: "39", // 음식점
} as const;

export type ContentTypeId = (typeof CONTENT_TYPE)[keyof typeof CONTENT_TYPE];

// ============================================
// 공통 정보 조회
// ============================================
export interface SpotDetailCommonRequest extends BaseRequest {
  contentId: string;
}

export interface SpotDetailCommonItem {
  contentid: string;
  contenttypeid: string;
  title: string;
  createdtime: string;
  modifiedtime: string;
  tel: string;
  telname: string;
  homepage: string;
  firstimage: string;
  firstimage2: string;
  cpyrhtDivCd: string;
  areacode: string;
  sigungucode: string;
  lDongRegnCd: string;
  lDongSignguCd: string;
  lclsSystm1: string;
  lclsSystm2: string;
  lclsSystm3: string;
  cat1: string;
  cat2: string;
  cat3: string;
  addr1: string;
  addr2: string;
  zipcode: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  overview: string;
}

export type SpotDetailCommonResponse = BaseApiResponse<SpotDetailCommonItem>;

// ============================================
// 반복 정보 조회
// ============================================
export interface SpotDetailInfoRequest extends BaseRequest {
  contentId: string;
  contentTypeId: string;
}

// 기본 필드
interface BaseInfoItem {
  contentid: string;
  contenttypeid: string;
  serialnum: string;
  infoname: string;
  infotext: string;
  fldgubun: string;
}

// 여행코스 정보
interface TourCourseInfoItem extends BaseInfoItem {
  contenttypeid: "25";
  subcontentid?: string;
  subdetailalt?: string;
  subdetailimg?: string;
  subdetailoverview?: string;
  subname?: string;
  subnum?: string;
}

// 숙박 객실 정보
interface LodgingRoomInfoItem extends BaseInfoItem {
  contenttypeid: "32";
  roomcode?: string;
  roomtitle?: string;
  roomsize1?: string;
  roomsize2?: string;
  roomcount?: string;
  roombasecount?: string;
  roommaxcount?: string;
  roomoffseasonminfee1?: string;
  roomoffseasonminfee2?: string;
  roompeakseasonminfee1?: string;
  roompeakseasonminfee2?: string;
  roomintro?: string;
  roombathfacility?: string;
  roombath?: string;
  roomhometheater?: string;
  roomaircondition?: string;
  roomtv?: string;
  roompc?: string;
  roomcable?: string;
  roominternet?: string;
  roomrefrigerator?: string;
  roomtoiletries?: string;
  roomsofa?: string;
  roomcook?: string;
  roomtable?: string;
  roomhairdryer?: string;
  roomimg1?: string;
  roomimg1alt?: string;
  cpyrhtDivCd1?: string;
  roomimg2?: string;
  roomimg2alt?: string;
  cpyrhtDivCd2?: string;
  roomimg3?: string;
  roomimg3alt?: string;
  cpyrhtDivCd3?: string;
  roomimg4?: string;
  roomimg4alt?: string;
  cpyrhtDivCd4?: string;
  roomimg5?: string;
  roomimg5alt?: string;
  cpyrhtDivCd5?: string;
}

// 기타 타입 (관광지, 문화시설 등)
interface GeneralInfoItem extends BaseInfoItem {
  contenttypeid: "12" | "14" | "15" | "28" | "38" | "39";
}

// Union으로 결합
export type SpotDetailInfoItem =
  | TourCourseInfoItem
  | LodgingRoomInfoItem
  | GeneralInfoItem;

export type SpotDetailInfoResponse = BaseApiResponse<SpotDetailInfoItem>;

// ============================================
// 소개 정보 조회 (Discriminated Union)
// ============================================
export interface SpotDetailIntroRequest extends BaseRequest {
  contentId: string;
  contentTypeId: string;
}

// 관광지(12)
export interface TouristSpotIntro {
  contentid: string;
  contenttypeid: "12";
  accomcount?: string;
  chkbabycarriage?: string;
  chkcreditcard?: string;
  chkpet?: string;
  expagerange?: string;
  expguide?: string;
  heritage1?: string;
  heritage2?: string;
  heritage3?: string;
  infocenter?: string;
  opendate?: string;
  parking?: string;
  restdate?: string;
  useseason?: string;
  usetime?: string;
}

// 문화시설(14)
export interface CultureFacilityIntro {
  contentid: string;
  contenttypeid: "14";
  accomcountculture?: string;
  chkbabycarriageculture?: string;
  chkcreditcardculture?: string;
  chkpetculture?: string;
  discountinfo?: string;
  infocenterculture?: string;
  parkingculture?: string;
  parkingfee?: string;
  restdateculture?: string;
  usefee?: string;
  usetimeculture?: string;
  scale?: string;
  spendtime?: string;
}

// 축제/공연/행사(15)
export interface FestivalIntro {
  contentid: string;
  contenttypeid: "15";
  agelimit?: string;
  bookingplace?: string;
  discountinfofestival?: string;
  eventenddate?: string;
  eventhomepage?: string;
  eventplace?: string;
  eventstartdate?: string;
  festivalgrade?: string;
  placeinfo?: string;
  playtime?: string;
  program?: string;
  spendtimefestival?: string;
  sponsor1?: string;
  sponsor1tel?: string;
  sponsor2?: string;
  sponsor2tel?: string;
  subevent?: string;
  usetimefestival?: string;
}

// 여행코스(25)
export interface TourCourseIntro {
  contentid: string;
  contenttypeid: "25";
  distance?: string;
  infocentertourcourse?: string;
  schedule?: string;
  taketime?: string;
  theme?: string;
}

// 레포츠(28)
export interface LeportsIntro {
  contentid: string;
  contenttypeid: "28";
  accomcountleports?: string;
  chkbabycarriageleports?: string;
  chkcreditcardleports?: string;
  chkpetleports?: string;
  expagerangeleports?: string;
  infocenterleports?: string;
  openperiod?: string;
  parkingfeeleports?: string;
  parkingleports?: string;
  reservation?: string;
  restdateleports?: string;
  scaleleports?: string;
  usefeeleports?: string;
  usetimeleports?: string;
}

// 숙박(32)
export interface LodgingIntro {
  contentid: string;
  contenttypeid: "32";
  accomcountlodging?: string;
  benikia?: string;
  checkintime?: string;
  checkouttime?: string;
  chkcooking?: string;
  foodplace?: string;
  goodstay?: string;
  hanok?: string;
  infocenterlodging?: string;
  parkinglodging?: string;
  pickup?: string;
  roomcount?: string;
  reservationlodging?: string;
  reservationurl?: string;
  roomtype?: string;
  scalelodging?: string;
  subfacility?: string;
  barbecue?: string;
  beauty?: string;
  beverage?: string;
  bicycle?: string;
  campfire?: string;
  fitness?: string;
  karaoke?: string;
  publicbath?: string;
  publicpc?: string;
  sauna?: string;
  seminar?: string;
  sports?: string;
  refundregulation?: string;
}

// 쇼핑(38)
export interface ShoppingIntro {
  contentid: string;
  contenttypeid: "38";
  chkbabycarriageshopping?: string;
  chkcreditcardshopping?: string;
  chkpetshopping?: string;
  culturecenter?: string;
  fairday?: string;
  infocentershopping?: string;
  opendateshopping?: string;
  opentime?: string;
  parkingshopping?: string;
  restdateshopping?: string;
  restroom?: string;
  saleitem?: string;
  saleitemcost?: string;
  scaleshopping?: string;
  shopguide?: string;
}

// 음식점(39)
export interface RestaurantIntro {
  contentid: string;
  contenttypeid: "39";
  chkcreditcardfood?: string;
  discountinfofood?: string;
  firstmenu?: string;
  infocenterfood?: string;
  kidsfacility?: string;
  opendatefood?: string;
  opentimefood?: string;
  packing?: string;
  parkingfood?: string;
  reservationfood?: string;
  restdatefood?: string;
  scalefood?: string;
  seat?: string;
  smoking?: string;
  treatmenu?: string;
  lcnsno?: string;
}

// Discriminated Union으로 결합
export type SpotDetailIntroItem =
  | TouristSpotIntro
  | CultureFacilityIntro
  | FestivalIntro
  | TourCourseIntro
  | LeportsIntro
  | LodgingIntro
  | ShoppingIntro
  | RestaurantIntro;

export type SpotDetailIntroResponse = BaseApiResponse<SpotDetailIntroItem>;

// ============================================
// 반려동물 동반 여행 정보
// ============================================
export interface SpotDetailPetTourRequest extends BaseRequest {
  contentId?: string;
}

export interface SpotDetailPetTourItem {
  contentid: string;
  acmpyPsblCpam: string;
  relaRntlPrdlst: string;
  acmpyNeedMtr: string;
  relaFrnshPrdlst: string;
  etcAcmpyInfo: string;
  relaPurcPrdlst: string;
  relaAcdntRiskMtr: string;
  acmpyTypeCd: string;
  relaPosesFclty: string;
  petTursmInfo: string;
}

export type SpotDetailPetTourResponse = BaseApiResponse<SpotDetailPetTourItem>;

// ============================================
// 이미지 정보 조회
// ============================================
export interface SpotDetailImageRequest extends BaseRequest {
  contentId: string;
  imageYN?: "Y" | "N"; // Y: 콘텐츠, N: 음식점 메뉴
}

export interface SpotDetailImageItem {
  contentid: string;
  originimgurl: string;
  imgname: string;
  smallimageurl: string;
  cpyrhtDivCd: string;
  serialnum: string;
}

export type SpotDetailImageResponse = BaseApiResponse<SpotDetailImageItem>;

// ============================================
// 타입 가드 함수들
// ============================================
export const isTouristSpot = (
  intro: SpotDetailIntroItem
): intro is TouristSpotIntro => {
  return intro.contenttypeid === "12";
};

export const isCultureFacility = (
  intro: SpotDetailIntroItem
): intro is CultureFacilityIntro => {
  return intro.contenttypeid === "14";
};

export const isFestival = (
  intro: SpotDetailIntroItem
): intro is FestivalIntro => {
  return intro.contenttypeid === "15";
};

export const isTourCourse = (
  intro: SpotDetailIntroItem
): intro is TourCourseIntro => {
  return intro.contenttypeid === "25";
};

export const isLeports = (
  intro: SpotDetailIntroItem
): intro is LeportsIntro => {
  return intro.contenttypeid === "28";
};

export const isLodging = (
  intro: SpotDetailIntroItem
): intro is LodgingIntro => {
  return intro.contenttypeid === "32";
};

export const isShopping = (
  intro: SpotDetailIntroItem
): intro is ShoppingIntro => {
  return intro.contenttypeid === "38";
};

export const isRestaurant = (
  intro: SpotDetailIntroItem
): intro is RestaurantIntro => {
  return intro.contenttypeid === "39";
};
