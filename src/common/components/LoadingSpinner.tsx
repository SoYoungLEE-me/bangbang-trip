import { Box, CircularProgress } from "@mui/material";

interface SpinnerProps {
  size?: number;
  thickness?: number;
}

const LoadingSpinner = ({ size = 40, thickness = 4 }: SpinnerProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <CircularProgress color="primary" size={size} thickness={thickness} />
    </Box>
  );
};

export default LoadingSpinner;
