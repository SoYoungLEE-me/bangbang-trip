import {
  Phone,
  Building,
  Calendar,
  Clock,
  ParkingCircle,
  Languages,
  Dog,
  Info,
} from "lucide-react";
import {
  isCultureFacility,
  isFestival,
  isLeports,
  isLodging,
  isRestaurant,
  isShopping,
  isTourCourse,
  isTouristSpot,
  type SpotDetailIntroItem,
} from "../../../models/tourDetail";
import { formatHtmlText } from "./formatters";
import { formatDateRange, formatTime } from "./formatters";

export const getIcon = (label: string = "") => {
  const iconStyle = { size: 18 };
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("문의") || lowerLabel.includes("전화"))
    return <Phone {...iconStyle} />;
  if (lowerLabel.includes("주소") || lowerLabel.includes("위치"))
    return <Building {...iconStyle} />;
  if (
    lowerLabel.includes("휴일") ||
    lowerLabel.includes("쉬는날") ||
    lowerLabel.includes("휴무") ||
    lowerLabel.includes("기간")
  )
    return <Calendar {...iconStyle} />;
  if (lowerLabel.includes("시간") || lowerLabel.includes("체크"))
    return <Clock {...iconStyle} />;
  if (lowerLabel.includes("주차")) return <ParkingCircle {...iconStyle} />;
  if (lowerLabel.includes("홈페이지")) return <Languages {...iconStyle} />;
  if (lowerLabel.includes("반려동물") || lowerLabel.includes("동반"))
    return <Dog {...iconStyle} />;
  return <Info {...iconStyle} />;
};

export const getIntroDetails = (introData?: SpotDetailIntroItem) => {
  if (!introData) return [];

  const details: Array<{
    label: string;
    value: string;
    isMultiline?: boolean;
  }> = [];

  // 관광지(12)
  if (isTouristSpot(introData)) {
    if (introData.infocenter)
      details.push({ label: "문의 및 안내", value: introData.infocenter });
    if (introData.restdate)
      details.push({
        label: "휴무일",
        value: formatHtmlText(introData.restdate),
        isMultiline: true,
      });
    if (introData.usetime)
      details.push({
        label: "이용시간",
        value: formatTime(formatHtmlText(introData.usetime)),
        isMultiline: true,
      });
    if (introData.parking)
      details.push({ label: "주차시설", value: introData.parking });
    if (introData.chkpet)
      details.push({ label: "반려동물 동반", value: introData.chkpet });
    if (introData.expguide)
      details.push({
        label: "체험안내",
        value: formatHtmlText(introData.expguide),
        isMultiline: true,
      });
  }

  // 문화시설(14)
  if (isCultureFacility(introData)) {
    if (introData.infocenterculture)
      details.push({
        label: "문의 및 안내",
        value: introData.infocenterculture,
      });
    if (introData.restdateculture)
      details.push({
        label: "휴무일",
        value: formatHtmlText(introData.restdateculture),
        isMultiline: true,
      });
    if (introData.usetimeculture)
      details.push({
        label: "이용시간",
        value: formatTime(formatHtmlText(introData.usetimeculture)),
        isMultiline: true,
      });
    if (introData.parkingculture)
      details.push({ label: "주차시설", value: introData.parkingculture });
    if (introData.usefee)
      details.push({
        label: "이용요금",
        value: formatHtmlText(introData.usefee),
        isMultiline: true,
      });
    if (introData.spendtime)
      details.push({ label: "관람소요시간", value: introData.spendtime });
  }

  // 축제/공연/행사(15)
  if (isFestival(introData)) {
    const contactTel = introData.sponsor1tel || introData.sponsor2tel;
    if (contactTel) details.push({ label: "문의 및 안내", value: contactTel });

    if (introData.eventstartdate && introData.eventenddate) {
      const formattedDateRange = formatDateRange(
        introData.eventstartdate,
        introData.eventenddate,
      );
      details.push({
        label: "행사 기간",
        value: formattedDateRange,
      });
    }

    if (introData.playtime)
      details.push({
        label: "공연시간",
        value: formatTime(formatHtmlText(introData.playtime)),
        isMultiline: true,
      });
    if (introData.eventplace)
      details.push({ label: "행사장소", value: introData.eventplace });
    if (introData.usetimefestival)
      details.push({
        label: "이용요금",
        value: formatHtmlText(introData.usetimefestival),
        isMultiline: true,
      });
    if (introData.program)
      details.push({
        label: "행사프로그램",
        value: formatHtmlText(introData.program),
        isMultiline: true,
      });
  }

  // 여행코스(25)
  if (isTourCourse(introData)) {
    if (introData.infocentertourcourse)
      details.push({
        label: "문의 및 안내",
        value: introData.infocentertourcourse,
      });
    if (introData.distance)
      details.push({ label: "코스 총거리", value: introData.distance });
    if (introData.taketime)
      details.push({ label: "소요시간", value: introData.taketime });
    if (introData.schedule)
      details.push({
        label: "코스 일정",
        value: formatHtmlText(introData.schedule),
        isMultiline: true,
      });
  }

  // 레포츠(28)
  if (isLeports(introData)) {
    if (introData.infocenterleports)
      details.push({
        label: "문의 및 안내",
        value: introData.infocenterleports,
      });
    if (introData.restdateleports)
      details.push({
        label: "휴무일",
        value: formatHtmlText(introData.restdateleports),
        isMultiline: true,
      });
    if (introData.usetimeleports)
      details.push({
        label: "이용시간",
        value: formatTime(formatHtmlText(introData.usetimeleports)),
        isMultiline: true,
      });
    if (introData.parkingleports)
      details.push({ label: "주차시설", value: introData.parkingleports });
    if (introData.usefeeleports)
      details.push({
        label: "입장료",
        value: formatHtmlText(introData.usefeeleports),
        isMultiline: true,
      });
    if (introData.reservation)
      details.push({
        label: "예약안내",
        value: formatHtmlText(introData.reservation),
        isMultiline: true,
      });
  }

  // 숙박(32)
  if (isLodging(introData)) {
    if (introData.infocenterlodging)
      details.push({
        label: "문의 및 안내",
        value: introData.infocenterlodging,
      });
    if (introData.checkintime)
      details.push({
        label: "체크인",
        value: formatTime(introData.checkintime),
      });
    if (introData.checkouttime)
      details.push({
        label: "체크아웃",
        value: formatTime(introData.checkouttime),
      });
    if (introData.parkinglodging)
      details.push({ label: "주차시설", value: introData.parkinglodging });
    if (introData.roomcount)
      details.push({ label: "객실수", value: introData.roomcount });
    if (introData.reservationurl)
      details.push({ label: "예약안내", value: introData.reservationurl });
    if (introData.subfacility)
      details.push({
        label: "부대시설",
        value: formatHtmlText(introData.subfacility),
        isMultiline: true,
      });
  }

  // 쇼핑(38)
  if (isShopping(introData)) {
    if (introData.infocentershopping)
      details.push({
        label: "문의 및 안내",
        value: introData.infocentershopping,
      });
    if (introData.restdateshopping)
      details.push({
        label: "휴무일",
        value: formatHtmlText(introData.restdateshopping),
        isMultiline: true,
      });
    if (introData.opentime)
      details.push({
        label: "영업시간",
        value: formatTime(formatHtmlText(introData.opentime)),
        isMultiline: true,
      });
    if (introData.parkingshopping)
      details.push({ label: "주차시설", value: introData.parkingshopping });
    if (introData.saleitem)
      details.push({
        label: "판매품목",
        value: formatHtmlText(introData.saleitem),
        isMultiline: true,
      });
    if (introData.shopguide)
      details.push({
        label: "매장안내",
        value: formatHtmlText(introData.shopguide),
        isMultiline: true,
      });
  }

  // 음식점(39)
  if (isRestaurant(introData)) {
    if (introData.infocenterfood)
      details.push({ label: "문의 및 안내", value: introData.infocenterfood });
    if (introData.restdatefood)
      details.push({
        label: "휴무일",
        value: formatHtmlText(introData.restdatefood),
        isMultiline: true,
      });
    if (introData.opentimefood)
      details.push({
        label: "영업시간",
        value: formatTime(formatHtmlText(introData.opentimefood)),
        isMultiline: true,
      });
    if (introData.parkingfood)
      details.push({ label: "주차시설", value: introData.parkingfood });
    if (introData.firstmenu)
      details.push({
        label: "대표메뉴",
        value: formatHtmlText(introData.firstmenu),
        isMultiline: true,
      });
    if (introData.treatmenu)
      details.push({
        label: "취급메뉴",
        value: formatHtmlText(introData.treatmenu),
        isMultiline: true,
      });
    if (introData.reservationfood)
      details.push({
        label: "예약안내",
        value: formatHtmlText(introData.reservationfood),
        isMultiline: true,
      });
  }

  return details;
};
