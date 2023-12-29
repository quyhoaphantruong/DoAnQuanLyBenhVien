import { ListItemButton, ListItemIcon } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import colorConfigs from "../../configs/colorConfigs";

const SidebarItem = ({ item }) => {
  const { appState } = useSelector((state) => state.appState);
  const { user } = useSelector((state) => state.user);
  const loaiNhanVien = user?.loaiNhanVien || null;
  if (item?.roles && loaiNhanVien) {
    if (!item.roles.includes(loaiNhanVien)) return null;
  }

  return item?.sidebarProps && item.path ? (
    <ListItemButton
      component={Link}
      to={item.path}
      sx={{
        "&: hover": {
          backgroundColor: colorConfigs.sidebar.hoverBg,
        },
        backgroundColor:
          appState === item.state ? colorConfigs.sidebar.activeBg : "unset",
        paddingY: "12px",
        paddingX: "24px",
      }}
    >
      <ListItemIcon
        sx={{
          color: colorConfigs.sidebar.color,
        }}
      >
        {item.sidebarProps.icon && item.sidebarProps.icon}
      </ListItemIcon>
      {item.sidebarProps.displayText}
    </ListItemButton>
  ) : null;
};

export default SidebarItem;
