import { alpha, Box, MenuItem, TextField } from "@mui/material";
import { useSpotFilterStore } from "../../../stores/spotFilterStore";
import { useEffect } from "react";

interface NearbySpotFilterSelectorProps {
  onFailed: () => void;
}

const NearbySpotFilterSelector = ({ onFailed }: NearbySpotFilterSelectorProps) => {
  const {
    selectedTouristType,
    setTouristType,
    mapX,
    mapY,
    setLocation,
    selectedRadius,
    setRadius,
    setIsNearbyMode,
    setErrorMessage,
  } = useSpotFilterStore();

  const handleChangeTouristType = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouristType(e.target.value);
  };

  const handleChangeRadius = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRadius(e.target.value);
  };

  const handleGetLocation = (isMounted: boolean) => {
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
          let errorMessage = "위치 정보를 가져올 수 없습니다.";

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "위치 정보 공유 승인을 거절하셨습니다. 설정에서 권한을 허용해주세요.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "위치 정보를 사용할 수 없는 환경입니다.";
              break;
          }

          setErrorMessage(errorMessage);
          setIsNearbyMode(false);
          onFailed();
        }
      }
    );
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
      setErrorMessage("");
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
        <MenuItem value="15">축제공연행사</MenuItem>
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
    </Box>
  );
};

export default NearbySpotFilterSelector;
