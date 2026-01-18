import { Box, Typography, Stack, Divider, Grid, Button } from "@mui/material";
import {
  CalendarDays,
  Briefcase,
  Clock,
  Bookmark,
  BookmarkCheck,
  AlertCircle,
} from "lucide-react";
import { alpha, useTheme } from "@mui/material/styles";
import type { AiPlannerResult } from "../../../models/aiPlanner";

interface AiPlannerResultPanelProps {
  result: AiPlannerResult;
  onSave?: () => void;
  saveStatus?: "unsaved" | "saving" | "saved";
}

const AiPlannerResultPanel = ({
  result,
  onSave,
  saveStatus,
}: AiPlannerResultPanelProps) => {
  const theme = useTheme();

  if (
    !result ||
    !Array.isArray(result.itinerary) ||
    result.itinerary.length === 0
  ) {
    return null;
  }

  const primaryColor = theme.palette.primary.main;
  const paperBg = theme.palette.background.paper;
  const errorColor = theme.palette.error.main;

  return (
    <Box
      sx={{
        mt: 4,
        p: { xs: 3, md: 5 },
        borderRadius: 6,
        bgcolor: paperBg,
        boxShadow: "0 12px 32px rgba(0,0,0,0.05)",
        color: theme.palette.text.primary,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 5,
          gap: 2,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            color: primaryColor,
            mb: 0,
          }}
        >
          <CalendarDays size={26} /> 여행 타임라인
        </Typography>

        {/* 저장 버튼 */}
        {onSave && (
          <Button
            variant={saveStatus === "saved" ? "contained" : "outlined"}
            disabled={saveStatus !== "unsaved"}
            onClick={onSave}
            startIcon={
              saveStatus === "saved" ? (
                <BookmarkCheck size={18} />
              ) : (
                <Bookmark size={18} />
              )
            }
            sx={{
              ml: "auto",
              borderRadius: 999,
              px: 2.5,
              fontWeight: 700,
              textTransform: "none",
              whiteSpace: "nowrap",
              "&.Mui-disabled": {
                opacity: 1,
                color:
                  saveStatus === "saved"
                    ? "primary.contrastText"
                    : "text.secondary",
                backgroundColor:
                  saveStatus === "saved" ? "primary.main" : "transparent",
                borderColor:
                  saveStatus === "saved" ? "primary.main" : "divider",
              },
            }}
          >
            {saveStatus === "saved" ? "저장됨" : "일정 저장하기"}
          </Button>
        )}
      </Box>
      <Grid container spacing={5} alignItems="flex-start">
        {/* 타임라인 */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={6}>
            {result.itinerary.map((day) => (
              <Box key={day.day}>
                {/* Day Header */}
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    px: 3,
                    py: 0.8,
                    borderRadius: "20px",
                    bgcolor: primaryColor,
                    color: "#fff",
                    mb: 4,
                  }}
                >
                  {/* 컨셉 제목 */}
                  <Typography fontWeight={800} fontSize={14}>
                    Day {day.day} &nbsp; {day.title}
                  </Typography>
                </Box>

                {/* 타임라인 영역 */}
                <Box sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      position: "absolute",
                      left: 15,
                      top: 7,
                      bottom: 0,
                      width: 2,
                      bgcolor: alpha(primaryColor, 0.2),
                      zIndex: 1,
                    }}
                  />

                  <Stack spacing={4}>
                    {day.activities?.map((activity, idx) => (
                      <Box
                        key={idx}
                        sx={{ position: "relative", minHeight: 80 }}
                      >
                        {/* 타임라인 도트  */}
                        <Box
                          sx={{
                            position: "absolute",
                            left: 16,
                            top: 12,
                            transform: "translate(-50%, -50%)",
                            zIndex: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              bgcolor: primaryColor,
                            }}
                          />
                        </Box>

                        {/* 시간 표시 */}
                        <Box sx={{ pl: 5 }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ mb: 1.5 }}
                          >
                            <Clock size={16} color={primaryColor} />
                            <Typography
                              fontSize={16}
                              fontWeight={800}
                              sx={{ color: primaryColor }}
                            >
                              {activity.time}
                            </Typography>
                          </Stack>

                          {/* 일정 내용 */}
                          <Box
                            sx={{
                              p: 3,
                              borderRadius: 4,
                              bgcolor: "#fff",
                              border: "1px solid",
                              borderColor: alpha(primaryColor, 0.1),
                              boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                            }}
                          >
                            <Typography fontWeight={800} fontSize={16} mb={1}>
                              {activity.location}
                            </Typography>
                            <Typography
                              fontSize={14}
                              color="text.secondary"
                              lineHeight={1.6}
                              sx={{ wordBreak: "keep-all" }}
                            >
                              {activity.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
                {day.day !== result.itinerary.length && (
                  <Divider sx={{ mt: 6, opacity: 0.5 }} />
                )}
              </Box>
            ))}
          </Stack>
        </Grid>

        {/* 여행 준비물 및 제외 동선*/}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            {/* 필수 준비물 */}
            <Box
              sx={{
                p: 4,
                borderRadius: 6,
                bgcolor: alpha(primaryColor, 0.05),
                border: `1px dashed ${alpha(primaryColor, 0.3)}`,
              }}
            >
              <Typography
                fontWeight={900}
                fontSize={18}
                mb={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  color: primaryColor,
                }}
              >
                <Briefcase size={20} /> 필수 준비물
              </Typography>
              <Stack spacing={2.5}>
                {result.preparations.map((item, idx) => (
                  <Stack
                    key={idx}
                    direction="row"
                    spacing={1.5}
                    alignItems="flex-start"
                  >
                    <Box
                      sx={{
                        mt: 0.8,
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: primaryColor,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      fontSize={14}
                      color="text.secondary"
                      lineHeight={1.5}
                    >
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            {/*제외된 장소*/}
            {result.exclusionNotes && result.exclusionNotes.length > 0 && (
              <Box
                sx={{
                  p: 4,
                  borderRadius: 6,
                  bgcolor: alpha(errorColor, 0.04),
                  border: `1px solid ${alpha(errorColor, 0.1)}`,
                }}
              >
                <Typography
                  fontWeight={900}
                  fontSize={18}
                  mb={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                    color: errorColor,
                  }}
                >
                  <AlertCircle size={20} /> 동선 최적화 안내
                </Typography>

                <Typography
                  fontSize={13}
                  color="text.secondary"
                  mb={2}
                  sx={{ wordBreak: "keep-all" }}
                >
                  여행 동선과 분위기를 균형 있게 맞추기 위해, 아래와 같이
                  조정되었습니다.
                </Typography>

                <Stack spacing={2}>
                  {result.exclusionNotes.map((note, idx) => (
                    <Stack
                      key={idx}
                      direction="row"
                      spacing={1.5}
                      alignItems="flex-start"
                    >
                      <Typography
                        fontSize={13}
                        sx={{
                          color: errorColor,
                          lineHeight: 1.6,
                          fontWeight: 500,
                          bgcolor: alpha(errorColor, 0.08),
                          p: 1.5,
                          borderRadius: 2,
                          width: "100%",
                        }}
                      >
                        • {note}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AiPlannerResultPanel;
