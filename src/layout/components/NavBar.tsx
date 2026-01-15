import { alpha, Box, IconButton, Link } from "@mui/material";
import theme from "../../theme";
import { LogIn, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        padding: "0.625rem 1rem",
        backdropFilter: "blur(3px)",
        backgroundColor: `${alpha(theme.palette.background.default, 10)}`,
        zIndex: 999,
        boxShadow: `0 0.1rem 0.5rem ${alpha(
          theme.palette.text.secondary,
          0.2
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
            color: "text.primary",
            fontFamily: "KnpsOdaesan",
            fontWeight: "900",
            textDecoration: "none",
            fontSize: {
              lg: "2rem",
              md: "1.875rem",
              sm: "1.875rem",
              xs: "1.625rem",
            },
          }}
        >
          전국: 방방곡곡
        </Link>

        <ul
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.875rem",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          <Link
            component={NavLink}
            to="/"
            sx={{
              fontSize: { lg: "1rem", md: "0.875rem" },
              fontWeight: "500",
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.2s ease",
              "&:hover": {
                color: "action.hover",
              },
              "&.active": {
                color: "action.active",
              },
            }}
          >
            홈
          </Link>
          <Link
            component={NavLink}
            to="/spots"
            sx={{
              fontSize: { lg: "1rem", md: "0.875rem" },
              fontWeight: "500",
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.2s ease",
              "&:hover": {
                color: "action.hover",
              },
              "&.active": {
                color: "action.active",
              },
            }}
          >
            탐색
          </Link>
          <Link
            component={NavLink}
            to="/ai-planner"
            sx={{
              fontSize: { lg: "1rem", md: "0.875rem" },
              fontWeight: "500",
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.2s ease",
              "&:hover": {
                color: "action.hover",
              },
              "&.active": {
                color: "action.active",
              },
            }}
          >
            AI 플래너
          </Link>
        </ul>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <IconButton
          onClick={() => navigate("/login")}
          sx={{
            width: "2rem",
            color: "text.primary",
            "&:hover": {
              color: "action.hover",
            },
          }}
        >
          <LogIn size={16} />
        </IconButton>
        {/* <IconButton
          sx={{
            width: "2rem",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.paper,
            borderRadius: "0.875rem",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.default,
            },
          }}
        >
          <User size={16} />
        </IconButton> */}
      </Box>
    </Box>
  );
};

export default NavBar;
