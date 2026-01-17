import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import useGetSpots from "../../hooks/useGetSpots";
import TourCourseCard from "../../layout/components/TourCourseCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import SpotFilterBar from "./components/SpotFilterBar";

const SpotsListPage = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    flatData: spots,
    isLoading,
    // error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetSpots();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

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
          {spots.map((spot) => (
            <Grid key={spot.contentid} size={{ xs: 12, sm: 6, md: 3 }}>
              <TourCourseCard
                course={spot}
                contentTypeId={contentTypeId}
                showAddress={true}
              />
            </Grid>
          ))}
        </Grid>
        <Box ref={ref}>
          {isFetchingNextPage && (
            <Typography
              variant="h2"
              component="p"
              color="text.secondary"
              sx={{ textAlign: "center", fontWeight: "700", marginTop: "24px" }}
            >
              Loading...
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SpotsListPage;
