import HomeIcon from "@mui/icons-material/Home";

const clinicRoutes = {
  state: "clinic",
  path: "/clinics",
  sidebarProps: {
    displayText: "Phòng khám",
    icon: <HomeIcon />,
  },
  child: [
    {
      state: "view-clincs",
      path: "/clinics",
      sidebarProps: {
        displayText: "Danh sách phòng khám",
        icon: <HomeIcon />,
      },
    },
  ],
};

export default clinicRoutes;
