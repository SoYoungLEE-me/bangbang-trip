import { Box, Container, Typography, useTheme, Link } from "@mui/material";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const theme = useTheme();

  // 공통 스타일 정의
  const sectionTitleSx = {
    fontSize: "16px",
    fontWeight: 600,
    mb: 2,
  };

  const sectionContainerSx = {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
  };

  const socialLinkSx = {
    color: "rgba(255,255,255,0.8)",
    "&:hover": { color: theme.palette.background.default },
    transition: "color 0.3s ease",
  };

  const internalLinkSx = {
    color: "rgba(255,255,255,0.8)",
    textDecoration: "none",
    fontSize: "14px",
    "&:hover": {
      color: theme.palette.background.default,
      textDecoration: "underline",
    },
    transition: "color 0.3s ease",
  };

  const bottomLinkSx = {
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    fontSize: "12px",
    "&:hover": {
      color: "rgba(255,255,255,0.8)",
      textDecoration: "underline",
    },
    transition: "color 0.3s ease",
  };

  // 소셜 미디어 링크 데이터
  const socialLinks = [
    { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
    { href: "https://x.com", icon: Twitter, label: "Twitter" },
  ] as const;

  // 빠른 링크 데이터
  const quickLinks = [
    { to: "/spots", label: "관광지 둘러보기" },
    { to: "/ai-planner", label: "AI 여행 플래너" },
    { to: "/mypage", label: "마이페이지" },
  ] as const;

  // 하단 링크 데이터
  const bottomLinks = [
    { href: "#", label: "이용약관" },
    { href: "#", label: "개인정보처리방침" },
  ] as const;

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.default,
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
              <MapPin size={24} color={theme.palette.background.default} />
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
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={socialLinkSx}
                  aria-label={label}
                >
                  <Icon size={20} />
                </Link>
              ))}
            </Box>
          </Box>

          {/* 빠른 링크 섹션 */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" sx={sectionTitleSx}>
              빠른 링크
            </Typography>
            <Box sx={sectionContainerSx}>
              {quickLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  component={NavLink}
                  to={to}
                  onClick={() => window.scrollTo(0, 0)}
                  sx={internalLinkSx}
                >
                  {label}
                </Link>
              ))}
            </Box>
          </Box>

          {/* 연락처 정보 섹션 */}
          <Box sx={{ flex: 1 }}>
           <Typography variant="h3" sx={sectionTitleSx}>
              문의하기
            </Typography>
            <Box sx={sectionContainerSx}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Mail size={16} color="rgba(255,255,255,0.8)" />
                <Link
                  href="mailto:contact@example.com"
                  sx={internalLinkSx}
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
              {bottomLinks.map(({ href, label }) => (
                <Link key={label} href={href} sx={bottomLinkSx}>
                  {label}
                </Link>
              ))}
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