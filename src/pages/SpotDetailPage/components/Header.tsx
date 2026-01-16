import { Box, Typography, Chip, Paper } from "@mui/material";
import type { SpotCommon } from "../../../models/tourDetail";

export const Header = ({ spot }: { spot: SpotCommon }) => {
  if (!spot) return null;

  return (
    <Box sx={{ width: "100%", textAlign: "center", mb: { xs: 5, md: 6 } }}>
      {spot.addr1 && (
        <Chip
          label={spot.addr1.split(" ").slice(0, 2).join(" ")}
          color="primary"
          sx={{ mb: 2, fontWeight: 500, px: 1 }}
        />
      )}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2.25rem", md: "3.5rem" },
          fontWeight: 800,
          mb: { lg: 7, md: 5, xs: 5 },
          wordBreak: "keep-all",
        }}
      >
        {spot.title}
      </Typography>
      <Paper
        elevation={0}
        sx={{ borderRadius: 3, overflow: "hidden", mb: { xs: 1, md: 8 } }}
      >
        <Box
          component="img"
          src={spot.firstimage || "/api/placeholder/800/500"}
          alt={spot.title}
          sx={{
            width: "100%",
            height: { xs: "300px", md: "600px" },
            objectFit: "cover",
          }}
        />
      </Paper>
    </Box>
  );
};
