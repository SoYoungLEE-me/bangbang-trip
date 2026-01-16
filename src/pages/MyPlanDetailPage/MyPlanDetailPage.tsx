import {
  Box,
  Typography,
  Stack,
  Chip,
  IconButton,
  Tooltip,
  Snackbar,
  Button,
} from "@mui/material";
import { CalendarDays, MapPin, Share2 } from "lucide-react";
import { alpha, useTheme } from "@mui/material/styles";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import AiPlannerResultPanel from "../AiPlannerPage/components/AiPlannerResultPanel";

import type { AiPlannerResult } from "../../models/aiPlanner";
import type { TourSpot } from "../../models/tour";

interface PlanDetail {
  title: string;
  start_date: string;
  end_date: string;
  spots: TourSpot[];
  plan: AiPlannerResult;
}

const MyPlanDetailPage = () => {
  const { id } = useParams();
  const [planData, setPlanData] = useState<PlanDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [shareSnackbarOpen, setShareSnackbarOpen] = useState(false);

  const theme = useTheme();
  const primary = theme.palette.primary.main;

  useEffect(() => {
    if (!id) return;

    const fetchPlan = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("plans")
        .select("title, start_date, end_date, spots, plan")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("플랜 조회 실패", error);
        setError(true);
        setLoading(false);
        return;
      }

      setPlanData(data);
      setLoading(false);
    };

    fetchPlan();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (error || !planData) {
    return (
      <Box mt={20} textAlign="center">
        <Typography fontWeight={600} fontSize={18}>
          일정을 찾을 수 없습니다.
        </Typography>
      </Box>
    );
  }

  return (
    <Box mt={9} mb={20} px={{ xs: 3, sm: 4, md: 8, lg: 14, xl: 20 }}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
          minHeight: "40px",
        }}
      >
        <Typography
          fontWeight={700}
          fontSize={28}
          sx={{
            textAlign: "center",
            wordBreak: "keep-all",
            px: 6,
          }}
        >
          {planData.title}
        </Typography>

        <Tooltip title="링크 공유하기">
          <IconButton
            size="medium"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(window.location.href);
                setShareSnackbarOpen(true);
              } catch (e) {
                console.error(e);
              }
            }}
            sx={{
              position: "absolute",
              right: 0,
              backgroundColor: alpha(primary, 0.05),
              "&:hover": {
                backgroundColor: alpha(primary, 0.1),
              },
            }}
          >
            <Share2 size={20} color={primary} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          mb: 6,
          p: 4,
          borderRadius: 6,
          bgcolor: alpha(primary, 0.05),
          border: `1px solid ${alpha(primary, 0.25)}`,
        }}
      >
        <Stack spacing={2.5}>
          {/* 여행 기간 */}
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <CalendarDays size={18} color={primary} />
            <Typography fontWeight={800}>여행 기간</Typography>
            <Typography color="text.secondary">
              {planData.start_date && planData.end_date
                ? `${planData.start_date} ~ ${planData.end_date}`
                : "설정한 기간 없음"}
            </Typography>
          </Stack>

          {/* 방문 장소 */}
          <Stack direction="row" alignItems="flex-start" spacing={1.5}>
            <MapPin size={18} color={primary} />
            <Typography fontWeight={800}>방문 장소</Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {planData.spots.map((spot) => (
                <Chip
                  key={spot.contentid}
                  label={spot.title}
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Snackbar
        open={shareSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setShareSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          marginLeft: { xs: 12, sm: 2, md: 0 },
          marginRight: { xs: 12, sm: 2, md: 0 },
          maxWidth: { xs: "calc(100% - 32px)", sm: "600px" },
          "& .MuiSnackbarContent-root": {
            margin: "4px",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            border: `6px solid ${theme.palette.primary.main}`,
            fontWeight: 600,
          },
        }}
        message="공유 링크가 복사되었습니다!"
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => setShareSnackbarOpen(false)}
            sx={{
              fontWeight: 600,
              textTransform: "none",
              color: theme.palette.primary.main,
            }}
          >
            닫기
          </Button>
        }
      />

      <AiPlannerResultPanel result={planData.plan} />
    </Box>
  );
};

export default MyPlanDetailPage;
