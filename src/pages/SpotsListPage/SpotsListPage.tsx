import { Box, Grid, Typography } from "@mui/material";
import useGetSpots from "../../hooks/useGetSpots";
import SpotCard from "./components/SpotCard";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import SpotFilterBar from "./components/SpotFilterBar";
import SpotFilterModal from "./components/SpotFilterModal";

const SpotsListPage = () => {
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [contentTypeId, setContentTypeId] = useState<string>("12");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedSigungu, setSelectedSigungu] = useState<string>("");

  const { ref, inView } = useInView();

  const {
    flatData: spots,
    // isLoading,
    // error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetSpots({
    areaCode: selectedArea,
    sigunguCode: selectedSigungu,
    contentTypeId,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <Box sx={{ padding: "16px" }}>
      <Box sx={{ maxWidth: "calc(1200px - 48px)", margin: "0 auto 16px" }}>
        <SpotFilterBar isFilterActive={isFilterActive} setIsFilterActive={setIsFilterActive} />
        {isFilterActive && (
          <SpotFilterModal
            setContentTypeId={setContentTypeId}
            setSelectedArea={setSelectedArea}
            setSelectedSigungu={setSelectedSigungu}
          />
        )}
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
              <SpotCard spot={spot} contentTypeId={contentTypeId} />
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
