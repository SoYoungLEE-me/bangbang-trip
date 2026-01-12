import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const AppLayout = () => {
  return (
    <Box>
      <NavBar />
      <Outlet />
    </Box>
  );
};

export default AppLayout;
