import { Box, Stack, Typography, Paper } from "@mui/material";
import { Dog } from "lucide-react";
import { InfoItem } from "./InfoItem";

interface PetTourItem {
  acmpyTypeCd?: string;
  acmpyPsblCpam?: string;
  acmpyNeedMtr?: string;
  relaPosesFclty?: string;
  etcAcmpyInfo?: string;
}

export const PetInfo = ({ petInfo }: { petInfo?: PetTourItem }) => {
  if (!petInfo) return null;

  const hasData =
    petInfo.acmpyTypeCd ||
    petInfo.acmpyPsblCpam ||
    petInfo.acmpyNeedMtr ||
    petInfo.relaPosesFclty ||
    petInfo.etcAcmpyInfo;

  if (!hasData) return null;

  return (
    <Box sx={{ width: "100%", mb: 12 }}>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3.5 }}>
        <Box
          sx={{ bgcolor: "#f7f1e9ff", p: 1, borderRadius: 4, display: "flex" }}
        >
          <Dog size={24} color="#f57c00" />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          반려동물 동반 정보
        </Typography>
      </Stack>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 5,
          border: "1px solid",
          borderColor: "#ffe0b2",
          backgroundColor: "#fffdfa",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 1,
          }}
        >
          {petInfo.acmpyTypeCd && (
            <InfoItem
              label="동반 가능 여부"
              value={petInfo.acmpyTypeCd}
              isPet
            />
          )}
          {petInfo.acmpyPsblCpam && (
            <InfoItem
              label="동반 가능 동물"
              value={petInfo.acmpyPsblCpam}
              isPet
            />
          )}
          {petInfo.acmpyNeedMtr && (
            <InfoItem
              label="준수사항 및 준비물"
              value={petInfo.acmpyNeedMtr}
              isPet
            />
          )}
          {petInfo.relaPosesFclty && (
            <InfoItem label="관련 시설" value={petInfo.relaPosesFclty} isPet />
          )}
          {petInfo.etcAcmpyInfo && (
            <Box sx={{ gridColumn: { md: "span 2" } }}>
              <InfoItem
                label="기타 동반 정보"
                value={petInfo.etcAcmpyInfo}
                isMultiline
                isPet
              />
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
