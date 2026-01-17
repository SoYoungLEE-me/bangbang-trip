import { Box, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";

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

const SpotDetailPage = () => {
  const { id } = useParams<{ id: string }>();

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

  if (!spot) return <Box sx={{ p: 10, textAlign: "center" }}>정보 없음</Box>;

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
      <Box sx={{ position: "fixed", top: 80, right: 20, zIndex: 1000 }}>
        <IconButton>...</IconButton>
      </Box>

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
