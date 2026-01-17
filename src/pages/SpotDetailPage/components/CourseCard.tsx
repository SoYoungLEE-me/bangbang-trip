import {
  Box,
  Stack,
  Typography,
  Paper,
  Chip,
  IconButton,
  Snackbar,
  Button,
  alpha,
} from "@mui/material";
import { formatHtmlText } from "../utils/formatters";
import type { TourCourseInfoItem } from "../../../models/tourDetail";
import type { TourSpot } from "../../../models/tour";
import { useTourSpotDetailCommon } from "../../../hooks/useTourSpotDetailCommon";
import theme from "../../../theme";
import { Heart, MapPin } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelectedSpotsStore } from "../../../stores/selectedSpotsStore";

interface CourseItemProps {
  course: TourCourseInfoItem;
  idx: number;
}

export const CourseCard = ({ course, idx }: CourseItemProps) => {
  const navigate = useNavigate();
  const { selectedSpots, toggleSpot } = useSelectedSpotsStore();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [lastRemovedSpot, setLastRemovedSpot] = useState<TourSpot | null>(null);

  const { data } = useTourSpotDetailCommon({
    contentId: course.subcontentid || "",
  });

  const spotDetail = data?.response?.body?.items?.item?.[0];
  const address = spotDetail?.addr1;

  useEffect(() => {
    localStorage.setItem(
      "selected-spots-storage",
      JSON.stringify({ state: { selectedSpots } })
    );
  }, [selectedSpots]);

  const isSavedInStore = selectedSpots.some(
    (spot) => spot.contentid === course.subcontentid
  );

  const handleCardClick = () => {
    if (course.subcontentid) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(`/spots/${course.subcontentid}`);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!spotDetail) return;

    const tourSpot: TourSpot = {
      contentid: spotDetail.contentid,
      contenttypeid: spotDetail.contenttypeid,
      title: spotDetail.title,
      addr1: spotDetail.addr1 || "",
      addr2: spotDetail.addr2,
      firstimage: spotDetail.firstimage,
      firstimage2: spotDetail.firstimage2,
      mapx: spotDetail.mapx || "",
      mapy: spotDetail.mapy || "",
      tel: spotDetail.tel,
      areacode: spotDetail.areacode,
      sigungucode: spotDetail.sigungucode,
    };

    const wasSaved = isSavedInStore;
    setSnackbarOpen(false);
    toggleSpot(tourSpot);

    if (wasSaved) {
      setSnackbarMessage("찜을 취소했습니다.");
      setIsAdded(false);
      setLastRemovedSpot(tourSpot);
    } else {
      setSnackbarMessage("찜했습니다.");
      setIsAdded(true);
      setLastRemovedSpot(null);
    }

    setTimeout(() => {
      setSnackbarOpen(true);
    }, 100);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setLastRemovedSpot(null);
  };

  const handleUndo = () => {
    if (lastRemovedSpot) {
      toggleSpot(lastRemovedSpot);
      setSnackbarOpen(false);
      setLastRemovedSpot(null);
      setSnackbarMessage("찜하기가 복구되었습니다.");
      setIsAdded(true);
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Paper
        elevation={0}
        onClick={handleCardClick}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "grey.200",
          bgcolor: "grey.50",
          position: "relative",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            cursor: "pointer",
            borderColor: theme.palette.primary.main,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          },
        }}
      >
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={{ xs: 1, md: 2 }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              spacing={{ xs: 1, md: 2 }}
              alignItems="center"
            >
              <Chip label={`코스 ${idx + 1}`} color="primary" size="small" />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, wordBreak: "keep-all" }}
              >
                {course.subname}
              </Typography>
            </Stack>

            <IconButton
              onClick={handleToggleFavorite}
              sx={{
                bgcolor: "#ffffff6c",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                "&:hover": {
                  bgcolor: "grey.100",
                  "& svg": {
                    fill: alpha(theme.palette.error.main, 0.7),
                  },
                },
              }}
            >
              <Heart
                size={20}
                fill={isSavedInStore ? theme.palette.error.main : "none"}
                color={
                  isSavedInStore
                    ? theme.palette.error.main
                    : theme.palette.text.secondary
                }
              />
            </IconButton>
          </Stack>

          {address && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.25rem",
                width: "fit-content",
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
                px: 1,
                py: 0.5,
                borderRadius: "0.875rem",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              <MapPin size={14} />
              {address.split(" ").slice(0, 2).join(" ")}
            </Box>
          )}

          {course.subdetailimg && (
            <Box
              component="img"
              src={course.subdetailimg}
              alt={course.subname || "코스 이미지"}
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
              wordBreak: "keep-all",
            }}
          >
            {formatHtmlText(course.subdetailoverview || "")}
          </Typography>
        </Stack>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          zIndex: 2000,
          "& .MuiSnackbarContent-root": {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            border: `6px solid ${
              isAdded || snackbarMessage.includes("복구")
                ? theme.palette.primary.main
                : theme.palette.error.main
            }`,
          },
        }}
        action={
          isAdded ? (
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                navigate("/ai-planner");
                window.scrollTo(0, 0);
              }}
              sx={{ fontWeight: 600, color: theme.palette.primary.main }}
            >
              바로가기
            </Button>
          ) : lastRemovedSpot ? (
            <Button
              color="inherit"
              size="small"
              onClick={handleUndo}
              sx={{ fontWeight: 600, color: theme.palette.error.main }}
            >
              실행 취소
            </Button>
          ) : undefined
        }
      />
    </>
  );
};
