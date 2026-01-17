import { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ChevronUp } from "lucide-react";
import { useTheme } from "@mui/material/styles";

const ScrollToTop = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsHovered(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsHovered(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 15,
        right: 15,
        zIndex: 1000,
      }}
    >
      <IconButton
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          width: 40,
          height: 40,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.primary.main,
          opacity: 0.7,
          boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
          transition: "all 0.3s ease",
          "&:hover": {
            opacity: 1,
            backgroundColor: theme.palette.action.hover,
            color: theme.palette.text.primary,
          },
        }}
      >
        {isHovered ? (
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            TOP
          </Typography>
        ) : (
          <ChevronUp size={28} />
        )}
      </IconButton>
    </Box>
  );
};

export default ScrollToTop;