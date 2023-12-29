import HomeIcon from "@mui/icons-material/Home";

const drugRoutes = {
  state: "drug",
  path: "/drug",
  sidebarProps: {
    displayText: "Thuốc",
    icon: <HomeIcon />,
  },
  child: [
    {
      state: "create-drug",
      path: "create-drug",
      sidebarProps: {
        displayText: "Thêm thuốc",
        icon: <HomeIcon />,
      },
    },
    {
      state: "manage-drug",
      path: "manage-drug",
      sidebarProps: {
        displayText: "Quản lý thuốc",
        icon: <HomeIcon />,
      },
    },
    {
      state: "prescribe-drug",
      path: "prescribe-drug",
      sidebarProps: {
        displayText: "Kê khai thuốc",
        icon: <HomeIcon />,
      },
    },
  ],
};

export default drugRoutes;
