import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithEmail, signInWithGoogle } from "../../services/auth";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import AppAlert from "../../common/components/AppAlert";
import ForgotPasswordDialog from "./components/ForgotPasswordDialog";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //에러 제어
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //알림창 제어
  const [alertOpen, setAlertOpen] = useState(false);

  //이메일 유효성 검사 함수
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //비밀번호 재설정
  const [forgotOpen, setForgotOpen] = useState(false);

  //유효성 검사 로직
  const validateForm = () => {
    let isValid = true;

    setEmailError("");
    setPasswordError("");
    setErrorMessage("");

    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
      isValid = false;
    }

    return isValid;
  };

  const handleEmailLogin = async () => {
    if (!validateForm()) return;

    try {
      await signInWithEmail(email, password);
      setAlertOpen(true);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const message = error.message;
        if (message.includes("Invalid login credentials")) {
          setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
        } else if (message.includes("User not found")) {
          setErrorMessage("가입되지 않은 이메일입니다.");
        } else {
          setErrorMessage("로그인 중 오류가 발생했습니다.");
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEmailLogin();
    }
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      mt={5}
    >
      <Box sx={{ width: 380, px: 2 }}>
        <Typography variant="h1" textAlign="center" mb={5}>
          로그인
        </Typography>
        <TextField
          fullWidth
          label="이메일 주소 *"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          onKeyDown={handleKeyDown}
          sx={{
            "& .MuiOutlinedInput-root fieldset": {
              borderColor: "text.secondary",
            },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: "primary.main",
              borderWidth: 2,
            },
          }}
        />
        <TextField
          fullWidth
          label="비밀번호 *"
          type={showPassword ? "text" : "password"}
          margin="normal"
          value={password}
          error={!!passwordError}
          helperText={passwordError}
          onKeyDown={handleKeyDown}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  sx={{ color: "grey.500" }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root fieldset": {
              borderColor: "text.secondary",
            },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: "primary.main",
              borderWidth: 2,
            },
          }}
        />
        {/* 에러 메시지 */}{" "}
        {errorMessage && (
          <Typography color="error" variant="body1" mt={1} textAlign="center">
            {errorMessage}{" "}
          </Typography>
        )}
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          sx={{
            mt: 4,
            height: 48,
            backgroundColor: "action.hover",
            color: "text.primary",
            "&:hover": {
              backgroundColor: "action.active",
            },
          }}
          onClick={handleEmailLogin}
        >
          로그인
        </Button>
        <Divider sx={{ my: 4 }} />
        {/* Google 로그인 */}
        <Button
          fullWidth
          size="large"
          variant="outlined"
          startIcon={
            <img
              src="https://images.icon-icons.com/2642/PNG/512/google_logo_g_logo_icon_159348.png"
              alt="google"
              style={{ width: 22 }}
            />
          }
          sx={{
            height: 48,
          }}
          onClick={signInWithGoogle}
        >
          Google 계정으로 시작하기
        </Button>
        {/* 하단 링크 */}
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{ cursor: "pointer" }}
            onClick={() => setForgotOpen(true)}
          >
            비밀번호 찾기
          </Typography>
          <ForgotPasswordDialog
            open={forgotOpen}
            onClose={() => setForgotOpen(false)}
          />
          <Typography> | </Typography>
          <Typography
            variant="body1"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            회원가입
          </Typography>
        </Box>
      </Box>
      <AppAlert
        open={alertOpen}
        message="로그인 되었습니다."
        severity="success"
        onClose={() => setAlertOpen(false)}
      />
    </Box>
  );
};

export default LoginPage;

//로그인 완료 alert -> common components로 뺌 (O)
//이메일 유효성 검사, 비밀번호 입력 유효성 검사 (O)

//비밀번호 재생성 -> 가입 이메일을 입력하면 재설정 링크를 보내주는 것으로(O)
