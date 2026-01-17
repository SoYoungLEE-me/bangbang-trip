import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { keyframes } from "@mui/system";

const pinBounce = keyframes`
  0%, 100% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  50% {
    transform: translateY(-25px);
    animation-timing-function: ease-in;
  }
`;

const shadowPulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(0.5);
    opacity: 0.1;
  }
`;

const FullScreenLoading = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f9f9f9",
        fontFamily: "'Paperozi', Arial, sans-serif",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 80,
          height: 96,
          mb: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {/* 핀 */}
        <Box
          sx={{
            animation: `${pinBounce} 0.8s infinite`,
          }}
        >
          <svg
            width="50"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
              fill="#2D6A4F"
            />
            <circle cx="12" cy="9" r="3" fill="#f9f9f9" />
          </svg>
        </Box>

        {/* 그림자 */}
        <Box
          sx={{
            width: 24,
            height: 8,
            mt: 1,
            bgcolor: "rgba(0,0,0,0.1)",
            borderRadius: "100%",
            animation: `${shadowPulse} 0.8s infinite`,
          }}
        />
      </Box>

      <Typography
        fontWeight={700}
        fontSize={24}
        letterSpacing="-0.04em"
        color="#090909"
        mb={1}
      >
        전국
        <Box
          component="span"
          sx={{
            mx: 0.5,
            color: "#2D6A4F",
            fontWeight: 700,
          }}
        >
          :
        </Box>
        방방곡곡
      </Typography>

      {/* 로딩 문구 */}
      <Typography fontSize={14} fontWeight={500} color="#434343">
        당신의 여행을 준비하고 있어요{dots}
      </Typography>
    </Box>
  );
};

export default FullScreenLoading;
