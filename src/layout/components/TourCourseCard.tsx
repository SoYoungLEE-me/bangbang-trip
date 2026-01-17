import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  useTheme,
  Box,
  Snackbar,
  Button,
} from "@mui/material";
import { Heart, CameraOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { TourSpot, Festival } from "../../models/tour";
import type { SpotItem } from "../../models/spot";
import { useSelectedSpotsStore } from "../../stores/selectedSpotsStore";

type CardData = TourSpot | Festival | SpotItem;

interface TourCourseCardProps {
  course: CardData;
  isSaved?: boolean;
  onSave?: (id: string) => void;
  contentTypeId?: string;
  showAddress?: boolean;
  onClick?: () => void;
}

// CardData를 TourSpot으로 변환하는 헬퍼 함수
const convertToTourSpot = (course: CardData): TourSpot => {
  return {
    contentid: course.contentid,
    contenttypeid: course.contenttypeid,
    title: course.title,
    addr1: course.addr1 || "",
    addr2: course.addr2,
    firstimage: course.firstimage,
    firstimage2: course.firstimage2,
    mapx: "mapx" in course ? course.mapx || "" : "",
    mapy: "mapy" in course ? course.mapy || "" : "",
    tel: "tel" in course ? course.tel : undefined,
    areacode: course.areacode,
    sigungucode: course.sigungucode,
  };
};

const TourCourseCard = ({ course, isSaved, onSave, onClick }: TourCourseCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { selectedSpots, toggleSpot } = useSelectedSpotsStore();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [lastRemovedSpot, setLastRemovedSpot] = useState<TourSpot | null>(null);

  // store에서 저장 여부 확인 (onSave가 없을 때만)
  const isSavedInStore = selectedSpots.some((spot) => spot.contentid === course.contentid);
  const finalIsSaved = isSaved !== undefined ? isSaved : isSavedInStore;

  // store 변경 시 localStorage에 자동 저장
  useEffect(() => {
    localStorage.setItem("selected-spots-storage", JSON.stringify({ state: { selectedSpots } }));
  }, [selectedSpots]);

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/spots/${course.contentid}`);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (onSave) {
      onSave(course.contentid);
    } else {
      const tourSpot = convertToTourSpot(course);
      const wasSaved = isSavedInStore;

      setSnackbarOpen(false);
      toggleSpot(tourSpot);

      // Snackbar 메시지 설정
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
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setLastRemovedSpot(null);
  };

  const handleGoToPlanner = () => {
    navigate("/ai-planner");
    setSnackbarOpen(false);
    // 페이지 이동 후 화면 상단으로 스크롤
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  const handleUndo = () => {
    if (lastRemovedSpot) {
      // 다시 찜하기 추가
      toggleSpot(lastRemovedSpot);
      setSnackbarOpen(false);
      setLastRemovedSpot(null);

      // 실행 취소 완료 메시지 (선택사항)
      setSnackbarMessage("찜하기가 복구되었습니다.");
      setIsAdded(true);
      setSnackbarOpen(true);
    }
  };

  const formatAddress = (addr: string | undefined): string => {
    if (!addr) return "";
    const addrArray = addr.split(" ");
    return addrArray.length > 1
      ? `${addrArray[0]} ${addrArray[1]}`
      : addrArray[0];
  };

  const hasImage = !!course.firstimage;

  return (
    <>
      <Card
        sx={{
          position: "relative",
          height: "100%",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          cursor: "pointer",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            ".MuiCardMedia-img": {
              transform: "scale(1.2)",
            },
            ".no-image-icon": {
              transform: "scale(1.2)",
            },
          },
        }}
        onClick={handleCardClick}
      >
        <Box
          sx={{
            // height: "200",
            width: "100%",
            overflow: "hidden",
            aspectRatio: "1.3",///
            "&:hover img": {
              transform: "scale(1.2)",
            },
          }}
        >
          {hasImage ? (
            <CardMedia
              component="img"
              // height="200px"
              image={course.firstimage}
              alt={course.title}
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "100%", ///
                transition: "transform 1s ease-in-out",
                aspectRatio: "1.3",
              }}
            />
          ) : (
            <Box
              sx={{
                // height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.palette.background.paper,
                /// aspectRatio: "1.3",
                "& svg": {
                  transition: "transform 1s ease-in-out",
                },
              }}
            >
              <CameraOff
                className="no-image-icon"
                size={50}
                color={theme.palette.text.secondary}
              />
            </Box>
          )}
        </Box>

        {/* 하트 버튼 - 항상 표시 */}
        <IconButton
          onClick={handleToggleFavorite}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.secondary,
            "&:hover": {
              backgroundColor: theme.palette.background.default,
            },
          }}
        >
          <Heart
            size={20}
            fill={finalIsSaved ? theme.palette.error.main : "none"}
            color={
              finalIsSaved
                ? theme.palette.error.main
                : theme.palette.text.secondary
            }
          />
        </IconButton>
          
        <CardContent
          sx={{
            // pt: { xs: 0.5, sm: 1.5 }, ///
            // px: { xs: 1.5, sm: 2 }, ///
            // pb: { xs: 1.5, sm: 2 }, ///
            // pt: { xs: 1, sm: 1.5 }, ///
            // px: { xs: 1.5, sm: 2 }, ///
            // pb: { xs: 1.5, sm: 2 }, ///
            pt: { xs: 3, sm: 3 },
            px: { xs: 1.5, sm: 2 },
            pb: { xs: 3, sm: 3 },
            "&:last-child": {
              paddingBottom: { xs: 3, sm: 3 },
            },
          }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: "18px",
              color: theme.palette.text.primary,
              mb: 1,
              display: "block",
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {course.title}
          </Typography>

          {/* 축제 기간 표시 */}
          {"eventstartdate" in course &&
            course.eventstartdate &&
            course.eventenddate && (
              <Typography
                variant="body2"
                sx={{
                  fontSize: "14px",
                  color: theme.palette.text.secondary,
                  mt: 0.5,
                }}
              >
                {course.eventstartdate.replace(
                  /(\d{4})(\d{2})(\d{2})/,
                  "$1.$2.$3"
                )}{" "}
                ~{" "}
                {course.eventenddate.replace(
                  /(\d{4})(\d{2})(\d{2})/,
                  "$1.$2.$3"
                )}
              </Typography>
            )}

          {/* 지역 정보 배지 */}
          {course.addr1 && (
            <Box
              sx={{
                display: "inline-block",
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
                px: 1,
                py: 0.5,
                marginLeft: "-3px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 600,
                mt: 1,
                mb: shouldShowAddress ? 1 : 0,
              }}
            >
              {formatAddress(course.addr1)}
            </Box>
          )}

          {/* 주소 표시 */}
          {shouldShowAddress && course.addr1 && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: "14px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {formatAddress(course.addr1)}
            </Typography>
          )}

          
        </CardContent>
      </Card>

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
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            border: `6px solid ${
              isAdded || snackbarMessage.includes("복구") ? theme.palette.primary.main : theme.palette.error.main
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
                color: theme.palette.primary.main,
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
                color: theme.palette.error.main,
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

export default TourCourseCard;
