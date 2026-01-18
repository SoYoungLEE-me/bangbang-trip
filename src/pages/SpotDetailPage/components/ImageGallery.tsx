import { Box, ImageList, ImageListItem } from "@mui/material";
import { srcset } from "../utils/formatters";
import type { SpotImage } from "../../../models/tourDetail";

export const ImageGallery = ({ images }: { images: SpotImage[] }) => {
  if (images.length === 0) return null;

  // HTTP를 HTTPS로 변환하는 함수
  const toSecureUrl = (url: string) => {
    if (!url) return url;
    return url.replace(/^http:/, "https:");
  };

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
          const secureUrl = toSecureUrl(item.originimgurl);

          return (
            <ImageListItem key={index} cols={size} rows={size}>
              <img
                {...srcset(secureUrl, 200, size, size)}
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
