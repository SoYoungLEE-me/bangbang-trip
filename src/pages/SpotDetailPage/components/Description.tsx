import { Box, Stack, Typography } from "@mui/material";
import { BookOpenText } from "lucide-react";
import { formatHtmlText } from "../utills/formatters";

export const Description = ({ overview }: { overview?: string }) => {
  if (!overview) return null;
  return (
    <Box sx={{ width: "100%", mb: { xs: 8, md: 10 } }}>
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        sx={{ mb: { xs: 2, md: 3.5 } }}
      >
        <Box
          sx={{ bgcolor: "#e2efe5ff", p: 1, borderRadius: 4, display: "flex" }}
        >
          <BookOpenText size={24} color="#49af81ff" />
        </Box>
        <Typography
          variant="h5"
          sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, fontWeight: 800 }}
        >
          상세 설명
        </Typography>
      </Stack>
      <Typography
        sx={{
          fontSize: { xs: "0.9375rem", md: "1.125rem" },
          lineHeight: 1.8,
          backgroundColor: "grey.50",
          p: { xs: 1, md: 5 },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "grey.100",
          wordBreak: "keep-all",
        }}
      >
        {formatHtmlText(overview)}
      </Typography>
    </Box>
  );
};
