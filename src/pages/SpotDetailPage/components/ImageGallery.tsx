import { Box, ImageList, ImageListItem } from "@mui/material";
import { srcset } from "../utills/formatters";
import type { SpotImage } from "../../../models/tourDetail";

export const ImageGallery = ({ images }: { images: SpotImage[] }) => {
  if (images.length === 0) return null;
  return (
    <Box sx={{ width: "100%", mb: 10 }}>
      <ImageList
        variant="quilted"
        cols={4}
        rowHeight={200}
        sx={{ borderRadius: 2, overflow: "hidden" }}
      >
        {images.map((item, index) => {
          const isLarge = index === 0 || index === 6;
          const size = isLarge ? 2 : 1;
          return (
            <ImageListItem key={index} cols={size} rows={size}>
              <img
                {...srcset(item.originimgurl, 200, size, size)}
                alt="gallery"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </Box>
  );
};
