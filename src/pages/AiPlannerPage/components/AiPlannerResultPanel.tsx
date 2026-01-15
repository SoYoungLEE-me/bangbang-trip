import { Box, Typography, Stack, Divider, Grid } from "@mui/material";
import { CalendarDays, Briefcase, Clock } from "lucide-react"; // Clock 아이콘 추가
import { alpha, useTheme } from "@mui/material/styles";
import type { AiPlannerResult } from "../../../models/aiPlanner";

interface AiPlannerResultPanelProps {
  result: AiPlannerResult;
}

const AiPlannerResultPanel = ({ result }: AiPlannerResultPanelProps) => {
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
      <Grid container spacing={5} alignItems="flex-start">
        {/* 왼쪽: 타임라인 */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography
            variant="h1"
            sx={{
              mb: 5,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              color: primaryColor,
            }}
          >
            <CalendarDays size={26} /> 여행 타임라인
          </Typography>

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
                  <Typography fontWeight={800} fontSize={14}>
                    Day {day.day}: {day.title}
                  </Typography>
                </Box>

                {/* 타임라인 영역 */}
                <Box sx={{ position: "relative" }}>
                  {/* 세로선 */}
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
                        {/* 타인라인 도트  */}
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

        {/* 여행 준비물 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              p: 4,
              borderRadius: 6,
              bgcolor: alpha(primaryColor, 0.05),
              border: `1px dashed ${alpha(primaryColor, 0.3)}`,
              mt: { xs: 0, md: 8.5 },
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
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      border: `2px solid ${primaryColor}`,
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default AiPlannerResultPanel;
