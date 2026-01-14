import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import type { SpotItem } from "../../../models/spot";
import NoImage from "./NoImage";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SpotCardProps {
  spot: SpotItem;
}

const SpotCard = ({ spot }: SpotCardProps) => {
  const navigate = useNavigate();

  const handleNavigateToDetail = () => {
    navigate(`/spots/${spot.contentid}`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card
      sx={{
        width: "100%",
        position: "relative",
        cursor: "pointer",
        "&:hover": {
          ".MuiCardMedia-img": {
            transform: "scale(1.2)",
          },
          ".no-image-icon": {
            transform: "scale(1.4)",
          },
        },
      }}
      onClick={handleNavigateToDetail}
    >
      <IconButton
        aria-label=""
        sx={(theme) => ({
          position: "absolute",
          top: "8px",
          right: "8px",
          zIndex: "1",
          color: theme.palette.text.secondary,
          background: "rgba(255,255,255,0.9)",
          "&:hover": {
            background: "rgba(255,255,255,1)",
          },
        })}
        onClick={handleToggleFavorite}
      >
        <Heart size={20} />
      </IconButton>
      {spot.firstimage ? (
        <Box sx={{ overflow: "hidden" }}>
          <CardMedia
            component="img"
            alt={spot.title}
            image={spot.firstimage}
            draggable="false"
            sx={{ aspectRatio: "1.3", transition: "transform 0.5s" }}
          />
        </Box>
      ) : (
        <NoImage />
      )}
      <CardContent>
        <Typography
          gutterBottom
          variant="h1"
          component="h2"
          sx={{ fontSize: "18px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {spot.title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {spot.addr1} {spot.addr2 && spot.addr2}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SpotCard;
