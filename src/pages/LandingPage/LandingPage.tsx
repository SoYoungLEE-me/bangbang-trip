import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Grid,
  CircularProgress,
  Alert,
  Button,
  useTheme,
} from "@mui/material";
import { Heart, ChevronLeft, ChevronRight, ChevronRightIcon } from "lucide-react";
import { usePopularSpots, useNearbyCourses } from "../../hooks/useTourSpots";
import { useNavigate } from "react-router-dom";
import TourCourseCard from "../../layout/components/TourCourseCard";

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [savedCourses, setSavedCourses] = useState<Set<string>>(new Set());
  const SLIDE_COUNT = 10;

  const {
    data: popularSpots = [],
    isLoading: isLoadingSpots,
    isError: isErrorSpots,
  } = usePopularSpots();

  const {
    data: nearbyCourses = [],
    isLoading: isLoadingCourses,
    isError: isErrorCourses,
  } = useNearbyCourses();

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? SLIDE_COUNT - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) =>
      prev === SLIDE_COUNT - 1 ? 0 : prev + 1
    );
  };

   // 4초마다 자동으로 슬라이드 넘기기
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === SLIDE_COUNT - 1 ? 0 : prev + 1
      );
    }, 4000);

    // 컴포넌트 언마운트 시 interval 정리
    return () => clearInterval(interval);
  }, [SLIDE_COUNT]);

  const handleSaveCourse = (id: string) => {
    setSavedCourses((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // 로딩 상태
  if (isLoadingSpots || isLoadingCourses) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // 에러 상태
  if (isErrorSpots || isErrorCourses) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          데이터를 불러오는 도중 오류가 발생했습니다.
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      {/* 슬라이드 섹션 - 인기 관광지 */}
      {popularSpots.length > 0 && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "300px", md: "700px" },
            overflow: "hidden",
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
           {/* 슬라이드 이미지에 그라데이션 */}
            {popularSpots.slice(0, SLIDE_COUNT).map((spot, index) => (
              <Box
                key={spot.contentid}
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  opacity: index === currentSlide ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                  backgroundImage: `url(${spot.firstimage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.4)",
                  },
                  // 슬라이드 아래에서 위로 밝아지는 그라데이션
                  "&::after":  {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 20.32%, rgba(0, 0, 0, 0.00735012) 26.35%, rgba(0, 0, 0, 0.0301835) 32.38%, rgba(0, 0, 0, 0.0694109) 38.41%, rgba(0, 0, 0, 0.1253) 44.44%, rgba(0, 0, 0, 0.197009) 50.46%, rgba(0, 0, 0, 0.282101) 56.49%, rgba(0, 0, 0, 0.376288) 62.52%, rgba(0, 0, 0, 0.473712) 68.55%, rgba(0, 0, 0, 0.567899) 74.58%, rgba(0, 0, 0, 0.652991) 80.61%, rgba(0, 0, 0, 0.7247) 86.64%, rgba(0, 0, 0, 0.780589) 92.67%, rgba(0, 0, 0, 0.819817) 98.7%, rgba(0, 0, 0, 0.84265) 104.73%, rgba(0, 0, 0, 0.85) 110.76%);",
                    pointerEvents: "none",
                  }, 
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                    textAlign: "center",
                    color: "white",
                    mt: { xs: 10, md: 15 },
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "32px", md: "48px" },
                      fontWeight: 700,
                      mb: { xs: 1, md: 1 },
                    }}
                  >
                    {spot.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: { xs: "16px", md: "20px" }, mb: 2 }}
                  >
                    {spot.addr1}
                  </Typography>
                  <Button
                    onClick={() => navigate(`/spots/${spot.contentid}`)}
                    sx={{
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      color: "white",
                      borderRadius: 1,
                      px: { xs: 1, md: 2 },
                      mb: { xs: 1, md: 1 },
                      display: "flex",
                      alignItems: "center",
                      margin: 'auto',
                      gap: 1,
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        borderColor: "rgba(255, 255, 255, 0.7)",
                      },
                    }}
                  >
                    자세히 보기
                    <ChevronRightIcon size={18} />
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>

          {/* 슬라이드 네비게이션 버튼 */}
          {popularSpots.length > 1 && (
            <>
              <IconButton
                onClick={handlePrevSlide}
                sx={{
                  position: "absolute",
                  left: { xs: 10, md: 20 },
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255,255,255,0.8)",
                  color: theme.palette.primary.main,
                  "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                  zIndex: 2,
                }}
              >
                <ChevronLeft size={24} />
              </IconButton>
              <IconButton
                onClick={handleNextSlide}
                sx={{
                  position: "absolute",
                  right: { xs: 10, md: 20 },
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255,255,255,0.8)",
                  color: theme.palette.primary.main,
                  "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                  zIndex: 2,
                }}
              >
                <ChevronRight size={24} />
              </IconButton>

              {/* 슬라이드 인디케이터 */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 1,
                  zIndex: 2,
                }}
              >
                {popularSpots.slice(0, SLIDE_COUNT).map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    sx={{
                      width: currentSlide === index ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor:
                        currentSlide === index ? "white" : "rgba(255,255,255,0.5)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>
      )}

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* 주변 관광지 코스 카드 섹션 */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "24px", md: "32px" },
              fontWeight: 700,
              mb: 4,
              color: theme.palette.text.primary,
            }}
          >
            주변 관광지 코스
          </Typography>
          <Grid container spacing={3}>
            {nearbyCourses.map((course) => (
              <Grid size={{xs:12, sm:6, md:3}} key={course.contentid}>
                <TourCourseCard
                  course={course}
                  isSaved={savedCourses.has(course.contentid)}
                  onSave={handleSaveCourse}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 홈페이지 소개글 섹션 */}
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 3,
            p: { xs: 4, md: 6 },
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            mb: { xs: 6, md: 8 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "24px", md: "32px" },
              fontWeight: 700,
              mb: 3,
              color: theme.palette.primary.main,
              textAlign: "center",
            }}
          >
            전국: 방방곡곡에 오신 것을 환영합니다
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
              color: theme.palette.text.secondary,
              textAlign: "center",
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            한국관광공사 Tour API와 AI를 활용한 국내 여행 정보 조회 및 여행
            일정 생성 서비스입니다. 전국 방방곡곡의 아름다운 관광지를 탐험하고,
            AI 플래너를 통해 나만의 맞춤형 여행 코스를 만들어보세요. 다양한
            관광지 정보를 확인하고, 원하는 코스를 저장하여 나중에 다시 볼 수
            있습니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;