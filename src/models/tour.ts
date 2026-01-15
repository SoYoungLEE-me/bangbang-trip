// 한국관광공사 Tour API 응답 타입
export interface TourSpot {
  contentid: string;
  contenttypeid: string;
  title: string;
  addr1: string;
  addr2?: string;
  firstimage?: string;
  firstimage2?: string;
  mapx: string;
  mapy: string;
  tel?: string;
  overview?: string;
  areacode?: string;
  sigungucode?: string;
}

export interface TourApiResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: TourSpot | TourSpot[];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

export interface Festival {
  contentid: string;
  contenttypeid: string;
  title: string;
  addr1?: string;
  addr2?: string;
  firstimage?: string;
  firstimage2?: string;
  mapx?: string;
  mapy?: string;
  tel?: string;
  areacode?: string;
  sigungucode?: string;
  cat1?: string;
  cat2?: string;
  cat3?: string;
  createdtime?: string;
  modifiedtime?: string;
  eventstartdate?: string;
  eventenddate?: string;
  cpyrhtDivCd?: string;
  mlevel?: string;
}

export interface FestivalApiResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: Festival | Festival[];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}