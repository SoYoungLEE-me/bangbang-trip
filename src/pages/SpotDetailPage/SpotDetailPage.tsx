import { Box, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import { useTourSpotDetailCommon } from "../../hooks/useTourSpotDetailCommon";
import { useTourSpotDetailInfo } from "../../hooks/useTourSpotDetailInfo";
import { useTourSpotDetailIntro } from "../../hooks/useTourSpotDetailIntro";
import { useTourSpotDetailPetTour } from "../../hooks/useTourSpotDetailPetTour";
import { useTourSpotDetailImage } from "../../hooks/useTourSpotDetailImages";

import { Header } from "./components/Header";
import { Description } from "./components/Description";
import { ImageGallery } from "./components/ImageGallery";
import { Course } from "./components/Course";
import { PetInfo } from "./components/PetInfo";
import { InfoSection } from "./components/InfoSection";

import { getIntroDetails } from "./utils/detailHelpers";
import { formatHtmlText } from "./utils/formatters";
import type {
  SpotDetailInfoItem,
  TourCourseInfoItem,
} from "../../models/tourDetail";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import { Frown } from "lucide-react";
import theme from "../../theme";

const SpotDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

  if (isCommonLoading || isIntroLoading || isInfoLoading) {
    return <LoadingSpinner />;
  }

  if (!spot) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "1.25rem",
            padding: "1rem",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Frown />
        </Box>
        <Typography variant="h5" color="text.secondary">
          정보를 찾을 수 없습니다
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ mt: 2, borderRadius: "0.625rem" }}
        >
          홈으로 돌아가기
        </Button>
      </Box>
    );
  }

  const introDetails = getIntroDetails(
    introData?.response?.body?.items?.item?.[0]
  );
  const images = (imageData?.response?.body?.items?.item || []).filter(
    (img) => img.originimgurl !== spot?.firstimage
  );

  const isTourCourseType = contentTypeId === "25";
  const infos: SpotDetailInfoItem[] =
    infoData?.response?.body?.items?.item || [];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "72rem",
        margin: "0 auto",
        pb: 10,
        pt: { xs: 10, md: 8 },
        px: { lg: 0, md: 10, xs: 4 },
      }}
    >
      <Header spot={spot} />

      <Description overview={spot.overview} />

      <ImageGallery images={images} />

      {isTourCourseType && (
        <Course
          courseInfos={infos.filter(
            (i): i is TourCourseInfoItem =>
              i.contenttypeid === "25" && "subname" in i
          )}
        />
      )}

      <PetInfo petInfo={petTourData?.response?.body?.items?.item?.[0]} />

      <InfoSection
        address={spot.addr1}
        homepageUrl={spot.homepage?.match(/https?:\/\/[^"]+/)?.[0]}
        leftIntro={introDetails.filter((_, i) => i % 2 === 0)}
        rightIntro={introDetails.filter((_, i) => i % 2 === 1)}
        extraInfos={
          !isTourCourseType
            ? infos.filter(
                (i) => i.infotext && formatHtmlText(i.infotext).trim()
              )
            : []
        }
      />
    </Box>
  );
};

export default SpotDetailPage;
