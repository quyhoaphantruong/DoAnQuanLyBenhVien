import { AppBar, Toolbar, Typography } from "@mui/material";
import sizeConfigs from "../configs/sizeConfig";
import colorConfigs from "../configs/colorConfigs";

const Topbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
      }}
    >
      <Toolbar>
        <Typography variant="h6">Hệ Thống Quản Lý Bệnh Viện</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
