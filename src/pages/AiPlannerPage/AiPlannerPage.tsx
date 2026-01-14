import { useState } from "react";
import UserPlannerForm from "./components/UserPlannerForm";
import type { UserPlannerFormValue } from "../../models/userPlanner";
import { Box, Grid } from "@mui/material";
import SelectedSpotsPanel from "./components/SelectedSpotsPanel";
import { useSelectedSpotsStore } from "../../stores/selectedSpotsStore";

const AiPlannerPage = () => {
  const { selectedSpots, removeSpot } = useSelectedSpotsStore();

  const [plannerForm, setPlannerForm] = useState<UserPlannerFormValue>({
    startDate: "",
    endDate: "",
    companions: "커플/연인",
    peopleCount: 2,
    mood: "힐링과 휴식",
  });

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
      <Grid container spacing={6} alignItems="flex-start">
        {/* 담은 장소 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SelectedSpotsPanel spots={selectedSpots} onRemove={removeSpot} />
        </Grid>

        {/* 유저 입력 폼 */}
        <Grid size={{ xs: 12, md: 8 }}>
          <UserPlannerForm value={plannerForm} onChange={setPlannerForm} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AiPlannerPage;
