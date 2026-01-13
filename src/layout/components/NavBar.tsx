import { Box, AppBar, Toolbar, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Home, MapPin, User, Sparkles } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            transition: "opacity 0.3s ease-in-out",
            "&:hover": {
              opacity: 0.8,
            },
          }}
          onClick={() => navigate("/")}
        >
          <MapPin size={24} color={theme.palette.primary.main} />
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "20px", md: "24px" },
              color: theme.palette.primary.main,
            }}
          >
            전국: 방방곡곡
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button
            color="inherit"
            onClick={() => navigate("/spots")}
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 0.5,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
              "&:active": {
                backgroundColor: theme.palette.action.active,
              },
            }}
          >
            <MapPin size={18} />
            관광지
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/ai-planner")}
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 0.5,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
              "&:active": {
                backgroundColor: theme.palette.action.active,
              },
            }}
          >
            <Sparkles size={18} />
            AI 플래너
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/my")}
            sx={{
              display: "flex",
              gap: 0.5,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
              "&:active": {
                backgroundColor: theme.palette.action.active,
              },
            }}
          >
            <User size={18} />
            마이페이지
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;