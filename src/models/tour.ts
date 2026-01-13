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