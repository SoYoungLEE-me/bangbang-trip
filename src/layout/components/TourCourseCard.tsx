import { Card, CardMedia, CardContent, IconButton, Typography, useTheme, Box } from "@mui/material";
import { Heart, ImageOff } from "lucide-react";
import type { TourSpot, Festival } from "../../models/tour";

interface TourCourseCardProps {
  course: TourSpot | Festival;
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
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      {course.firstimage ? (
        <CardMedia
          component="img"
          height="200"
          image={course.firstimage}
          alt={course.title}
          sx={{ objectFit: "cover" }}
        />
      ) : (
        <Box
          sx={{
            height: "200",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.palette.grey[200],
          }}
        >
          <ImageOff            
              height= {200}
              size= {50}
              color= {theme.palette.grey[600]}           
          />
        </Box>
      )}
      <IconButton
        onClick={() => onSave(course.contentid)}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "rgba(255,255,255,0.5)",
          "&:hover": { backgroundColor: "rgba(255,255,255,8)" },
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
            fontWeight: 700,
            fontSize: "18px",
            color: theme.palette.text.primary,
            mb: 1,
            display: "block",
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {course.title}
        </Typography>
        {/* 축제 기간 표시 */}
        {"eventstartdate" in course && course.eventstartdate && course.eventenddate && (
          <Typography
            variant="body2"
            sx={{
              fontSize: "14px",
              color: theme.palette.text.secondary,
              mt: 0.5,
            }}
          >
            {course.eventstartdate.replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3")} ~ {course.eventenddate.replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3")}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TourCourseCard;