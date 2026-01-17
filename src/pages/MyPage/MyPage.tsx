import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Stack,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuthStore } from "../../stores/authStore";
import MyPlanCard from "./components/MyPlanCard";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import AppAlert from "../../common/components/AppAlert";
import { Map as MapIcon, Trash2 } from "lucide-react";

interface MyPlan {
  id: string;
  title: string;
  created_at: string;
  spots: {
    title: string;
    addr1: string;
  }[];
  plan: {
    itinerary: {
      day: number;
    }[];
  };
}

const MyPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [plans, setPlans] = useState<MyPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteAllOpen, setDeleteAllOpen] = useState(false); //전체 삭제용

  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchPlans = async () => {
      //이름 조회
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single();

      if (!profileError && profileData?.name) {
        setUserName(profileData.name);
      }
      //저장한 플랜 조회
      const { data, error } = await supabase
        .from("plans")
        .select("id, title, created_at, spots, plan")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("플랜 조회 실패", error);
      } else {
        setPlans(data ?? []);
      }

      setLoading(false);
    };

    fetchPlans();
  }, [user]);

  //개별 삭제용
  const handleDeletePlan = (id: string) => {
    setDeleteTargetId(id);
  };

  const confirmDeletePlan = async () => {
    if (!deleteTargetId || !user) return;

    await supabase
      .from("plans")
      .delete()
      .eq("id", deleteTargetId)
      .eq("user_id", user.id);

    setPlans((prev) => prev.filter((plan) => plan.id !== deleteTargetId));

    setDeleteTargetId(null);
  };

  const cancelDeletePlan = () => {
    setDeleteTargetId(null);
  };

  //전체 삭제용
  const handleDeleteAllPlans = () => {
    setDeleteAllOpen(true);
  };

  const confirmDeleteAllPlans = async () => {
    if (!user) return;

    const { error } = await supabase
      .from("plans")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error("전체 삭제 실패", error);
      return;
    }

    setPlans([]);
    setDeleteAllOpen(false);
  };

  const cancelDeleteAllPlans = () => {
    setDeleteAllOpen(false);
  };

  const getPeriodText = (plan: MyPlan["plan"]) => {
    const days = plan?.itinerary?.length ?? 0;
    return days > 0 ? `${days}일 일정` : "기간 정보 없음";
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box mt={10} px={{ xs: 3, md: 8 }} mb={10}>
      <Box mb={6}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          {/* 왼쪽 타이틀 영역 */}
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "primary.main",
                color: "white",
                p: 1,
                borderRadius: 2,
              }}
            >
              <MapIcon size={24} />
            </Box>

            <Typography
              variant="h4"
              fontWeight={900}
              sx={{ letterSpacing: "-0.5px" }}
            >
              나의 여행 기록
            </Typography>

            <Chip
              label={`${plans.length}개`}
              size="small"
              sx={{
                fontWeight: 700,
                bgcolor: "grey.100",
                color: "text.secondary",
              }}
            />
          </Stack>

          {/* 오른쪽 액션 영역 */}
          {plans.length > 0 && (
            <Tooltip title="전체 여행 일정 삭제">
              <IconButton
                onClick={handleDeleteAllPlans}
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
                <Trash2 size={20} />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
        <Typography color="text.secondary" fontSize={16}>
          {userName
            ? `${userName}님이 계획한 방방곡곡 여행지들을 확인해 보세요.`
            : "내가 계획한 방방곡곡 여행지들을 확인해 보세요."}
        </Typography>
      </Box>

      {plans.length === 0 ? (
        <Box display="flex" justifyContent="center">
          <Typography color="text.secondary">
            아직 저장한 일정이 없어요.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {plans.map((plan) => (
            <Grid key={plan.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <MyPlanCard
                id={plan.id}
                title={plan.title}
                createdAt={plan.created_at}
                period={getPeriodText(plan.plan)}
                spots={plan.spots}
                onDelete={handleDeletePlan}
                onClick={() => navigate(`/my-plan/${plan.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <AppAlert
        open={Boolean(deleteTargetId)}
        message="이 여행 일정을 삭제할까요?"
        severity="error"
        confirmText="삭제"
        onConfirm={confirmDeletePlan}
        onCancel={cancelDeletePlan}
      />
      <AppAlert
        open={deleteAllOpen}
        message="저장된 모든 여행 일정을 삭제할까요? 이 작업은 되돌릴 수 없어요."
        severity="error"
        confirmText="전체 삭제"
        onConfirm={confirmDeleteAllPlans}
        onCancel={cancelDeleteAllPlans}
      />
    </Box>
  );
};

export default MyPage;
