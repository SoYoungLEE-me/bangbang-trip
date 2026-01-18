import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { CheckCircle2, AlertCircle, Info, TriangleAlert } from "lucide-react";

export type AlertSeverity = "success" | "error" | "info" | "warning";

interface AppAlertProps {
  open: boolean;
  message: string;
  severity?: AlertSeverity;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const severityConfig = {
  success: {
    icon: <CheckCircle2 size={48} color="#4caf50" />,
    color: "#4caf50",
  },
  error: {
    icon: <AlertCircle size={48} color="#ef5350" />,
    color: "#ef5350",
  },
  warning: {
    icon: <TriangleAlert size={48} color="#ff9800" />,
    color: "#ff9800",
  },
  info: {
    icon: <Info size={48} color="#03a9f4" />,
    color: "#03a9f4",
  },
};

const AppAlert = ({
  open,
  message,
  severity = "success",
  onCancel,
  onConfirm,
  confirmText = "확인",
}: AppAlertProps) => {
  const config = severityConfig[severity];

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      disableAutoFocus
      disableEnforceFocus
      disableRestoreFocus
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: 2,
        },
      }}
    >
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          py={2}
        >
          <Box mb={2}>{config.icon}</Box>

          <Typography variant="body1" fontWeight={500} color="text.primary">
            {message}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onConfirm}
          variant="contained"
          fullWidth
          sx={{
            height: 48,
            borderRadius: 2,
            backgroundColor: config.color,
            boxShadow: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: config.color,
              filter: "brightness(0.9)",
              boxShadow: "none",
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppAlert;
