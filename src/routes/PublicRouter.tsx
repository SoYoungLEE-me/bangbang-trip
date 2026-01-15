import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const PublicRouter = () => {
  const { user } = useAuthStore();

  if (
    user &&
    location.pathname !== "/login" &&
    location.pathname !== "/register"
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRouter;

//로그인이 되어 있을 경우 페이지 처리 -> /페이지로 리다이렉트 해야함(O)
