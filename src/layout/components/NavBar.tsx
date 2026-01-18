import {
  alpha,
  Box,
  IconButton,
  Link,
  Button,
  Menu,
  MenuItem,
  Badge,
  Typography,
} from "@mui/material";
import theme from "../../theme";
import { User, Search, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import { useSelectedSpotsStore } from "../../stores/selectedSpotsStore";
import { signOut } from "../../services/auth";

// 공통 컴포넌트 추가
const ResponsiveNavItem = ({
  icon: Icon,
  text,
}: {
  icon: LucideIcon;
  text: string;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: 1,
    }}
  >
    <Box
      sx={{
        display: { xs: "block", sm: "none" },
        lineHeight: 0,
      }}
    >
      <Icon size={20} />
    </Box>
    <Box
      sx={{
        display: { xs: "none", sm: "inline" },
        lineHeight: 1.5,
      }}
    >
      {text}
    </Box>
  </Box>
);

const NavBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user } = useAuthStore();
  const { selectedSpots } = useSelectedSpotsStore();
  const spotCount = selectedSpots.length;

  // 공통 Link 스타일
  const commonLinkSx = {
    fontSize: "1rem",
    fontWeight: "500",
    textDecoration: "none",
    color: "inherit",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "&:hover": {
      color: "action.hover",
    },
    "&.active": {
      color: "action.active",
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        zIndex: 3,
        padding: "0.625rem 1rem",
        top: 0,
        backgroundColor: "background.default",
        boxShadow: `0 0.1rem 0.5rem ${alpha(
          theme.palette.text.secondary,
          0.2,
        )}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <Link
          component={NavLink}
          to="/"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: "0.2rem", sm: "0.25rem" },
            color: "text.primary",
            fontFamily: "KnpsOdaesan",
            fontWeight: 900,
            textDecoration: "none",

            fontSize: {
              lg: "1.5rem",
              md: "1.375rem",
              sm: "1.375rem",
              xs: "1rem",
            },
          }}
          mt={0.5}
          mb={0.5}
        >
          <Box
            component="img"
            src={logo}
            alt="전국: 방방곡곡 로고"
            sx={{
              height: { xs: "2rem", sm: "2.35rem", md: "2.7rem" },
              width: "auto",
            }}
            mr={0.5}
          />
          <Typography
            component="span"
            sx={{
              fontFamily: "KnpsOdaesan",
              fontWeight: 900,
              fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.5rem" },
              color: "text.primary",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            전국: 방방곡곡
          </Typography>
        </Link>

        <Box
          component="ul"
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            gap: "1.875rem",
            listStyle: "none",
            padding: 0,
            margin: 0,
            height: "100%",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          gap: "1rem",
        }}
      >
        {/* 모바일: 탐색, AI 플래너 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1.4rem",
            height: "100%",
          }}
        >
          <Link component={NavLink} to="/spots" sx={commonLinkSx}>
            <ResponsiveNavItem icon={Search} text="탐색" />
          </Link>
          <Badge
            badgeContent={spotCount}
            invisible={spotCount === 0}
            showZero={false}
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              "& .MuiBadge-badge": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.default,
                fontSize: "0.75rem",
                fontWeight: 600,
                minWidth: "17px",
                height: "18px",
                padding: "4px",
                transform: "translate(100%, -50%)",
              },
            }}
          >
            <Link
              component={NavLink}
              to="/ai-planner"
              onClick={() => {
                setTimeout(() => {
                  window.scrollTo(0, 0);
                }, 0);
              }}
              sx={commonLinkSx}
            >
              <ResponsiveNavItem icon={Sparkles} text="AI 플래너" />
            </Link>
          </Badge>
        </Box>
        {!user ? (
          <Button
            onClick={() => navigate("/login")}
            variant="text"
            sx={{
              fontWeight: 500,
              fontSize: "1rem",
              color: "text.primary",
              textTransform: "none",
              minWidth: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              "&:hover": {
                backgroundColor: "transparent",
                color: "action.hover",
              },
            }}
          >
            <ResponsiveNavItem icon={User} text="로그인" />
          </Button>
        ) : (
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              width: "2.5rem",
              height: "2.5rem",
              color: "text.primary",
              "&:hover": {
                color: "action.hover",
              },
            }}
            aria-label="유저 메뉴"
          >
            <User size={20} />
          </IconButton>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        disableScrollLock
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            minWidth: "auto",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate("/mypage");
          }}
        >
          마이페이지
        </MenuItem>

        <MenuItem
          onClick={async () => {
            setAnchorEl(null);
            await signOut();
            navigate("/login");
          }}
        >
          로그아웃
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavBar;
