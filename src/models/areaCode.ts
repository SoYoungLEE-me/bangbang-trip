export interface AreaCodeApiResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: { item?: AreaCodeItem[] | AreaCodeItem } | "" | string;
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

export interface AreaCodeItem {
  rnum: number;
  code: string;
  name: string;
}
