import { Box } from "@mui/material";
import { CameraOff } from "lucide-react";

const NoImage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#A8A8A8",
        background: "#E4E4E4",
        aspectRatio: "1.3",
        "& svg": {
          transition: "transform 0.5s",
        },
      }}
    >
      <CameraOff className="no-image-icon" />
    </Box>
  );
};

export default NoImage;
