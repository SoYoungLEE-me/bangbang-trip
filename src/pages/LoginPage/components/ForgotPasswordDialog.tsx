import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { sendPasswordResetEmail } from "../../../services/auth";

interface ForgotPasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

const ForgotPasswordDialog = ({ open, onClose }: ForgotPasswordDialogProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError("");

    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    try {
      await sendPasswordResetEmail(email);
      setSuccess(true);
    } catch {
      setError("비밀번호 재설정 이메일 전송에 실패했습니다.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
        },
      }}
    >
      <DialogTitle>비밀번호 재설정</DialogTitle>

      <DialogContent>
        {success ? (
          <Typography>
            입력하신 이메일로 비밀번호 재설정 링크를 보냈어요.
          </Typography>
        ) : (
          <TextField
            fullWidth
            label="이메일 주소"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            sx={{
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: "text.secondary",
              },
            }}
          />
        )}

        {error && (
          <Typography color="error" mt={1}>
            {error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
        {!success && (
          <Button variant="contained" onClick={handleSubmit}>
            보내기
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
