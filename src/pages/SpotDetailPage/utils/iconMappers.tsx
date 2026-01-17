import {
  Building,
  Calendar,
  Clock,
  Info,
  Languages,
  ParkingCircle,
  Phone,
  Dog,
} from "lucide-react";

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
