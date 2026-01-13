import { Card, CardMedia, CardContent, IconButton, Typography, useTheme } from "@mui/material";
import { Heart } from "lucide-react";
import type { TourSpot } from "../../models/tour";

interface TourCourseCardProps {
  course: TourSpot;
  isSaved: boolean;
  onSave: (id: string) => void;
}

const TourCourseCard = ({ course, isSaved, onSave }: TourCourseCardProps) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        position: "relative",
        height: "100%",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={course.firstimage}
        alt={course.title}
        sx={{ objectFit: "cover" }}
      />
      <IconButton
        onClick={() => onSave(course.contentid)}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "rgba(255,255,255,0.9)",
          "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
        }}
      >
        <Heart
          size={20}
          fill={isSaved ? theme.palette.error.main : "none"}
          color={isSaved ? theme.palette.error.main : theme.palette.text.secondary}
        />
      </IconButton>
      <CardContent>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            color: theme.palette.text.primary,
            mb: 1,
          }}
        >
          {course.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TourCourseCard;