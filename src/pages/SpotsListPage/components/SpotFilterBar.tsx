import { Box, Button, TextField } from "@mui/material";
import { Search } from "lucide-react";
import { useState } from "react";
import RegionalSpotFilterSelector from "./RegionalSpotFilterSelector";
import NearbySpotFilterSelector from "./NearbySpotFilterSelector";
import { useSpotFilterStore } from "../../../stores/spotFilterStore";

const SpotFilterBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [isRegionalFilterActive, setIsRegionalFilterActive] = useState<boolean>(false);
  const [isNearbyFilterActive, setIsNearbyFilterActive] = useState<boolean>(false);

  const { setIsNearbyMode, setKeyword } = useSpotFilterStore();

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
  };

  const handleChangeSearchTerm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchByKeyword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setKeyword(searchTerm.trim());

    setIsRegionalFilterActive(false);
    setIsNearbyFilterActive(false);
  };

  return (
    <>
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
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            border: `1px solid ${theme.palette.text.secondary}`,
            padding: "0 8px 0 16px",
            borderRadius: "50px",
            flex: "1",
            boxSizing: "border-box",
            "&:hover": {
              border: `2px solid ${theme.palette.primary.main}`,
            },
            "&:focus-within": {
              border: `2px solid ${theme.palette.primary.main}`,
            },
            [theme.breakpoints.down("sm")]: {
              width: "100%",
            },
          })}
        >
          <Search size={20} />
          <TextField
            value={searchTerm}
            onChange={handleChangeSearchTerm}
            sx={{
              flex: "1",

              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
          <button type="submit" hidden></button>
        </Box>
        <Box
          sx={(theme) => ({
            display: "flex",
            gap: "16px",
            [theme.breakpoints.down("sm")]: {
              minHeight: "44px",
              width: "100%",
              "& button": {
                width: "100%",
              },
            },
          })}
        >
          <Button
            variant={isRegionalFilterActive ? "contained" : "outlined"}
            onClick={() => handleActivateFilter("regional")}
          >
            지역별 관광정보
          </Button>
          <Button
            variant={isNearbyFilterActive ? "contained" : "outlined"}
            onClick={() => handleActivateFilter("nearby")}
          >
            내주변 관광정보
          </Button>
        </Box>
      </Box>
      {isRegionalFilterActive && <RegionalSpotFilterSelector />}
      {isNearbyFilterActive && <NearbySpotFilterSelector />}
    </>
  );
};

export default SpotFilterBar;
