import { Box, IconButton, TextField } from "@mui/material";
import { Search, SlidersHorizontal } from "lucide-react";

interface SpotFilterBarProps {
  isFilterActive: boolean;
  setIsFilterActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const SpotFilterBar = ({ isFilterActive, setIsFilterActive }: SpotFilterBarProps) => {
  const handleFilterClick = () => {
    setIsFilterActive((prevIsFilterActive) => !prevIsFilterActive);
  };

  return (
    <Box component="section">
      <Box
        sx={{
          maxWidth: "calc(1200px - 48px)",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          margin: "0 auto 16px",
        }}
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            gap: "16px",
            border: `2px solid ${theme.palette.text.secondary}`,
            padding: "0 16px",
            borderRadius: "50px",
            flex: "1",
            "& svg": {
              color: theme.palette.text.secondary,
            },
            "&:hover": {
              borderColor: theme.palette.action.hover,
              "& svg": {
                color: theme.palette.action.hover,
              },
              transition: "all 0.3s",
            },
            "&:focus-within": {
              borderColor: theme.palette.action.active,
              "& svg": {
                color: theme.palette.action.active,
              },
            },
          })}
        >
          <Search />
          <TextField
            placeholder=""
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
                "& input": {
                  padding: "12px 0",
                },
              },
            }}
          />
        </Box>
        <IconButton
          sx={(theme) => ({
            border: `2px solid ${isFilterActive ? theme.palette.action.active : theme.palette.text.secondary}`,
            borderRadius: "4px",
            color: isFilterActive ? theme.palette.action.active : theme.palette.text.secondary,
            "&:hover": {
              borderColor: theme.palette.action.hover,
              color: theme.palette.action.hover,
              transition: "all 0.3s",
            },
          })}
          onClick={handleFilterClick}
        >
          <SlidersHorizontal />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SpotFilterBar;
