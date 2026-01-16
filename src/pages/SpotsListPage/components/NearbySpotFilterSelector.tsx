import { alpha, Box, Button, MenuItem, TextField } from "@mui/material";
import { useSpotFilterStore } from "../../../stores/spotFilterStore";
import { useEffect } from "react";

const NearbySpotFilterSelector = () => {
  const {
    selectedTouristType,
    setTouristType,
    mapX,
    mapY,
    setLocation,
    selectedRadius,
    setRadius,
    setIsNearbyMode,
    resetNearbyFilters,
  } = useSpotFilterStore();

  const handleChangeTouristType = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouristType(e.target.value);
  };

  const handleChangeRadius = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRadius(e.target.value);
  };

  const handleGetLocation = (isMounted: boolean) => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const longitude = position.coords.longitude.toString();
        const latitude = position.coords.latitude.toString();

        if (isMounted) {
          setLocation(longitude, latitude);
        }
      },
      (error) => {
        if (isMounted) {
          console.error("위치 정보 획득 실패:", error.message);
        }
      }
    );
  };

  const handleReset = () => {
    resetNearbyFilters();
    handleGetLocation(true);
  };

  useEffect(() => {
    let isMounted: boolean = true;
    setIsNearbyMode(true);

    if (!(mapX && mapY)) {
      handleGetLocation(isMounted);
    }

    return () => {
      isMounted = false;
      setLocation("", "");
      setIsNearbyMode(false);
    };
  }, []);

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        gap: "16px",
        marginTop: "16px",
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
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
        <MenuItem value="25">여행코스</MenuItem>
      </TextField>
      <TextField
        select
        label="거리"
        value={selectedRadius}
        onChange={handleChangeRadius}
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
        {Array.from({ length: 20 }, (_, i) => i + 1).map((number) => (
          <MenuItem key={number} value={`${number}000`}>
            {number}km
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" onClick={handleReset}>
        선택 초기화
      </Button>
    </Box>
  );
};

export default NearbySpotFilterSelector;
