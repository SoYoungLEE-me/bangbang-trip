import { Box, Stack, Typography, Link } from "@mui/material";
import { getIcon } from "../utils/detailHelpers";

interface InfoItemProps {
  label: string;
  value: string | React.ReactNode;
  isMultiline?: boolean;
  isPet?: boolean;
}

export const InfoItem = ({
  label,
  value,
  isMultiline = false,
  isPet = false,
}: InfoItemProps) => {
  const extractPhoneNumber = (text: string): string => {
    return text.replace(/[^\d-]/g, "");
  };

  const isPhoneLabel = label.includes("문의 및 안내");
  const shouldShowPhoneLink =
    isPhoneLabel && typeof value === "string" && value.trim();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.8,
        paddingBlock: 2.5,
        borderBottom: "1px solid",
        borderColor: isPet ? "rgba(245, 124, 0, 0.1)" : "grey.100",
        "&:last-child": { borderBottom: "none" },
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box
          sx={{
            color: isPet ? "#f57c00" : "primary.main",
            display: "flex",
            backgroundColor: isPet ? "#fff4e5" : "rgba(25, 118, 210, 0.08)",
            p: 0.8,
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {getIcon(label)}
        </Box>
        <Typography
          sx={{
            fontSize: { xs: "0.9375rem", md: "1.05rem" },
            fontWeight: "700",
            color: "text.secondary",
            letterSpacing: "-0.01em",
            wordBreak: "keep-all",
          }}
        >
          {label}
        </Typography>
      </Stack>
      <Box
        sx={{
          fontSize: "0.95rem",
          color: "text.primary",
          lineHeight: 1.7,
          whiteSpace: isMultiline ? "pre-line" : "normal",
          wordBreak: "keep-all",
          pl: 5.8,
        }}
      >
        {shouldShowPhoneLink ? (
          <Link
            href={`tel:${extractPhoneNumber(value as string)}`}
            sx={{
              color: "primary.main",
              fontWeight: 400,
              textDecoration: "underline",
            }}
          >
            {value}
          </Link>
        ) : (
          value
        )}
      </Box>
    </Box>
  );
};
