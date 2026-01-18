import { Box, Typography, Stack, IconButton } from "@mui/material";
import { Trash2, ImageOff, Heart } from "lucide-react";
import type { TourSpot } from "../../../models/tour";
import { useNavigate } from "react-router-dom";

interface SelectedSpotsPanelProps {
  spots: TourSpot[];
  onRemove: (contentid: string) => void;
  onClearAll: () => void;
}

const SelectedSpotsPanel = ({
  spots,
  onRemove,
  onClearAll,
}: SelectedSpotsPanelProps) => {
  const navigate = useNavigate();

  const isEmpty = spots.length === 0;

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography
          fontWeight={900}
          fontSize={20}
          display="flex"
          alignItems="center"
          gap={1}
        >
          <Heart size={20} />
          찜한 장소 ({spots.length})
        </Typography>

        {!isEmpty && (
          <IconButton
            size="small"
            onClick={onClearAll}
            sx={{
              color: "error.main",
              border: "1px solid",
              borderColor: "error.light",
              borderRadius: 2,

              "&:hover": {
                bgcolor: "error.light",
                color: "error.dark",
              },
            }}
          >
            <Trash2 size={18} />
          </IconButton>
        )}
      </Stack>

      <Box
        sx={{
          p: 4,
          borderRadius: 6,
          border: "2px dashed",
          borderColor: "grey.400",
          minHeight: 220,
          display: "flex",
          alignItems: isEmpty ? "center" : "flex-start",
          justifyContent: isEmpty ? "center" : "flex-start",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        {isEmpty ? (
          /* 빈 상태 */
          <Typography
            fontWeight={700}
            color="primary.main"
            textAlign="center"
            sx={{
              cursor: "pointer",
              textDecoration: "underline",
              "&:hover": {
                color: "primary.dark",
              },
            }}
            onClick={() => navigate("/spots")}
          >
            가고 싶은 장소를 찜해보세요.
          </Typography>
        ) : (
          /* 찜한 장소 카드들 */
          <Stack
            spacing={2}
            width="100%"
            sx={{
              maxHeight: 280,
              overflowY: "auto",
              pr: 1,
            }}
          >
            {spots.map((spot) => {
              const image = spot.firstimage || spot.firstimage2 || null;

              return (
                <Box
                  key={spot.contentid}
                  onClick={() => navigate(`/spots/${spot.contentid}`)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    px: 3,
                    py: 2,
                    borderRadius: 5,
                    border: "1px solid",
                    borderColor: "grey.300",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "primary.light",
                      backgroundColor: "primary.50",
                    },
                  }}
                >
                  {/* 썸네일 */}
                  {image ? (
                    <Box
                      component="img"
                      src={image}
                      alt={spot.title}
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: "grey.100",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <ImageOff size={16} />
                    </Box>
                  )}

                  {/* 제목 */}
                  <Typography
                    fontWeight={800}
                    fontSize={15}
                    sx={{ flex: 1 }}
                    noWrap
                  >
                    {spot.title}
                  </Typography>

                  {/* 삭제 */}
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation(); // 부모 클릭 막기
                      onRemove(spot.contentid);
                    }}
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </Box>
              );
            })}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default SelectedSpotsPanel;
