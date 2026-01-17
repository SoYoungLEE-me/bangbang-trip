import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { supabase } from "../../lib/supabase";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        alert("링크가 만료되었습니다. 다시 시도해주세요.");
        navigate("/", { replace: true });
      }
    });
  }, []);

  const handleReset = async () => {
    if (!password) {
      alert("비밀번호 입력해라");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/", { replace: true });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={2}
      px={2}
    >
      <Typography variant="h5" fontWeight={600}>
        비밀번호 재설정
      </Typography>

      <TextField
        type="password"
        label="새 비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root fieldset": {
            borderColor: "text.secondary",
          },
          maxWidth: 360,
        }}
      />

      <Button
        variant="contained"
        onClick={handleReset}
        disabled={loading}
        sx={{ width: 360, maxWidth: "100%" }}
      >
        {loading ? "변경 중..." : "변경"}
      </Button>
    </Box>
  );
}
