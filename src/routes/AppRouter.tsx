import React from "react";
import { Route, Routes } from "react-router-dom";
const AppLayout = React.lazy(() => import("../layout/AppLayout"));
const PrivateRoute = React.lazy(() => import("./PrivateRoute"));
const PublicRouter = React.lazy(() => import("./PublicRouter"));

const LoginPage = React.lazy(() => import("../pages/LoginPage/LoginPage"));
const RegisterPage = React.lazy(
  () => import("../pages/RegisterPage/RegisterPage")
);
const LandingPage = React.lazy(
  () => import("../pages/LandingPage/LandingPage")
);
const SpotDetailPage = React.lazy(
  () => import("../pages/SpotDetailPage/SpotDetailPage")
);
const MyPage = React.lazy(() => import("../pages/MyPage/MyPage"));
const AiPlannerPage = React.lazy(
  () => import("../pages/AiPlannerPage/AiPlannerPage")
);
const SpotsListPage = React.lazy(
  () => import("../pages/SpotsListPage/SpotsListPage")
);

const MyPlanDetailPage = React.lazy(
  () => import("../pages/MyPlanDetailPage/MyPlanDetailPage")
);

import ResetPasswordPage from "../pages/Reset-Password/ResetPasswordPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="spots" element={<SpotsListPage />} />
        <Route path="spots/:id" element={<SpotDetailPage />} />
        <Route path="ai-planner" element={<AiPlannerPage />} />
        <Route path="my-plan/:id" element={<MyPlanDetailPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/mypage" element={<MyPage />} />
        </Route>
        <Route element={<PublicRouter />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
};

export default AppRouter;
