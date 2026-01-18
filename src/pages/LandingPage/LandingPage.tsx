import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Grid,
  CircularProgress,
  Alert,
  Button,
  useTheme,
  Tooltip,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ChevronRightIcon,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";
import {
  usePopularSpots,
  useNearbyCourses,
  useFestivals,
} from "../../hooks/useTourSpots";
import { useNavigate, useLocation } from "react-router-dom";
import TourCourseCard from "../../layout/components/TourCourseCard";
import AppAlert from "../../common/components/AppAlert";

const LandingPage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const SLIDE_COUNT = 10;

  const {
    data: festivals = [],
    isLoading: isLoadingFestivals,
    isError: isErrorFestivals,
  } = useFestivals();

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

  // SLIDE_COUNT를 축제 데이터 길이에 맞게 조정
  const actualSlideCount = Math.min(nearbyCourses.length, SLIDE_COUNT);

  // currentSlide가 데이터 범위를 벗어나지 않도록 보정
  useEffect(() => {
    if (actualSlideCount > 0 && currentSlide >= actualSlideCount) {
      setCurrentSlide(0);
    }
  }, [actualSlideCount, currentSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? actualSlideCount - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === actualSlideCount - 1 ? 0 : prev + 1));
  };

  //로그인 회원 가입 알림 처리를 위한 것
  useEffect(() => {
    if (!location.state?.authSuccess) return;

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (location.state.authSuccess === "login") {
      setAlertMessage("로그인 되었습니다.");
      setAlertOpen(true);
    }

    if (location.state.authSuccess === "register") {
      setAlertMessage("회원가입이 완료되었습니다.");
      setAlertOpen(true);
    }

    // ⭐ state 초기화 (뒤로가기 / 새로고침 방지)
    window.history.replaceState({}, document.title);
  }, [location.state]);

  // 4초마다 자동으로 슬라이드 넘기기
  useEffect(() => {
    if (isPaused || actualSlideCount === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === actualSlideCount - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [actualSlideCount, isPaused]);

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  // 컴포넌트 내부에 헬퍼 함수 추가
  const SectionHeader = ({
    title,
    onMoreClick,
  }: {
    title: string;
    onMoreClick: () => void;
  }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: { xs: "sticky", md: "static" },
        top: { xs: "56px", sm: "56px" },
        zIndex: 2,
        mb: 4,
        backgroundColor: theme.palette.background.default,
        py: { xs: 2, md: 0 },
        mx: { xs: -2, sm: -3, md: 0 },
        px: { xs: 2, sm: 3, md: 0 },
        boxShadow: {
          xs: "0 2px 8px rgba(0,0,0,0.1), 0 -2px 8px rgba(0,0,0,0.1)",
          md: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "24px", md: "32px" },
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>
          <Button
            onClick={onMoreClick}
            sx={{
              fontSize: { xs: "14px", md: "16px" },
              fontWeight: 500,
              color: theme.palette.text.secondary,
              textTransform: "none",
              "&:hover": {
                color: theme.palette.primary.main,
                backgroundColor: "transparent",
              },
            }}
          >
            더 보기
          </Button>
        </Box>
      </Container>
    </Box>
  );

  // 로딩 상태
  if (isLoadingFestivals || isLoadingCourses || isLoadingSpots) {
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
  if (isErrorFestivals || isErrorCourses || isErrorSpots) {
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
      {/* 슬라이드 섹션 */}
      {nearbyCourses.length > 0 && (
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
            {/* 코스 슬라이드 */}
            {nearbyCourses.slice(0, actualSlideCount).map((course, index) => (
              <Box
                key={course.contentid}
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  opacity: index === currentSlide ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                  backgroundImage: `url(${course.firstimage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  "&::after": {
                    content: '""',
                    display: "block",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 20.32%, rgba(0, 0, 0, 0.00735012) 26.35%, rgba(0, 0, 0, 0.0301835) 32.38%, rgba(0, 0, 0, 0.0694109) 38.41%, rgba(0, 0, 0, 0.1253) 44.44%, rgba(0, 0, 0, 0.197009) 50.46%, rgba(0, 0, 0, 0.282101) 56.49%, rgba(0, 0, 0, 0.376288) 62.52%, rgba(0, 0, 0, 0.473712) 68.55%, rgba(0, 0, 0, 0.567899) 74.58%, rgba(0, 0, 0, 0.652991) 80.61%, rgba(0, 0, 0, 0.7247) 86.64%, rgba(0, 0, 0, 0.780589) 92.67%, rgba(0, 0, 0, 0.819817) 98.7%, rgba(0, 0, 0, 0.84265) 104.73%, rgba(0, 0, 0, 0.85) 110.76%);",
                    pointerEvents: "none",
                  },
                }}
              >
                {/* 코스 Title */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    textAlign: "center",
                    color: theme.palette.background.default,
                    mt: { xs: 10, md: 15 },
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "18px", sm: "26px", md: "44px" },
                      fontWeight: 700,
                      mb: { xs: 1, md: 1 },
                      wordBreak: "keep-all",
                      overflowWrap: "break-word",
                      maxWidth: "100%",
                      mx: "auto",
                    }}
                  >
                    {course.title}
                  </Typography>

                  {/* 자세히 보기 버튼 */}
                  <Button
                    onClick={() => { navigate(`/spots/${course.contentid}`); window.scrollTo(0, 0); }}
                    sx={{
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      color: theme.palette.background.default,
                      borderRadius: 1,
                      px: { xs: 1, md: 2 },
                      py: { xs: 0.5, md: 0.5 },
                      mb: { xs: 2, md: -1 },
                      fontSize: { xs: "10px", md: "15px" },
                      display: "flex",
                      alignItems: "center",
                      margin: "auto",
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
          {nearbyCourses.length > 1 && actualSlideCount > 1 && (
            <>
              <IconButton
                onClick={handlePrevSlide}
                sx={{
                  position: "absolute",
                  left: { xs: 10, md: 20 },
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255,255,255,0.3)",
                  color: theme.palette.background.paper,
                  "&:hover": {
                    backgroundColor: theme.palette.background.default,
                    opacity: 0.8,
                    color: theme.palette.primary.main,
                  },
                  zIndex: 1,
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
                  backgroundColor: "rgba(255,255,255,0.3)",
                  color: theme.palette.background.paper,
                  "&:hover": {
                    backgroundColor: theme.palette.background.default,
                    opacity: 0.8,
                    color: theme.palette.primary.main,
                  },
                  zIndex: 1,
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
                  alignItems: "center",
                  gap: 2,
                  zIndex: 2,
                }}
              >
                <Box sx={{ display: "flex", gap: 1 }}>
                  {nearbyCourses.slice(0, actualSlideCount).map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      sx={{
                        width: currentSlide === index ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor:
                          currentSlide === index
                            ? theme.palette.background.default
                            : "rgba(255,255,255,0.5)",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </Box>

                {/* 일시정지/재생 버튼 */}
                <Tooltip title={isPaused ? "재생" : "일시정지"} placement="top">
                  <IconButton
                    onClick={handleTogglePause}
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.3)",
                      color: theme.palette.background.paper,
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.8)",
                        color: theme.palette.text.secondary,
                      },
                      width: 30,
                      height: 30,
                    }}
                  >
                    {isPaused ? <Play size={18} /> : <Pause size={18} />}
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}
        </Box>
      )}

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* 진행 중인 축제 카드 섹션 */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>          
        <SectionHeader title="진행 중인 축제" onMoreClick={() => { navigate("/spots"); window.scrollTo(0, 0); } } />
          {/* 진행 중인 축제 카드 */}
          <Grid container spacing={3}>
            {festivals.map((festival) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={festival.contentid}>
                <TourCourseCard course={festival} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 인기 관광지 카드 섹션 */}
        <Box sx={{ mt: { xs: 6, md: 8 } }}>          
        <SectionHeader title="인기 관광지" onMoreClick={() => { navigate("/spots"); window.scrollTo(0, 0); }} />
          {/* 인기 관광지 카드 */}          
          <Grid container spacing={3}>
            {popularSpots.slice(0, 8).map((spot) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={spot.contentid}>
                <TourCourseCard course={spot} />
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
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            mt: { xs: 6, md: 8 },
            mb: { xs: 4, md: 4 },
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
              my: "25px",
            }}
          >
            한국관광공사 Tour API와 AI를 활용한 국내 여행 정보 조회 및 여행 일정
            생성 서비스입니다. 전국 방방곡곡의 아름다운 관광지를 탐험하고, AI
            플래너를 통해 나만의 맞춤형 여행 코스를 만들어보세요. 다양한 관광지
            정보를 확인하고, 원하는 코스를 저장하여 나중에 다시 볼 수 있습니다.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => {
                navigate("/ai-planner");
                window.scrollTo(0, 0);
              }}
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.default,
                px: { xs: 3, md: 4 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                  color: theme.palette.text.secondary,
                },
              }}
            >
              <Sparkles size={20} />
              지금 나만의 여행 코스 만들기
            </Button>
          </Box>
        </Box>
      </Container>
      <AppAlert
        open={alertOpen}
        message={alertMessage}
        severity="success"
        onConfirm={() => setAlertOpen(false)}
        onCancel={() => setAlertOpen(false)}
      />
    </Box>
  );
};

export default LandingPage;