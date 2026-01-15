import { useEffect, useState } from "react";
import UserPlannerForm from "./components/UserPlannerForm";
import { Box, Grid, Typography } from "@mui/material";
import SelectedSpotsPanel from "./components/SelectedSpotsPanel";
import { useSelectedSpotsStore } from "../../stores/selectedSpotsStore";
import AppAlert from "../../common/components/AppAlert";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../lib/supabase";
import { usePlannerFormStore } from "../../stores/plannerFormStore";
import AiPlannerResultPanel from "./components/AiPlannerResultPanel";
import { useAiPlanner } from "../../hooks/useAiPlanner";
import type { TourSpot } from "../../models/tour";

const MOCK_TOUR_SPOTS: TourSpot[] = [
  {
    contentid: "3027228",
    title: "경복궁",
    firstimage:
      "http://tong.visitkorea.or.kr/cms/resource/94/3027194_image2_1.JPG",
    firstimage2: "",
    addr1: "서울특별시 종로구 사직로 161",
    areacode: "1",
    sigungucode: "23",
    contenttypeid: "12",
    mapx: "126.9769",
    mapy: "37.5796",
  },
  {
    contentid: "126508",
    title: "북촌 한옥마을",
    firstimage:
      "http://tong.visitkorea.or.kr/cms/resource/01/2678401_image2_1.jpg",
    firstimage2: "",
    addr1: "서울특별시 종로구 계동길 37",
    areacode: "1",
    sigungucode: "23",
    contenttypeid: "12",
    mapx: "126.9849",
    mapy: "37.5826",
  },
];

const AiPlannerPage = () => {
  const { removeSpot } = useSelectedSpotsStore();
  const { plannerForm, setPlannerForm } = usePlannerFormStore();

  const { user } = useAuthStore();
  const [loginAlertOpen, setLoginAlertOpen] = useState(false);
  const [creditAlertOpen, setCreditAlertOpen] = useState(false);
  const [dailyCredits, setDailyCredits] = useState<number | null>(null);

  const { mutateAsync, data, isPending, isError } = useAiPlanner();

  const handleSubmit = async () => {
    if (!user) {
      setLoginAlertOpen(true);
      return;
    }

    if (dailyCredits === 0) {
      setCreditAlertOpen(true);
      return;
    }

    try {
      await mutateAsync({
        spots: MOCK_TOUR_SPOTS,
        form: plannerForm,
      });

      await supabase
        .from("profiles")
        .update({ daily_credits: dailyCredits! - 1 })
        .eq("id", user.id);

      setDailyCredits((prev) => prev! - 1);
    } catch {
      alert("AI 일정 생성 실패");
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchDailyCredits = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("daily_credits")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("크레딧 조회 실패", error);
        return;
      }

      setDailyCredits(data.daily_credits);
    };

    fetchDailyCredits();
  }, [user]);

  return (
    <Box
      mt={20}
      mb={20}
      px={{
        xs: 3,
        sm: 4,
        md: 8,
        lg: 14,
        xl: 20,
      }}
    >
      {user && dailyCredits !== null && (
        <Box
          mb={4}
          px={3}
          py={2}
          borderBottom="solid 1px"
          borderColor="grey.200"
        >
          <Typography fontWeight={800}>
            오늘 남은 이용 횟수 :{" "}
            <span
              style={{
                color: dailyCredits > 0 ? "#48876b" : "#ef5350",
              }}
            >
              {dailyCredits}
            </span>{" "}
            / 5
          </Typography>
        </Box>
      )}
      <Grid container spacing={6} alignItems="flex-start">
        {/* 담은 장소 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SelectedSpotsPanel spots={MOCK_TOUR_SPOTS} onRemove={removeSpot} />
        </Grid>

        {/* 유저 입력 폼 */}
        <Grid size={{ xs: 12, md: 8 }}>
          <UserPlannerForm
            value={plannerForm}
            onChange={setPlannerForm}
            onSubmit={handleSubmit}
            loading={isPending}
          />
        </Grid>
      </Grid>
      <AppAlert
        open={loginAlertOpen}
        onClose={() => setLoginAlertOpen(false)}
        severity="info"
        message="로그인 후 이용하실 수 있습니다."
      />
      <AppAlert
        open={creditAlertOpen}
        onClose={() => setCreditAlertOpen(false)}
        severity="error"
        message="오늘 사용 가능한 횟수를 모두 사용하셨습니다."
      />
      <Box mt={10}>
        {isError && (
          <Typography color="error">
            일정 생성 중 오류가 발생했습니다.
          </Typography>
        )}

        {data?.itinerary && <AiPlannerResultPanel result={data} />}
      </Box>
    </Box>
  );
};

export default AiPlannerPage;
