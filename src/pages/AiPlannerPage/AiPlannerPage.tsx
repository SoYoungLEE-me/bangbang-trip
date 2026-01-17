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
import SavePlanDialog from "./components/SavePlanDialog";

type SaveStatus = "unsaved" | "saving" | "saved";

const AiPlannerPage = () => {
  const { plannerForm, setPlannerForm } = usePlannerFormStore();
  const { selectedSpots, removeSpot } = useSelectedSpotsStore();

  const { user } = useAuthStore();
  const [loginAlertOpen, setLoginAlertOpen] = useState(false);
  const [creditAlertOpen, setCreditAlertOpen] = useState(false);

  const [spotAlertOpen, setSpotAlertOpen] = useState(false);

  const [dailyCredits, setDailyCredits] = useState<number | null>(null);

  const [saveOpen, setSaveOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("unsaved");

  const { mutateAsync, data, isPending, isError } = useAiPlanner();

  // removeSpot 호출 후 localStorage도 업데이트하는 래퍼 함수
  const handleRemoveSpot = (contentid: string) => {
    removeSpot(contentid);
    // store 업데이트 후 localStorage에 저장
    const updatedSpots = selectedSpots.filter((s) => s.contentid !== contentid);
    localStorage.setItem(
      "selected-spots-storage",
      JSON.stringify({ state: { selectedSpots: updatedSpots } })
    );
  };

  //ai 결과 불러오기
  const handleSubmit = async () => {
    if (!user) {
      setLoginAlertOpen(true);
      return;
    }

    // 중복된 dailyCredits 체크 하나로 통합
    if (dailyCredits === 0) {
      setCreditAlertOpen(true);
      return;
    }

    if (selectedSpots.length === 0) {
      setSpotAlertOpen(true);
      return;
    }

    try {
      setSaveStatus("unsaved");
      await mutateAsync({
        spots: selectedSpots,
        form: plannerForm,
      });

      await supabase
        .from("profiles")
        .update({ daily_credits: dailyCredits! - 1 })
        .eq("id", user.id);

      setDailyCredits((prev) => prev! - 1);
    } catch (error) {
      console.error(error);
      alert("AI 일정 생성 중 오류가 발생했습니다.");
    }
  };

  //결과 저장
  const handleSavePlan = async (title: string) => {
    if (!user || !data) return;

    try {
      setSaveStatus("saving");

      await supabase.from("plans").insert({
        user_id: user.id,
        title,
        spots: selectedSpots,
        plan: data,
      });

      setSaveStatus("saved");
    } catch (e) {
      console.error(e);
      setSaveStatus("unsaved"); // 실패 시 복구
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
      mt={9}
      mb={20}
      px={{
        xs: 3,
        sm: 4,
        md: 8,
        lg: 14,
        xl: 20,
      }}
    >
      <Grid container spacing={6} alignItems="flex-start">
        {/* 담은 장소 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SelectedSpotsPanel
            spots={selectedSpots}
            onRemove={handleRemoveSpot}
          />
        </Grid>

        {/* 유저 입력 폼 */}
        <Grid size={{ xs: 12, md: 8 }}>
          <UserPlannerForm
            value={plannerForm}
            onChange={setPlannerForm}
            onSubmit={handleSubmit}
            loading={isPending}
            dailyCredits={user ? dailyCredits : null}
            maxDailyCredits={5}
          />
        </Grid>
      </Grid>
      <AppAlert
        open={loginAlertOpen}
        onConfirm={() => setLoginAlertOpen(false)}
        onCancel={() => setLoginAlertOpen(false)}
        severity="info"
        message="로그인 후 이용하실 수 있습니다."
      />
      <AppAlert
        open={creditAlertOpen}
        onConfirm={() => setLoginAlertOpen(false)}
        onCancel={() => setLoginAlertOpen(false)}
        severity="error"
        message="오늘 사용 가능한 횟수를 모두 사용하셨습니다."
      />
      <AppAlert
        open={spotAlertOpen}
        onConfirm={() => setSpotAlertOpen(false)}
        onCancel={() => setSpotAlertOpen(false)}
        severity="info"
        message="가고 싶은 장소를 먼저 찜해보세요."
      />
      <Box mt={10}>
        {isError && (
          <Typography color="error">
            일정 생성 중 오류가 발생했습니다.
          </Typography>
        )}

        {data?.itinerary && (
          <>
            <AiPlannerResultPanel
              result={data}
              onSave={() => setSaveOpen(true)}
              saveStatus={saveStatus}
            />
            <SavePlanDialog
              open={saveOpen}
              onClose={() => setSaveOpen(false)}
              onConfirm={handleSavePlan}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default AiPlannerPage;
