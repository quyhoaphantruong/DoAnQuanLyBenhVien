import HomeIcon from "@mui/icons-material/Home";
const treatmentsRoutes = {
  state: "drug",
  path: "/drug",
  sidebarProps: {
    displayText: "Kế hoạch điều trị ",
    icon: <HomeIcon />,
  },
  child: [
    {
      state: "create-treatment",
      path: "create-treatment",
      sidebarProps: {
        displayText: "Tạo kế hoạch điều trị",
        icon: <HomeIcon />,
      },
    },
    {
      state: "view-treatments",
      path: "view-treatments",
      sidebarProps: {
        displayText: "Xem kế hoạch điều trị",
        icon: <HomeIcon />,
      },
    },
  ],
};

export default treatmentsRoutes;
