import { alpha, Box, Button, IconButton, Snackbar, TextField } from "@mui/material";
import { Search, RotateCcw, X } from "lucide-react";

import { useState } from "react";
import RegionalSpotFilterSelector from "./RegionalSpotFilterSelector";
import NearbySpotFilterSelector from "./NearbySpotFilterSelector";
import { useSpotFilterStore } from "../../../stores/spotFilterStore";

const SpotFilterBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isResetSuccessMessageSnackbarOpen, setIsResetSuccessMessageSnackbarOpen] = useState<boolean>(false);

  const {
    setIsNearbyMode,
    setKeyword,
    resetFilters,
    errorMessage,
    setErrorMessage,
    isRegionalFilterActive,
    setIsRegionalFilterActive,
    isNearbyFilterActive,
    setIsNearbyFilterActive,
  } = useSpotFilterStore();

  const isErrorMessageSnackbarOpen = !!errorMessage;

  const handleActivateFilter = (touristType: "regional" | "nearby") => {
    if (touristType === "regional") {
      const nextState = !isRegionalFilterActive;
      setIsRegionalFilterActive(nextState);
      setIsNearbyFilterActive(false);
      setIsNearbyMode(false);
    } else {
      const nextState = !isNearbyFilterActive;
      setIsNearbyFilterActive(nextState);
      setIsRegionalFilterActive(false);
      setIsNearbyMode(nextState);

      if (nextState) {
        setSearchTerm("");
        setKeyword("");
      }
    }
  };

  const handleChangeSearchTerm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchByKeyword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(searchTerm.trim());
    setIsNearbyFilterActive(false);
  };

  const handleReset = () => {
    setSearchTerm("");
    resetFilters();
    setIsResetSuccessMessageSnackbarOpen(true);
  };

  const handleCloseErrorMessageSnackbar = () => {
    setErrorMessage("");
  };

  const handleCloseResetSuccessMessageSnackbar = () => {
    setIsResetSuccessMessageSnackbarOpen(false);
  };

  return (
    <>
      <Snackbar
        open={isErrorMessageSnackbarOpen}
        autoHideDuration={4000}
        message={errorMessage}
        onClose={handleCloseErrorMessageSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            sx={(theme) => ({
              color: theme.palette.error.main,
            })}
            onClick={handleCloseErrorMessageSnackbar}
          >
            <X />
          </IconButton>
        }
        sx={(theme) => ({
          wordBreak: "keep-all",
          "& .MuiSnackbarContent-root": {
            margin: "4px",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            border: `6px solid ${theme.palette.error.main}`,
          },
        })}
      />
      <Snackbar
        open={isResetSuccessMessageSnackbarOpen}
        autoHideDuration={4000}
        message={"모든 검색 조건이 초기화되었습니다."}
        onClose={handleCloseResetSuccessMessageSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            sx={(theme) => ({
              color: theme.palette.primary.main,
            })}
            onClick={handleCloseResetSuccessMessageSnackbar}
          >
            <X />
          </IconButton>
        }
        sx={(theme) => ({
          wordBreak: "keep-all",
          "& .MuiSnackbarContent-root": {
            margin: "4px",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            border: `6px solid ${theme.palette.primary.main}`,
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
            "& .MuiButton-root": {
              padding: "5px 36px",
            },
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
