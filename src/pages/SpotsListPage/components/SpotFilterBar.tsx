import { alpha, Box, Button, IconButton, Snackbar, TextField } from "@mui/material";
import { Search, RotateCcw, X } from "lucide-react";

import { useState } from "react";
import RegionalSpotFilterSelector from "./RegionalSpotFilterSelector";
import NearbySpotFilterSelector from "./NearbySpotFilterSelector";
import { useSpotFilterStore } from "../../../stores/spotFilterStore";

const SpotFilterBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [isRegionalFilterActive, setIsRegionalFilterActive] = useState<boolean>(false);
  const [isNearbyFilterActive, setIsNearbyFilterActive] = useState<boolean>(false);

  const { setIsNearbyMode, setKeyword, resetFilters, errorMessage, setErrorMessage } = useSpotFilterStore();

  const isSnackbarOpen = !!errorMessage;

  const handleActivateFilter = (touristType: "regional" | "nearby") => {
    if (touristType === "regional") {
      setIsRegionalFilterActive(!isRegionalFilterActive);
      setIsNearbyFilterActive(false);

      if (!isRegionalFilterActive) {
        setIsNearbyMode(false);
      }
    } else {
      setIsNearbyFilterActive(!isNearbyFilterActive);
      setIsRegionalFilterActive(false);

      if (!isNearbyFilterActive) {
        setIsNearbyMode(true);
      }
    }

    setSearchTerm("");
    resetFilters();
  };

  const handleChangeSearchTerm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchByKeyword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setErrorMessage("검색어를 입력해주세요.");
      return;
    }

    setKeyword(searchTerm.trim());
    setIsRegionalFilterActive(false);
    setIsNearbyFilterActive(false);
  };

  const handleReset = () => {
    setSearchTerm("");
    resetFilters();
    setIsRegionalFilterActive(false);
    setIsNearbyFilterActive(false);
  };

  const handleCloseSnackbar = () => {
    setErrorMessage("");
  };

  return (
    <>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={4000}
        message={errorMessage}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            sx={(theme) => ({
              color: theme.palette.error.main,
            })}
            onClick={handleCloseSnackbar}
          >
            <X fontSize="small" />
          </IconButton>
        }
        sx={(theme) => ({
          marginLeft: { xs: 12, sm: 2, md: 0 },
          marginRight: { xs: 12, sm: 2, md: 0 },
          maxWidth: { xs: "calc(100% - 32px)", sm: "600px" },
          "& .MuiSnackbarContent-root": {
            margin: "4px",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            border: `6px solid ${theme.palette.error.main}`,
          },
        })}
      />
      <Box
        sx={(theme) => ({
          maxHeight: "44px",
          maxWidth: "calc(1200px - 48px)",
          display: "flex",
          gap: "16px",

          [theme.breakpoints.down("sm")]: {
            maxHeight: "unset",
            flexDirection: "column",
          },
        })}
      >
        <Box
          component="form"
          onSubmit={handleSearchByKeyword}
          sx={{
            flex: "1",
          }}
        >
          <TextField
            value={searchTerm}
            onChange={handleChangeSearchTerm}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton type="submit">
                    <Search size={20} />
                  </IconButton>
                ),
              },
            }}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                padding: "0 8px",
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
          />
        </Box>
        <Box
          sx={(theme) => ({
            display: "flex",
            gap: "16px",
            [theme.breakpoints.down("sm")]: {
              minHeight: "44px",
              width: "100%",
              "& .MuiButton-root": {
                width: "100%",
              },
            },
          })}
        >
          <Button
            variant={isRegionalFilterActive ? "contained" : "outlined"}
            onClick={() => handleActivateFilter("regional")}
          >
            지역별
          </Button>
          <Button
            variant={isNearbyFilterActive ? "contained" : "outlined"}
            onClick={() => handleActivateFilter("nearby")}
          >
            내주변
          </Button>
          <IconButton onClick={handleReset}>
            <RotateCcw />
          </IconButton>
        </Box>
      </Box>
      {isRegionalFilterActive && <RegionalSpotFilterSelector />}
      {isNearbyFilterActive && <NearbySpotFilterSelector onFailed={() => setIsNearbyFilterActive(false)} />}
    </>
  );
};

export default SpotFilterBar;
