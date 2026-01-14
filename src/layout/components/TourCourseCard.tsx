// import { Card, CardMedia, CardContent, IconButton, Typography, useTheme } from "@mui/material";
// import { Heart } from "lucide-react";
// import type { TourSpot } from "../../models/tour";

// interface TourCourseCardProps {
//   course: TourSpot;
//   isSaved: boolean;
//   onSave: (id: string) => void;
// }

// const TourCourseCard = ({ course, isSaved, onSave }: TourCourseCardProps) => {
//   const theme = useTheme();

//   return (
//     <Card
//       sx={{
//         position: "relative",
//         height: "100%",
//         borderRadius: 2,
//         overflow: "hidden",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//         transition: "transform 0.3s ease, box-shadow 0.3s ease",
//         "&:hover": {
//           transform: "translateY(-4px)",
//           boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
//         },
//       }}
//     >
//       <CardMedia
//         component="img"
//         height="200"
//         image={course.firstimage}
//         alt={course.title}
//         sx={{ objectFit: "cover" }}
//       />
//       <IconButton
//         onClick={() => onSave(course.contentid)}
//         sx={{
//           position: "absolute",
//           top: 8,
//           right: 8,
//           backgroundColor: "rgba(255,255,255,0.9)",
//           "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
//         }}
//       >
//         <Heart
//           size={20}
//           fill={isSaved ? theme.palette.error.main : "none"}
//           color={isSaved ? theme.palette.error.main : theme.palette.text.secondary}
//         />
//       </IconButton>
//       <CardContent>
//         <Typography
//           variant="h2"
//           sx={{
//             fontWeight: 600,
//             fontSize: "18px",
//             color: theme.palette.text.primary,
//             mb: 1,
//           }}
//         >
//           {course.title}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default TourCourseCard;

import { Card, CardMedia, CardContent, IconButton, Typography, useTheme } from "@mui/material";
import { Heart } from "lucide-react";
import type { TourSpot, Festival } from "../../models/tour";

interface TourCourseCardProps {
  course: TourSpot | Festival; // Festival도 받을 수 있도록
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
        image={course.firstimage || "https://via.placeholder.com/400"}
        alt={course.title}
        sx={{ objectFit: "cover" }}
      />
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
            fontWeight: 600,
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
        {/* 축제 기간 표시 (Festival인 경우) */}
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