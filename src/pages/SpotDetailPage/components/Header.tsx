import {
  Box,
  Typography,
  Chip,
  Paper,
  alpha,
  IconButton,
  Snackbar,
  Button,
  useTheme,
} from "@mui/material";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SpotDetailCommonItem } from "../../../models/tourDetail";
import type { TourSpot } from "../../../models/tour";
import { useSelectedSpotsStore } from "../../../stores/selectedSpotsStore";
import theme from "../../../theme";

interface HeaderProps {
  spot: SpotDetailCommonItem;
}

export const Header = ({ spot }: HeaderProps) => {
  const muiTheme = useTheme();
  const navigate = useNavigate();
  const { selectedSpots, toggleSpot } = useSelectedSpotsStore();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [lastRemovedSpot, setLastRemovedSpot] = useState<TourSpot | null>(null);

  useEffect(() => {
    localStorage.setItem(
      "selected-spots-storage",
      JSON.stringify({ state: { selectedSpots } })
    );
  }, [selectedSpots]);

  if (!spot) return null;

  console.log("spot", spot);

  const isSavedInStore = selectedSpots.some(
    (savedSpot) => savedSpot.contentid === spot.contentid
  );

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();

    const tourSpot: TourSpot = {
      contentid: spot.contentid,
      contenttypeid: spot.contenttypeid,
      title: spot.title,
      addr1: spot.addr1 || "",
      addr2: spot.addr2,
      firstimage: spot.firstimage,
      firstimage2: spot.firstimage2,
      mapx: spot.mapx || "",
      mapy: spot.mapy || "",
      tel: spot.tel,
      areacode: spot.areacode,
      sigungucode: spot.sigungucode,
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

  const handleGoToPlanner = () => {
    navigate("/ai-planner");
    setSnackbarOpen(false);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  const handleUndo = () => {
    if (lastRemovedSpot) {
      toggleSpot(lastRemovedSpot);
      setSnackbarOpen(false);
      setLastRemovedSpot(null);
      setSnackbarMessage("찜을 복구했습니다.");
      setIsAdded(true);
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", textAlign: "center", mb: { xs: 5, md: 6 } }}>
        {spot.contenttypeid === "25" && !spot.addr1 && (
          <Chip
            label={"추천 코스"}
            color="secondary"
            sx={{
              mb: 2,
              fontWeight: 600,
              px: 1,
              color: theme.palette.primary.main,
            }}
          />
        )}
        {spot.addr1 && (
          <Chip
            label={spot.addr1.split(" ").slice(0, 2).join(" ")}
            color="primary"
            sx={{ mb: 2, fontWeight: 500, px: 1 }}
          />
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mb: { lg: 7, md: 5, xs: 5 },
          }}
        >
          <Box sx={{ display: "block" }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2rem", md: "3.5rem" },
                fontWeight: 800,
                wordBreak: "keep-all",
                display: "inline",
                background: `linear-gradient(180deg, transparent 60%, ${alpha(
                  theme.palette.primary.main,
                  0.3
                )} 60%)`,
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
              }}
            >
              {spot.title}
            </Typography>
          </Box>
          {spot.contenttypeid !== "25" && (
            <IconButton
              onClick={handleToggleFavorite}
              sx={{
                width: { xs: "2.15rem", md: "2.5rem" },
                height: { xs: "2.15rem", md: "2.5rem" },
                backgroundColor: muiTheme.palette.background.paper,
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: muiTheme.palette.background.default,
                },
                "& svg": {
                  transition: "all 0.3s ease",
                  width: { xs: "1.25rem", md: "1.5rem" },
                  height: { xs: "1.25rem", md: "1.5rem" },
                },
              }}
            >
              <Heart
                fill={isSavedInStore ? muiTheme.palette.error.main : "none"}
                color={
                  isSavedInStore
                    ? muiTheme.palette.error.main
                    : muiTheme.palette.text.secondary
                }
                style={{ transition: "all 0.3s ease" }}
              />
            </IconButton>
          )}
        </Box>
        {spot.firstimage && (
          <Paper
            elevation={0}
            sx={{ borderRadius: 3, overflow: "hidden", mb: { xs: 1, md: 8 } }}
          >
            <Box
              component="img"
              src={spot.firstimage}
              alt={spot.title}
              sx={{
                width: "100%",
                height: { xs: "300px", md: "600px" },
                objectFit: "cover",
              }}
            />
          </Paper>
        )}
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          marginLeft: { xs: 12, sm: 2, md: 0 },
          marginRight: { xs: 12, sm: 2, md: 0 },
          maxWidth: { xs: "calc(100% - 32px)", sm: "600px" },
          "& .MuiSnackbarContent-root": {
            margin: "4px",
            backgroundColor: muiTheme.palette.background.default,
            color: muiTheme.palette.text.primary,
            border: `6px solid ${
              isAdded || snackbarMessage.includes("복구")
                ? muiTheme.palette.primary.main
                : muiTheme.palette.error.main
            }`,
          },
        }}
        action={
          isAdded ? (
            <Button
              color="inherit"
              size="small"
              onClick={handleGoToPlanner}
              sx={{
                fontWeight: 600,
                textTransform: "none",
                color: muiTheme.palette.primary.main,
              }}
            >
              바로가기
            </Button>
          ) : lastRemovedSpot ? (
            <Button
              color="inherit"
              size="small"
              onClick={handleUndo}
              sx={{
                fontWeight: 600,
                textTransform: "none",
                color: muiTheme.palette.error.main,
              }}
            >
              실행 취소
            </Button>
          ) : undefined
        }
      />
    </>
  );
};
