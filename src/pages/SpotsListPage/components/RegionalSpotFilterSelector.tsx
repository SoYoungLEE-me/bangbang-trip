import { alpha, Box, MenuItem, TextField } from "@mui/material";
import { useSpotFilterStore } from "../../../stores/spotFilterStore";
import useGetAreaCodes from "../../../hooks/useGetAreaCodes";
import useGetSigunguCodes from "../../../hooks/useGetSigunguCodes";

const RegionalSpotFilterSelector = () => {
  const { selectedTouristType, setTouristType, selectedArea, setArea, selectedSigungu, setSigungu, keyword } =
    useSpotFilterStore();

  const { data: areaCodes } = useGetAreaCodes();
  const { data: sigunguCodes } = useGetSigunguCodes();

  const handleChangeTouristType = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouristType(e.target.value);
  };

  const handleChangeArea = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setArea(e.target.value);
  };

  const handleChangeSigungu = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSigungu(e.target.value);
  };

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        gap: "16px",
        marginTop: "22px",
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
        },
      })}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          gap: "16px",
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            gap: "22px",
          },
        })}
      >
        <TextField
          select
          label="관광타입"
          value={selectedTouristType}
          onChange={handleChangeTouristType}
          size="small"
          slotProps={{
            select: {
              MenuProps: {
                sx: {
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.16),
                  },
                },
              },
            },
          }}
          sx={{
            minWidth: "120px",
            "& .MuiOutlinedInput-root": {
              height: "44px",
              "& fieldset": {
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.4),
              },
              "&:hover fieldset": {
                borderColor: "primary.main",
                borderWidth: 2,
              },
            },
          }}
        >
          <MenuItem value="12">관광지</MenuItem>
          <MenuItem value="25" disabled={!!keyword}>
            여행코스
          </MenuItem>
          <MenuItem value="15" disabled={!!keyword}>
            축제공연행사
          </MenuItem>
        </TextField>
        <TextField
          select
          label="광역시/도"
          value={selectedArea}
          onChange={handleChangeArea}
          size="small"
          slotProps={{
            select: {
              MenuProps: {
                sx: {
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.16),
                  },
                },
              },
            },
          }}
          sx={{
            minWidth: "120px",
            "& .MuiOutlinedInput-root": {
              height: "44px",
              "& fieldset": {
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.4),
              },
              "&:hover fieldset": {
                borderColor: "primary.main",
                borderWidth: 2,
              },
            },
          }}
        >
          <MenuItem value="0">전국</MenuItem>
          {areaCodes && areaCodes.length > 0 ? (
            areaCodes?.map((areaCode) => (
              <MenuItem key={areaCode.code} value={areaCode.code}>
                {areaCode.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>지역 검색 중...</MenuItem>
          )}
        </TextField>
        {selectedArea !== "0" && (
          <TextField
            select
            label="시/군/구"
            value={selectedSigungu}
            onChange={handleChangeSigungu}
            size="small"
            slotProps={{
              select: {
                MenuProps: {
                  sx: {
                    "& .MuiMenuItem-root:hover": {
                      backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.16),
                    },
                  },
                },
              },
            }}
            sx={{
              minWidth: "120px",
              "& .MuiOutlinedInput-root": {
                height: "44px",
                "& fieldset": {
                  borderColor: (theme) => alpha(theme.palette.primary.main, 0.4),
                },
                "&:hover fieldset": {
                  borderColor: "primary.main",
                  borderWidth: 2,
                },
              },
            }}
          >
            <MenuItem value="0">전체</MenuItem>
            {sigunguCodes && sigunguCodes.length > 0 ? (
              sigunguCodes.map((sigunguCode) => (
                <MenuItem key={sigunguCode.code} value={sigunguCode.code}>
                  {sigunguCode.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>지역 검색 중...</MenuItem>
            )}
          </TextField>
        )}
      </Box>
    </Box>
  );
};

export default RegionalSpotFilterSelector;
