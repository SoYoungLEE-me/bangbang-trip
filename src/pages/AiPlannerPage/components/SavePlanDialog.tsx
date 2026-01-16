import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";

interface SavePlanDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (title: string) => Promise<void>;
  defaultTitle?: string;
}

const SavePlanDialog = ({
  open,
  onClose,
  onConfirm,
  defaultTitle = "",
}: SavePlanDialogProps) => {
  const [title, setTitle] = useState(defaultTitle ?? "");
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<"idle" | "saving" | "success">("idle");

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }

    setError("");
    setStatus("saving");

    try {
      await onConfirm(title.trim()); //여기서 실제 저장되는겨
      setStatus("success");
    } catch {
      setError("저장에 실패했습니다.");
      setStatus("idle");
    }
  };

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionProps={{
        onEntered: () => {
          inputRef.current?.focus();
          inputRef.current?.select();
        },
      }}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
    >
      <DialogTitle>여행 일정 저장</DialogTitle>

      <DialogContent>
        {status === "idle" && (
          <>
            <TextField
              fullWidth
              label="일정 제목"
              margin="normal"
              value={title}
              inputRef={inputRef}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();

                  if (status === "idle") {
                    handleSubmit();
                  }
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root fieldset": {
                  borderColor: "text.secondary",
                },
              }}
            />

            {error && (
              <Typography color="error" mt={1}>
                {error}
              </Typography>
            )}
          </>
        )}

        {status === "saving" && (
          <Box
            sx={{
              py: 6,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography fontWeight={700}>저장 중...</Typography>
          </Box>
        )}

        {status === "success" && (
          <Box
            sx={{
              py: 6,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography fontWeight={800} color="primary">
              저장되었습니다!
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        {status === "idle" && (
          <>
            <Button onClick={onClose}>취소</Button>
            <Button variant="contained" onClick={handleSubmit}>
              저장
            </Button>
          </>
        )}

        {status === "success" && (
          <Button
            onClick={onClose}
            variant="contained"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onClose();
              }
            }}
          >
            확인
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SavePlanDialog;
