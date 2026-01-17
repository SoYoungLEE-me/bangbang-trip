import { Alert, Box, Grid, Typography } from "@mui/material";
import useGetSpots from "../../hooks/useGetSpots";
import TourCourseCard from "../../layout/components/TourCourseCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import SpotFilterBar from "./components/SpotFilterBar";
import { useSpotFilterStore } from "../../stores/spotFilterStore";
import LoadingSpinner from "../../common/components/LoadingSpinner";

const SpotsListPage = () => {
  const { selectedTouristType, keyword } = useSpotFilterStore();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    flatData: spots,
    isLoading,
    isFetching,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetSpots();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  const renderContent = () => {
    if (isLoading || (isFetching && spots.length === 0)) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <Alert severity="error">{error.message}</Alert>;
    }

    if (spots.length === 0) {
      return (
        <Typography
          variant="h2"
          component="p"
          sx={{ width: "100%", textAlign: "center", fontWeight: "700", padding: "16px" }}
        >
          {keyword ? `"${keyword}"에 대한 검색 결과가 없습니다.` : "검색 결과가 없습니다."}
        </Typography>
      );
    }

    return spots.map((spot) => (
      <Grid key={spot.contentid} size={{ xs: 12, sm: 6, md: 3 }}>
        <TourCourseCard course={spot} contentTypeId={selectedTouristType} showAddress={true} />
      </Grid>
    ));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ padding: "16px 16px 0" }}>
      <Box sx={{ maxWidth: "calc(1200px - 48px)", margin: "0 auto 16px" }}>
        <SpotFilterBar />
      </Box>
      <Box>
        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: "calc(1200px - 48px)",
            margin: "0 auto",
          }}
        >
          {renderContent()}
        </Grid>
        {spots.length > 0 && (
          <Box ref={ref} sx={{ minHeight: "16px" }}>
            {isFetchingNextPage && (
              <Typography
                variant="h2"
                component="p"
                color="text.secondary"
                sx={{ textAlign: "center", fontWeight: "700", padding: "16px" }}
              >
                장소 검색 중...
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SpotsListPage;
