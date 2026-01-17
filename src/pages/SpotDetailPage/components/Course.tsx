import { Box, Stack, Typography } from "@mui/material";
import { LandPlot } from "lucide-react";
import type { TourCourseInfoItem } from "../../../models/tourDetail";
import { CourseCard } from "./CourseCard";

interface CourseProps {
  courseInfos: TourCourseInfoItem[];
}

export const Course = ({ courseInfos }: CourseProps) => {
  if (courseInfos.length === 0) return null;

  return (
    <Box sx={{ width: "100%", mb: { xs: 6, md: 10 } }}>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3.5 }}>
        <Box
          sx={{ bgcolor: "#e3fdf1ff", p: 1, borderRadius: 4, display: "flex" }}
        >
          <LandPlot size={24} color="#19d2ccff" />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          코스 정보
        </Typography>
      </Stack>

      <Stack spacing={4}>
        {courseInfos.map((course, idx) => (
          <CourseCard key={idx} course={course} idx={idx} />
        ))}
      </Stack>
    </Box>
  );
};
