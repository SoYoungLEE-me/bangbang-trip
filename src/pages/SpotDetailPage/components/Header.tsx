import { Box, Typography, Chip, Paper, alpha } from "@mui/material";
import type { SpotCommon } from "../../../models/tourDetail";
import theme from "../../../theme";

export const Header = ({ spot }: { spot: SpotCommon }) => {
  if (!spot) return null;

  console.log("spot", spot);

  return (
    <Box sx={{ width: "100%", textAlign: "center", mb: { xs: 5, md: 6 } }}>
      {spot.contenttypeid === "25" && !spot.addr1 && (
        <Chip
          label={"추천 코스"}
          color="secondary"
          sx={{
            mb: 2,
            fontWeight: 600,
            px: 1,
            color: theme.palette.primary.main,
          }}
        />
      )}
      {spot.addr1 && (
        <Chip
          label={spot.addr1.split(" ").slice(0, 2).join(" ")}
          color="primary"
          sx={{ mb: 2, fontWeight: 500, px: 1 }}
        />
      )}
      <Box sx={{ display: "block", mb: { lg: 7, md: 5, xs: 5 } }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2rem", md: "3.5rem" },
            fontWeight: 800,
            wordBreak: "keep-all",
            display: "inline",
            background: `linear-gradient(180deg, transparent 60%, ${alpha(
              theme.palette.primary.main,
              0.3
            )} 60%)`,
            boxDecorationBreak: "clone",
            WebkitBoxDecorationBreak: "clone",
          }}
        >
          {spot.title}
        </Typography>
      </Box>
      {spot.firstimage && (
        <Paper
          elevation={0}
          sx={{ borderRadius: 3, overflow: "hidden", mb: { xs: 1, md: 8 } }}
        >
          <Box
            component="img"
            src={spot.firstimage}
            alt={spot.title}
            sx={{
              width: "100%",
              height: { xs: "300px", md: "600px" },
              objectFit: "cover",
            }}
          />
        </Paper>
      )}
    </Box>
  );
};
