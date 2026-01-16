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
import { BookOpenText, LandPlot, BadgeInfo } from "lucide-react";

// Hooks
import { useTourSpotDetailCommon } from "../../hooks/useTourSpotDetailCommon";
import { useTourSpotDetailInfo } from "../../hooks/useTourSpotDetailInfo";
import { useTourSpotDetailIntro } from "../../hooks/useTourSpotDetailIntro";
import { useTourSpotDetailPetTour } from "../../hooks/useTourSpotDetailPetTour";
import { useTourSpotDetailImage } from "../../hooks/useTourSpotDetailImages";

// Utils & Components
import { formatHtmlText, srcset } from "./utills/formatters";
import { InfoItem } from "./components/InfoItem";
import { getIntroDetails } from "./utills/detailHelpers";
import { PetInfo } from "./components/PetInfo";

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

  // 2. 가공 로직
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

  const intro = introData?.response?.body?.items?.item?.[0];
  const infos = infoData?.response?.body?.items?.item || [];
  const allImages = imageData?.response?.body?.items?.item || [];
  const images = allImages.filter(
    (img) => img.originimgurl !== spot?.firstimage
  );
  const petInfo = petTourData?.response?.body?.items?.item?.[0];
  const introDetails = getIntroDetails(intro);

  const isTourCourseType = contentTypeId === "25";
  const courseInfos = isTourCourseType
    ? infos.filter((info: any) => info.subname && info.subdetailoverview)
    : [];
  const urlMatch = spot?.homepage?.match(/https?:\/\/[^"]+/);

  // 이용 정보 그리드용 데이터 분리
  const leftColumnIntro = introDetails.filter((_, i) => i % 2 === 0);
  const rightColumnIntro = introDetails.filter((_, i) => i % 2 === 1);
  const filteredInfos = !isTourCourseType
    ? infos.filter(
        (info: any) => info.infotext && formatHtmlText(info.infotext).trim()
      )
    : [];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "72rem",
        margin: "0 auto",
        pb: 10,
        pt: { xs: 12, md: 13, lg: 14 },
        paddingInline: { lg: 0, md: 10, sm: 7, xs: 4 },
      }}
    >
      {/* 헤더 섹션 */}
      <Box sx={{ width: "100%", textAlign: "center", mb: 6 }}>
        {spot?.addr1 && (
          <Chip
            label={spot.addr1.split(" ").slice(0, 2).join(" ")}
            color="primary"
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
            sx={{
              width: "100%",
              height: { xs: "300px", md: "600px" },
              objectFit: "cover",
            }}
          />
        </Paper>
      </Box>

      {/* 상세 설명 */}
      {spot?.overview && (
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
              <BookOpenText size={24} color="#49af81ff" />
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
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              border: "1px solid",
              borderColor: "grey.100",
            }}
          >
            {spot.overview}
          </Typography>
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
            {images.map((item: any, index: number) => (
              <ImageListItem
                key={index}
                cols={index === 0 || index === 6 ? 2 : 1}
                rows={index === 0 || index === 6 ? 2 : 1}
              >
                <img
                  {...srcset(
                    item.originimgurl,
                    200,
                    index === 0 || index === 6 ? 2 : 1,
                    index === 0 || index === 6 ? 2 : 1
                  )}
                  alt="gallery"
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}

      {/* 여행코스 섹션 */}
      {isTourCourseType && courseInfos.length > 0 && (
        <Box sx={{ width: "100%", mb: 10 }}>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mb: 3.5 }}
          >
            <Box
              sx={{
                bgcolor: "#e3fdf1ff",
                p: 1,
                borderRadius: 4,
                display: "flex",
              }}
            >
              <LandPlot size={24} color="#19d2ccff" />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              코스 정보
            </Typography>
          </Stack>
          <Stack spacing={4}>
            {courseInfos.map((course: any, idx: number) => (
              <Paper
                key={idx}
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "grey.200",
                  backgroundColor: "grey.50",
                }}
              >
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Chip
                      label={`코스 ${idx + 1}`}
                      color="primary"
                      size="small"
                    />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {course.subname}
                    </Typography>
                  </Stack>
                  {course.subdetailimg && (
                    <Box
                      component="img"
                      src={course.subdetailimg}
                      sx={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: 2,
                      }}
                    />
                  )}
                  <Typography
                    sx={{
                      fontSize: "0.95rem",
                      lineHeight: 1.8,
                      color: "text.secondary",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {formatHtmlText(course.subdetailoverview)}
                  </Typography>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Box>
      )}

      {/* 반려동물 정보 */}
      <PetInfo petInfo={petInfo} />

      {/* 이용 정보 섹션 */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "grey.50",
          py: { xs: 4, md: 8 },
          borderRadius: 8,
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{ mb: 3.5, px: { xs: 3, md: 6 } }}
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
            px: { xs: 3, md: 6 },
          }}
        >
          <Box>
            {spot.addr1 && <InfoItem label="주소" value={spot.addr1} />}
            {leftColumnIntro.map((d, i) => (
              <InfoItem key={i} {...d} />
            ))}
            {filteredInfos
              .filter((_, i) => i % 2 === 0)
              .map((info: any, i: number) => (
                <InfoItem
                  key={i}
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
            {rightColumnIntro.map((d, i) => (
              <InfoItem key={i} {...d} />
            ))}
            {filteredInfos
              .filter((_, i) => i % 2 === 1)
              .map((info: any, i: number) => (
                <InfoItem
                  key={i}
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
