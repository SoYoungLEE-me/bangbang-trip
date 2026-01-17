import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useSelectedSpotsStore } from "../stores/selectedSpotsStore";
import type { TourSpot } from "../models/tour";

const AppLayout = () => {
  const { toggleSpot } = useSelectedSpotsStore();
  const hasLoadedRef = useRef(false);

  // localStorage에서 찜한 항목 불러오기
  useEffect(() => {
    if (hasLoadedRef.current) return;
    
    const saved = localStorage.getItem("selected-spots-storage");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.state?.selectedSpots && parsed.state.selectedSpots.length > 0) {
          // store가 비어있을 때만 불러오기
          const currentSpots = useSelectedSpotsStore.getState().selectedSpots;
          if (currentSpots.length === 0) {
            hasLoadedRef.current = true; // 불러오기 시작 표시
            parsed.state.selectedSpots.forEach((spot: TourSpot) => {
              toggleSpot(spot);
            });
          }
        }
      } catch (e) {
        console.error("localStorage 파싱 오류", e);
      }
    }
    hasLoadedRef.current = true; // 불러오기 완료 표시
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBar />
      <Box sx={{ flex: 1, pt: { xs: "56px", md: "70px" } }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default AppLayout;