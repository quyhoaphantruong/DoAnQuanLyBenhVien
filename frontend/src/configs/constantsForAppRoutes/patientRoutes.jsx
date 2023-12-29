import HomeIcon from "@mui/icons-material/Home";

const patientRoutes = {
  state: "manage-patient",
  path: "/patients",
  sidebarProps: {
    displayText: "Bệnh nhân",
    icon: <HomeIcon />,
  },
  child: [
    {
      state: "view-patients",
      path: "/patients",
      sidebarProps: {
        displayText: "Danh sách bệnh nhân",
        icon: <HomeIcon />,
      },
    },
    {
      state: "create-patient",
      path: "/create-patient",
      sidebarProps: {
        displayText: "Tạo bệnh nhân",
        icon: <HomeIcon />,
      },
    },
  ],
};

export default patientRoutes;
