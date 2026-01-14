import { Box, Grid, Typography } from "@mui/material";
import useGetSpots from "../../hooks/useGetSpots";
import SpotCard from "./components/SpotCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const SpotsListPage = () => {
  const { ref, inView } = useInView();

  const { flatData: spots, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetSpots();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <Box sx={{ marginTop: "68px", padding: "16px" }}>
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
            <SpotCard spot={spot} />
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
  );
};

export default SpotsListPage;
