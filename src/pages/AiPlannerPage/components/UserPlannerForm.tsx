import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Stack,
  Chip,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  CalendarDays,
  Users2,
  Smile,
  Sparkles,
  Minus,
  Plus,
} from "lucide-react";
import { alpha } from "@mui/material/styles";

import type { UserPlannerFormValue } from "../../../models/userPlanner";

interface UserPlannerFormProps {
  value: UserPlannerFormValue;
  onChange: (next: UserPlannerFormValue) => void;
}

const MOODS = [
  "힐링과 휴식",
  "액티비티 위주",
  "맛집 도장깨기",
  "인생샷 투어",
  "로컬 체험",
  "럭셔리 스테이",
];

const COMPANIONS = [
  "혼자만의 여행",
  "커플/연인",
  "친구와 함께",
  "가족 여행",
  "아이와 함께",
];

const UserPlannerForm = ({ value, onChange }: UserPlannerFormProps) => {
  const update = (partial: Partial<UserPlannerFormValue>) => {
    onChange({ ...value, ...partial });
  };

  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 6,
        border: "1px solid",
        borderColor: "grey.100",
        bgcolor: "background.paper",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      <Stack spacing={5}>
        {/* 여행 일정 */}
        <Box>
          <Typography
            fontWeight={900}
            mb={2}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <CalendarDays size={20} /> 여행 일정
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="출발일"
              type="date"
              value={value.startDate}
              onChange={(e) => update({ startDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.4),
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                    borderWidth: 2,
                  },
                },
              }}
            />
            <TextField
              label="도착일"
              type="date"
              value={value.endDate}
              onChange={(e) => update({ endDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.4),
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                    borderWidth: 2,
                  },
                },
              }}
            />
          </Stack>
        </Box>

        {/* 동행 정보 */}
        <Box>
          <Typography
            fontWeight={900}
            mb={2}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Users2 size={20} /> 동행 정보
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              select
              label="누구와 함께?"
              value={value.companions}
              onChange={(e) => update({ companions: e.target.value })}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.4),
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                    borderWidth: 2,
                  },
                },
              }}
            >
              {COMPANIONS.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="총 인원수"
              type="number"
              value={value.peopleCount}
              onChange={(e) =>
                update({ peopleCount: Math.max(1, Number(e.target.value)) })
              }
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
              fullWidth
              InputProps={{
                // 1. 왼쪽 마이너스 버튼 (Minus 아이콘)
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={() =>
                        update({
                          peopleCount: Math.max(1, value.peopleCount - 1),
                        })
                      }
                      size="small"
                      sx={{ color: "text.secondary" }} // 아이콘 색상 조절
                    >
                      <Minus size={18} strokeWidth={2.5} />{" "}
                      {/* Lucide 아이콘 적용 */}
                    </IconButton>
                  </InputAdornment>
                ),
                // 2. 오른쪽 플러스 버튼 (Plus 아이콘)
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        update({ peopleCount: value.peopleCount + 1 })
                      }
                      size="small"
                      sx={{ color: "text.secondary" }}
                    >
                      <Plus size={18} strokeWidth={2.5} />{" "}
                      {/* Lucide 아이콘 적용 */}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                "& input": {
                  MozAppearance: "textfield",
                  fontWeight: 600,
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.4),
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                    borderWidth: 2,
                  },
                },
              }}
            />
          </Stack>
        </Box>

        {/* 여행 무드 */}
        <Box>
          <Typography
            fontWeight={900}
            mb={2}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Smile size={20} /> 여행 무드
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {MOODS.map((mood) => (
              <Chip
                key={mood}
                label={`# ${mood}`}
                clickable
                variant={value.mood === mood ? "filled" : "outlined"}
                onClick={() => update({ mood })}
                sx={{
                  fontWeight: 700,
                  boxSizing: "border-box",
                  borderStyle: "solid",

                  ...(value.mood === mood
                    ? {
                        backgroundColor: "#48876b",
                        color: "#ffffff",
                      }
                    : {
                        backgroundColor: "transparent",
                      }),

                  "&:hover": {
                    borderWidth: 2,
                    backgroundColor:
                      value.mood === mood
                        ? "#48876b !important"
                        : "transparent !important",
                    borderColor:
                      value.mood === mood ? "#48876b !important" : undefined,
                  },

                  "&:active": {
                    backgroundColor:
                      value.mood === mood
                        ? "#48876b !important"
                        : "transparent !important",

                    borderWidth: 2,
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
      <Box mt={7}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          startIcon={<Sparkles size={18} />}
          sx={{
            py: 1.6,
            fontWeight: 900,
            fontSize: 16,
            borderRadius: 999,

            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            "&:hover": {
              boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
            },
          }}
          onClick={() => {
            //ai 연동 함수
          }}
        >
          타임라인 생성하기
        </Button>
      </Box>
    </Box>
  );
};

export default UserPlannerForm;
