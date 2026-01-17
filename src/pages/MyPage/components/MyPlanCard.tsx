import {
  Card,
  Typography,
  Box,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { MapPin, Trash2, ChevronRight, Calendar, Clock } from "lucide-react";
import { alpha } from "@mui/material/styles";
import dayjs from "dayjs";

// 장소 객체 타입 정의
interface Spot {
  title: string;
  addr1: string;
}

interface MyPlanCardProps {
  id: string;
  title: string;
  createdAt: string;
  period?: string; // 여행 기간
  spots?: Spot[]; //그그 유저가 찜한 장소
  onDelete: (id: string) => void;
  onClick: () => void;
}

const MyPlanCard = ({
  id,
  title,
  createdAt,
  period,
  spots = [],
  onDelete,
  onClick,
}: MyPlanCardProps) => {
  const locationText =
    spots.length > 0
      ? spots.length > 1
        ? `${spots[0].title} 외 ${spots.length - 1}곳`
        : spots[0].title
      : "설정된 장소 없음";

  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 4,
        p: 3,
        cursor: "pointer",
        bgcolor: "#ffffff",
        border: "1px solid",
        borderColor: "grey.100",
        boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
          transform: "translateY(-3px)",
          "& .detail-arrow": {
            transform: "translateX(4px)",
            color: "primary.main",
          },
        },
      }}
    >
      <Stack spacing={2}>
        {/* 생성일과 삭제 버튼 */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            fontSize={12}
            fontWeight={600}
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <Clock size={12} /> {dayjs(createdAt).format("YYYY.MM.DD")}
          </Typography>

          <Tooltip title="삭제">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              sx={{
                color: "grey.300",
                "&:hover": {
                  color: "error.main",
                  bgcolor: alpha("#ef5350", 0.05),
                },
              }}
            >
              <Trash2 size={18} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* 유저가 정한 타이틀 */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            fontSize: "1.2rem",
            color: "text.primary",
            lineHeight: 1.3,
            wordBreak: "keep-all",
          }}
        >
          {title}
        </Typography>

        {/* 기간 및 장소 요약 */}
        <Stack spacing={0.8}>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            color="text.secondary"
          >
            <Calendar size={14} color="#48876b" />
            <Typography fontSize={13} fontWeight={500}>
              {period || "기간 정보 없음"}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            color="text.secondary"
          >
            <MapPin size={14} color="#48876b" />
            <Typography
              fontSize={13}
              fontWeight={500}
              noWrap
              sx={{ maxWidth: "200px" }}
            >
              {locationText}
            </Typography>
          </Box>
        </Stack>

        <Box display="flex" justifyContent="flex-end" sx={{ mt: 1 }}>
          <Typography
            fontSize={12}
            fontWeight={700}
            color="text.disabled"
            className="detail-arrow"
            sx={{ display: "flex", alignItems: "center", transition: "0.2s" }}
          >
            자세히 보기 <ChevronRight size={16} />
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default MyPlanCard;
