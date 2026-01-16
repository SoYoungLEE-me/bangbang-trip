import { Box, Stack, Typography, Paper, Chip } from "@mui/material";
import { formatHtmlText } from "../utils/formatters";
import type { TourCourseInfoItem } from "../../../models/tourDetail";
import { useTourSpotDetailCommon } from "../../../hooks/useTourSpotDetailCommon";
import theme from "../../../theme";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router";

interface CourseItemProps {
  course: TourCourseInfoItem;
  idx: number;
}

export const CourseCard = ({ course, idx }: CourseItemProps) => {
  const navigate = useNavigate();

  const { data } = useTourSpotDetailCommon({
    contentId: course.subcontentid || "",
  });

  const spotDetail = data?.response?.body?.items?.item?.[0];
  const address = spotDetail?.addr1;

  const handleCardClick = () => {
    if (course.subcontentid) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(`/spots/${course.subcontentid}`);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: 4,
        border: "1px solid",
        borderColor: "grey.200",
        bgcolor: "grey.50",
        "&:hover": { cursor: "pointer" },
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
          <Chip label={`코스 ${idx + 1}`} color="primary" size="small" />
          <Typography
            onClick={handleCardClick}
            variant="h6"
            sx={{
              fontWeight: 700,
              wordBreak: "keep-all",
              "&:hover": { cursor: "pointer", textDecoration: "underline" },
            }}
          >
            {course.subname}
          </Typography>
        </Stack>

        {address && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.25rem",
              width: "fit-content",
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              px: 1,
              py: 0.5,
              borderRadius: "0.875rem",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            <MapPin size={14} />
            {address.split(" ").slice(0, 2).join(" ")}
          </Box>
        )}

        {course.subdetailimg && (
          <Box
            component="img"
            src={course.subdetailimg}
            alt={course.subname || "코스 이미지"}
            sx={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        )}
        <Typography
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "text.secondary",
            whiteSpace: "pre-line",
            wordBreak: "keep-all",
          }}
        >
          {formatHtmlText(course.subdetailoverview || "")}
        </Typography>
      </Stack>
    </Paper>
  );
};
