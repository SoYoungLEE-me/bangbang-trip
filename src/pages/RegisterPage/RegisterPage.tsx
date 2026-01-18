import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { SignUpWithEmail } from "../../services/auth";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //에러 제어
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //비밀번호 확인
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  //이메일 유효성 검사 함수
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //유효성 검사 로직
  const validateForm = () => {
    let isValid = true;

    setEmailError("");
    setPasswordError("");

    if (!name) {
      setNameError("이름을 입력하세요.");
      isValid = false;
    }
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
    } else if (password.length < 6) {
      setPasswordError("비밀번호는 최소 6자 이상이어야 합니다.");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("비밀번호를 한 번 더 입력해주세요.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    }

    return isValid;
  };

  const handleEmailSignUp = async () => {
    if (!validateForm()) return;

    try {
      await SignUpWithEmail({
        name,
        email,
        password,
      });
      navigate("/", {
        replace: true,
        state: { authSuccess: "register" },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const message = error.message;

        if (message.includes("already") || message.includes("registered")) {
          setEmailError("이미 가입된 이메일입니다.");
        } else {
          setErrorMessage("회원가입 중 오류가 발생했습니다.");
        }
      } else {
        setErrorMessage("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEmailSignUp();
    }
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        transform: "translateY(-46px)",
      }}
    >
      <Box sx={{ width: 380, px: 2 }}>
        <Typography variant="h1" textAlign="center" mb={5}>
          회원가입
        </Typography>
        <TextField
          fullWidth
          label="이름 *"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!nameError}
          helperText={nameError}
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
          sx={{
            "& .MuiOutlinedInput-root fieldset": {
              borderColor: "text.secondary",
            },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: "primary.main",
              borderWidth: 2,
            },
          }}
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
        />
        <TextField
          fullWidth
          label="비밀번호 확인 *"
          type={showConfirmPassword ? "text" : "password"}
          margin="normal"
          value={confirmPassword}
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
          onKeyDown={handleKeyDown}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root fieldset": {
              borderColor: "text.secondary",
            },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: "primary.main",
              borderWidth: 2,
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  edge="end"
                  sx={{ color: "grey.500" }}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {errorMessage && (
          <Typography color="error" textAlign="center" mt={1}>
            {errorMessage}
          </Typography>
        )}
        <Button
          fullWidth
          size="large"
          variant="contained"
          sx={{ mt: 4, height: 48 }}
          onClick={handleEmailSignUp}
        >
          회원가입
        </Button>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography variant="body2">이미 계정이 있나요?</Typography>
          <Typography
            variant="body2"
            sx={{
              cursor: "pointer",
              fontWeight: 600,
              textDecoration: "underline",
            }}
            onClick={() => navigate("/login")}
          >
            로그인
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;

//이메일 중복 검사 (O)
//로그인 페이지로 이동하는 링크 추가 (O)
//비밀번호 확인 아이콘 따로 움직이게 (O)
