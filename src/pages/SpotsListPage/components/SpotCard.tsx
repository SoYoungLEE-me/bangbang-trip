import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import type { SpotItem } from "../../../models/spot";
import NoImage from "./NoImage";
import { Heart } from "lucide-react";

interface SpotCardProps {
  spot: SpotItem;
}

const SpotCard = ({ spot }: SpotCardProps) => {
  return (
    <Card
      sx={{
        width: "100%",
        position: "relative",
        "&:hover": {
          ".MuiCardMedia-img": {
            transform: "scale(1.2)",
          },
          ".no-image-icon": {
            transform: "scale(1.4)",
          },
        },
      }}
    >
      <IconButton
        aria-label=""
        sx={(theme) => ({
          width: "36px",
          height: "36px",
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
      >
        <Heart />
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
      <CardActions>
        <Button size="small" sx={{ marginLeft: "auto" }}>
          상세 보기
        </Button>
      </CardActions>
    </Card>
  );
};

export default SpotCard;
