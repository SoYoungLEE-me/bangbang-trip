import {
  Box,
  Typography,
  Link,
  Divider,
  Chip,
  Stack,
  Paper,
  Container,
  ImageList,
  ImageListItem,
  CircularProgress,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";
import { useTourSpotDetailCommon } from "../../hooks/useTourSpotDetailCommon";
import { useTourSpotDetailInfo } from "../../hooks/useTourSpotDetailInfo";
import { useTourSpotDetailIntro } from "../../hooks/useTourSpotDetailIntro";
import { useTourSpotDetailPetTour } from "../../hooks/useTourSpotDetailPetTour";
import { useTourSpotDetailImage } from "../../hooks/useTourSpotDetailImages";
import {
  Building,
  Calendar,
  Clock,
  Info,
  Languages,
  ParkingCircle,
  Phone,
  Dog,
  BookOpenText,
  BadgeInfo,
} from "lucide-react";
import {
  isCultureFacility,
  isLeports,
  isLodging,
  isRestaurant,
  isShopping,
  isTouristSpot,
  isFestival, // 타입 가드 추가 확인
  type SpotDetailIntroItem,
} from "../../models/tourDetail";

// 이미지 소스셋 설정 함수
function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

// HTML 파싱 함수
const formatHtmlText = (htmlString: string): string => {
  if (!htmlString) return "";
  return htmlString
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/\n\s*\n/g, "\n")
    .replace(/<[^>]+>/g, "")
    .trim();
};

// 레이블에 따른 아이콘 매핑
const getIcon = (label: string = "") => {
  const iconStyle = { size: 18 };
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("문의") || lowerLabel.includes("전화"))
    return <Phone {...iconStyle} />;
  if (lowerLabel.includes("주소") || lowerLabel.includes("위치"))
    return <Building {...iconStyle} />;
  if (lowerLabel.includes("휴일") || lowerLabel.includes("쉬는날"))
    return <Calendar {...iconStyle} />;
  if (lowerLabel.includes("시간")) return <Clock {...iconStyle} />;
  if (lowerLabel.includes("주차")) return <ParkingCircle {...iconStyle} />;
  if (lowerLabel.includes("홈페이지")) return <Languages {...iconStyle} />;
  if (lowerLabel.includes("반려동물") || lowerLabel.includes("동반"))
    return <Dog {...iconStyle} />;
  return <Info {...iconStyle} />;
};

// 정보 항목 컴포넌트
const InfoItem = ({
  label,
  value,
  isMultiline = false,
  isPet = false,
}: {
  label: string;
  value: string | React.ReactNode;
  isMultiline?: boolean;
  isPet?: boolean;
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 0.8,
      paddingBlock: 2.5,
      borderBottom: "1px solid",
      borderColor: isPet ? "rgba(245, 124, 0, 0.1)" : "grey.100",
      "&:last-child": { borderBottom: "none" },
    }}
  >
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box
        sx={{
          color: isPet ? "#f57c00" : "primary.main",
          display: "flex",
          backgroundColor: isPet ? "#fff4e5" : "rgba(25, 118, 210, 0.08)",
          p: 0.8,
          borderRadius: "50%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {getIcon(label)}
      </Box>
      <Typography
        sx={{
          fontSize: "1.05rem",
          fontWeight: "700",
          color: "text.secondary",
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </Typography>
    </Stack>
    <Box
      sx={{
        fontSize: "0.95rem",
        color: "text.primary",
        lineHeight: 1.7,
        whiteSpace: isMultiline ? "pre-line" : "normal",
        wordBreak: "keep-all",
        pl: 5.8,
      }}
    >
      {value}
    </Box>
  </Box>
);

const SpotDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 1. 데이터 페칭
  const { data: spotData, isLoading: isCommonLoading } =
    useTourSpotDetailCommon({ contentId: id! });
  const spot = spotData?.response?.body?.items?.item?.[0];
  const contentTypeId = spot?.contenttypeid;

  const { data: infoData, isLoading: isInfoLoading } = useTourSpotDetailInfo({
    contentId: id!,
    contentTypeId: contentTypeId || "",
  });

  const { data: introData, isLoading: isIntroLoading } = useTourSpotDetailIntro(
    {
      contentId: id!,
      contentTypeId: contentTypeId || "",
    }
  );

  const { data: imageData } = useTourSpotDetailImage({
    contentId: id!,
    imageYN: "Y",
  });
  const { data: petTourData } = useTourSpotDetailPetTour({ contentId: id! });

  // 2. 변수 정리
  const intro = introData?.response?.body?.items?.item?.[0];
  const infos = infoData?.response?.body?.items?.item || [];
  const images = imageData?.response?.body?.items?.item || [];
  const petInfo = petTourData?.response?.body?.items?.item?.[0];

  // 상세 소개 정보 매핑 함수 (타입 안전성 확보)
  const getIntroDetails = (introData?: SpotDetailIntroItem) => {
    if (!introData) return { call: "", restDate: "", useTime: "", parking: "" };

    if (isTouristSpot(introData)) {
      return {
        call: introData.infocenter,
        restDate: introData.restdate,
        useTime: introData.usetime,
        parking: introData.parking,
      };
    }
    if (isCultureFacility(introData)) {
      return {
        call: introData.infocenterculture,
        restDate: introData.restdateculture,
        useTime: introData.usetimeculture,
        parking: introData.parkingculture,
      };
    }
    if (isLeports(introData)) {
      return {
        call: introData.infocenterleports,
        restDate: introData.restdateleports,
        useTime: introData.usetimeleports,
        parking: introData.parkingleports,
      };
    }
    if (isShopping(introData)) {
      return {
        call: introData.infocentershopping,
        restDate: introData.restdateshopping,
        useTime: introData.opentime,
        parking: introData.parkingshopping,
      };
    }
    if (isRestaurant(introData)) {
      return {
        call: introData.infocenterfood,
        restDate: introData.restdatefood,
        useTime: introData.opentimefood,
        parking: introData.parkingfood,
      };
    }
    if (isLodging(introData)) {
      return {
        call: introData.infocenterlodging,
        restDate: "",
        useTime: `${introData.checkintime} ~ ${introData.checkouttime}`,
        parking: introData.parkinglodging,
      };
    }
    if (isFestival(introData)) {
      return {
        call: introData.sponsor1tel || introData.sponsor2tel,
        restDate: `${introData.eventstartdate} ~ ${introData.eventenddate}`,
        useTime: introData.playtime,
        parking: "",
      };
    }
    return { call: "", restDate: "", useTime: "", parking: "" };
  };

  const { call, restDate, useTime, parking } = getIntroDetails(intro);
  const address = spot?.addr1;
  const rawHomepage = spot?.homepage ?? "";
  const urlMatch = rawHomepage.match(/https?:\/\/[^"]+/);

  // 3. 로딩 및 에러 처리
  if (isCommonLoading || isIntroLoading || isInfoLoading) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <CircularProgress color="primary" />
      </Container>
    );
  }

  if (!spot) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography>정보를 찾을 수 없습니다.</Typography>
        <Box
          onClick={() => navigate(-1)}
          sx={{ cursor: "pointer", mt: 2, color: "primary.main" }}
        >
          뒤로 가기
        </Box>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "72rem",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        pt: { xs: 12, md: 13, lg: 14 },
        pb: 10,
        paddingInline: { lg: 0, md: 10, sm: 7, xs: 4 },
      }}
    >
      {/* 헤더 섹션 */}
      <Box sx={{ width: "100%", textAlign: "center", mb: 6 }}>
        {spot?.addr1 && (
          <Chip
            label={spot.addr1.split(" ").slice(0, 2).join(" ")}
            color="primary"
            variant="filled"
            sx={{ mb: 2, fontWeight: 500, px: 1 }}
          />
        )}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2.25rem", md: "3.5rem" },
            fontWeight: 800,
            mb: { lg: 7, md: 5, xs: 5 },
          }}
        >
          {spot?.title}
        </Typography>

        <Paper
          elevation={0}
          sx={{ borderRadius: 3, overflow: "hidden", mb: 8 }}
        >
          <Box
            component="img"
            src={spot?.firstimage || "/api/placeholder/800/500"}
            alt={spot?.title}
            sx={{
              width: "100%",
              height: { xs: "300px", md: "600px" },
              objectFit: "cover",
            }}
          />
        </Paper>
      </Box>

      {/* 상세 설명 섹션 */}
      <Box sx={{ width: "100%", mb: 10 }}>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{ mb: 3.5 }}
        >
          <Box
            sx={{
              bgcolor: "#e2efe5ff",
              p: 1,
              borderRadius: 4,
              display: "flex",
            }}
          >
            <BookOpenText size={24} color="#2D6A4F" />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            상세 설명
          </Typography>
        </Stack>
        <Typography
          sx={{
            fontSize: "1.125rem",
            lineHeight: 1.8,
            backgroundColor: "grey.50",
            padding: { xs: 3, md: 5 },
            borderRadius: 4,
            border: "1px solid",
            borderColor: "grey.100",
            wordBreak: "keep-all",
          }}
        >
          {spot?.overview}
        </Typography>
      </Box>

      {/* 반려동물 동반 정보 섹션 */}
      {petInfo && (
        <Box sx={{ width: "100%", mb: 12 }}>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mb: 3.5 }}
          >
            <Box
              sx={{
                bgcolor: "#f7f1e9ff",
                p: 1,
                borderRadius: 4,
                display: "flex",
              }}
            >
              <Dog size={24} color="#f57c00" />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              반려동물 동반 정보
            </Typography>
          </Stack>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 5,
              border: "1px solid",
              borderColor: "#ffe0b2",
              backgroundColor: "#fffdfa",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 1,
              }}
            >
              {petInfo.acmpyTypeCd && (
                <InfoItem
                  label="동반 가능 여부"
                  value={petInfo.acmpyTypeCd}
                  isPet
                />
              )}
              {petInfo.acmpyPsblCpam && (
                <InfoItem
                  label="동반 가능 동물"
                  value={petInfo.acmpyPsblCpam}
                  isPet
                />
              )}
              {petInfo.acmpyNeedMtr && (
                <InfoItem
                  label="준수사항 및 준비물"
                  value={petInfo.acmpyNeedMtr}
                  isPet
                />
              )}
              {petInfo.relaPosesFclty && (
                <InfoItem
                  label="관련 시설"
                  value={petInfo.relaPosesFclty}
                  isPet
                />
              )}
              {petInfo.etcAcmpyInfo && (
                <Box sx={{ gridColumn: { md: "span 2" } }}>
                  <InfoItem
                    label="기타 동반 정보"
                    value={petInfo.etcAcmpyInfo}
                    isMultiline
                    isPet
                  />
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      )}

      {/* 이미지 갤러리 */}
      {images.length > 0 && (
        <Box sx={{ width: "100%", mb: 10 }}>
          <ImageList
            variant="quilted"
            cols={4}
            rowHeight={200}
            sx={{ borderRadius: 2, overflow: "hidden" }}
          >
            {images.map((item: any, index: number) => {
              const cols = index === 0 || index === 6 ? 2 : 1;
              const rows = index === 0 || index === 6 ? 2 : 1;
              return (
                <ImageListItem
                  key={item.serialnum || index}
                  cols={cols}
                  rows={rows}
                >
                  <img
                    {...srcset(item.originimgurl, 200, rows, cols)}
                    alt={item.imgname || "투어 이미지"}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </ImageListItem>
              );
            })}
          </ImageList>
        </Box>
      )}

      {/* 이용 정보 섹션 */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "grey.50",
          py: { xs: 4, md: 8 },
          px: { xs: 2, md: 6 },
          borderRadius: 8,
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{ mb: 3.5 }}
        >
          <Box
            sx={{
              bgcolor: "#eeeeeeff",
              p: 1,
              borderRadius: 4,
              display: "flex",
            }}
          >
            <BadgeInfo size={24} color="#333" />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            이용 정보
          </Typography>
        </Stack>
        <Divider sx={{ mb: 2, borderColor: "grey.200" }} />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 0, md: 8 },
          }}
        >
          <Box>
            {call && <InfoItem label="문의 및 안내" value={call} />}
            {address && <InfoItem label="주소" value={address} />}
            {restDate && (
              <InfoItem
                label="휴무일"
                value={formatHtmlText(restDate)}
                isMultiline
              />
            )}
            {infos
              .filter((_, i) => i % 2 === 0)
              .map((info, i) => (
                <InfoItem
                  key={`left-${i}`}
                  label={info.infoname}
                  value={formatHtmlText(info.infotext)}
                  isMultiline
                />
              ))}
          </Box>
          <Box>
            {urlMatch && (
              <InfoItem
                label="홈페이지"
                value={
                  <Link
                    href={urlMatch[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    공식 홈페이지 방문하기
                  </Link>
                }
              />
            )}
            {useTime && (
              <InfoItem
                label="이용시간"
                value={formatHtmlText(useTime)}
                isMultiline
              />
            )}
            {parking && <InfoItem label="주차 시설" value={parking} />}
            {infos
              .filter((_, i) => i % 2 === 1)
              .map((info, i) => (
                <InfoItem
                  key={`right-${i}`}
                  label={info.infoname}
                  value={formatHtmlText(info.infotext)}
                  isMultiline
                />
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SpotDetailPage;
