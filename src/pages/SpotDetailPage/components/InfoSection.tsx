import { Box, Stack, Typography, Divider, Link } from "@mui/material";
import { BadgeInfo } from "lucide-react";
import { InfoItem } from "./InfoItem";
import { formatHtmlText } from "../utils/formatters";
import type {
  IntroDetailItem,
  SpotDetailInfoItem,
} from "../../../models/tourDetail";

interface InfoSectionProps {
  address?: string;
  homepageUrl?: string;
  leftIntro: IntroDetailItem[];
  rightIntro: IntroDetailItem[];
  extraInfos: SpotDetailInfoItem[];
}

export const InfoSection = ({
  address,
  homepageUrl,
  leftIntro,
  rightIntro,
  extraInfos,
}: InfoSectionProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "grey.50",
        py: { xs: 4, md: 8 },
        borderRadius: 8,
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3.5 }}>
        <Box sx={{ bgcolor: "#eeeeeeff", borderRadius: 4, display: "flex" }}>
          <BadgeInfo size={24} color="#333" />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          이용 정보
        </Typography>
      </Stack>
      <Divider sx={{ mb: 2, borderColor: "grey.200" }} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: 0, md: 8 },
        }}
      >
        <Box>
          {address && <InfoItem label="주소" value={address} />}
          {leftIntro.map((item, i) => (
            <InfoItem key={`l-${i}`} {...item} />
          ))}
          {extraInfos
            .filter((_, i) => i % 2 === 0)
            .map((info, i) => (
              <InfoItem
                key={`ex-l-${i}`}
                label={info.infoname}
                value={formatHtmlText(info.infotext)}
                isMultiline
              />
            ))}
        </Box>
        <Box>
          {homepageUrl && (
            <InfoItem
              label="홈페이지"
              value={
                <Link
                  href={homepageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  공식 홈페이지 방문하기
                </Link>
              }
            />
          )}
          {rightIntro.map((item, i) => (
            <InfoItem key={`r-${i}`} {...item} />
          ))}
          {extraInfos
            .filter((_, i) => i % 2 === 1)
            .map((info, i) => (
              <InfoItem
                key={`ex-r-${i}`}
                label={info.infoname}
                value={formatHtmlText(info.infotext)}
                isMultiline
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
};
