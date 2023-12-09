import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import sizeConfigs from "../../configs/sizeConfig";
import Topbar from "../Topbar";
import Sidebar from "../sidebar/Sidebar";
import colorConfigs from "../../configs/colorConfigs";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      <Box
        component="nav"
        sx={{
          width: sizeConfigs.sidebar.width,
          flexShrink: 0,
        }}
      >
        <Sidebar />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${sizeConfigs.sidebar.width})`,
          minHeight: "100vh",
          backgroundColor: colorConfigs.mainBg,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
