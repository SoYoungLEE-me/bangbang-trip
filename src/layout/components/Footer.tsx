import { Box, Container, Typography, useTheme, Link } from "@mui/material";
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: "white",
        py: { xs: 4, md: 6 },
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 6 },
            mb: 4,
          }}
        >
          {/* 회사 정보 섹션 */}
          <Box sx={{ flex: { xs: 1, md: 1.5 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <MapPin size={24} color="white" />
              <Typography
                variant="h2"
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                }}
              >
                전국: 방방곡곡
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              한국관광공사 Tour API와 AI를 활용한 국내 여행 정보 조회 및 여행
              일정 생성 서비스입니다.
            </Typography>
            {/* 소셜 미디어 링크 */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link
                href="https://facebook.com"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  "&:hover": { color: "white" },
                  transition: "color 0.3s ease",
                }}
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://instagram.com"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  "&:hover": { color: "white" },
                  transition: "color 0.3s ease",
                }}
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://x.com"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  "&:hover": { color: "white" },
                  transition: "color 0.3s ease",
                }}
              >
                <Twitter size={20} />
              </Link>
            </Box>
          </Box>

          {/* 빠른 링크 섹션 */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                mb: 2,
              }}
            >
              빠른 링크
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Link
                href="/spots"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  fontSize: "14px",
                  "&:hover": {
                    color: "white",
                    textDecoration: "underline",
                  },
                  transition: "color 0.3s ease",
                }}
              >
                관광지 둘러보기
              </Link>
              <Link
                href="/ai-planner"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  fontSize: "14px",
                  "&:hover": {
                    color: "white",
                    textDecoration: "underline",
                  },
                  transition: "color 0.3s ease",
                }}
              >
                AI 여행 플래너
              </Link>
              <Link
                href="/my"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  fontSize: "14px",
                  "&:hover": {
                    color: "white",
                    textDecoration: "underline",
                  },
                  transition: "color 0.3s ease",
                }}
              >
                마이페이지
              </Link>
            </Box>
          </Box>

          {/* 연락처 정보 섹션 */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                mb: 2,
              }}
            >
              문의하기
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Mail size={16} color="rgba(255,255,255,0.8)" />
                <Link
                  href="mailto:contact@example.com"
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    textDecoration: "none",
                    fontSize: "14px",
                    "&:hover": {
                      color: "white",
                      textDecoration: "underline",
                    },
                    transition: "color 0.3s ease",
                  }}
                >
                  contact@example.com
                </Link>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Phone size={16} color="rgba(255,255,255,0.8)" />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  02-1234-5678
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 구분선 */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.2)",
            pt: 3,
            mt: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              gap: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              © 2026 전국: 방방곡곡. All rights reserved.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              <Link
                href="#"
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  fontSize: "12px",
                  "&:hover": {
                    color: "rgba(255,255,255,0.8)",
                    textDecoration: "underline",
                  },
                  transition: "color 0.3s ease",
                }}
              >
                이용약관
              </Link>
              <Link
                href="#"
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  fontSize: "12px",
                  "&:hover": {
                    color: "rgba(255,255,255,0.8)",
                    textDecoration: "underline",
                  },
                  transition: "color 0.3s ease",
                }}
              >
                개인정보처리방침
              </Link>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                한국관광공사 Tour API를 활용하여 제작되었습니다.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;