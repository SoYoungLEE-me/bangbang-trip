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

  const defaultTitle = "나만의 여행 일정";

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

    if (selectedSpots.length === 0) {
      setSpotAlertOpen(true);
      return;
    }

    const { data: credits, error } = await supabase.rpc(
      "reset_daily_credits_if_needed",
      {
        user_id: user.id,
        max_credits: 5,
      }
    );

    if (error) {
      console.error(error);
      return;
    }

    if (credits <= 0) {
      setCreditAlertOpen(true);
      setDailyCredits(credits);
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
        .update({ daily_credits: credits - 1 })
        .eq("id", user.id);

      setDailyCredits(credits - 1);
    } catch (error) {
      console.error(error);
      alert("AI 일정 생성 중 오류가 발생했습니다.");
    }
  };

  //결과 저장
  const handleSavePlan = async (title: string) => {
    if (!user || !data) {
      throw new Error("저장에 필요한 데이터가 없습니다.");
    }

    setSaveStatus("saving");

    const { error } = await supabase.from("plans").insert({
      user_id: user.id,
      title,
      spots: selectedSpots,
      plan: data,
      start_date: plannerForm.startDate || null,
      end_date: plannerForm.endDate || null,
    });

    if (error) {
      console.error("plans insert 실패:", error);
      setSaveStatus("unsaved");
      throw error;
    }

    setSaveStatus("saved");
  };

  useEffect(() => {
    if (!user) return;

    const fetchDailyCredits = async () => {
      const { data, error } = await supabase.rpc(
        "reset_daily_credits_if_needed",
        {
          user_id: user.id,
          max_credits: 5,
        }
      );

      if (error) {
        console.error("크레딧 RPC 실패", error);
        return;
      }

      setDailyCredits(data);
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
        onConfirm={() => setCreditAlertOpen(false)}
        onCancel={() => setCreditAlertOpen(false)}
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
              key={`save-dialog-${saveOpen}`}
              open={saveOpen}
              onClose={() => setSaveOpen(false)}
              onConfirm={handleSavePlan}
              defaultTitle={defaultTitle}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default AiPlannerPage;
