import HomeIcon from "@mui/icons-material/Home";
import AccessibleIcon from "@mui/icons-material/Accessible";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ManIcon from "@mui/icons-material/Man";
import treatmentsRoutes from "./constantsForAppRoutes/treatmentsRoutes";
import drugRoutes from "./constantsForAppRoutes/drugRoutes";
import paymentRoutes from "./constantsForAppRoutes/paymentRoutes";
import patientRoutes from "./constantsForAppRoutes/patientRoutes";
// import drugRoutes from "./constantsForAppRoutes/drugRoutes";

const appRoutes = [
  {
    state: "home",
    path: "/home",
    sidebarProps: {
      displayText: "Trang chủ",
      icon: <HomeIcon />,
    },
  },
  patientRoutes,
  {
    state: "appointment",
    path: "/appointments",
    sidebarProps: {
      displayText: "Cuộc hẹn",
      icon: <LocalPhoneIcon />,
    },
    child: [
      {
        state: "create-appointments",
        path: "/create-appointment",
        sidebarProps: {
          displayText: "Tạo cuộc hẹn",
          icon: <LocalPhoneIcon />,
        },
      },
    ],
  },
  {
    state: "staff",
    path: "/staff",
    sidebarProps: {
      displayText: "Nhân viên",
      icon: <ManIcon />,
    },
    child: [
      {
        path: "/create-staff",
        sidebarProps: {
          displayText: "Tạo nhân viên",
          icon: <ManIcon />,
        },
      },
      {
        path: "/staff",
        index: true,
        sidebarProps: {
          displayText: "Danh sách nhân viên",
          icon: <ManIcon />,
        },
      },
      {
        path: "/manage-staff",
        sidebarProps: {
          displayText: "Quản lý nhân viên",
          icon: <ManIcon />,
        },
      },
    ],
  },
  {
    state: "working-calendars",
    path: "/working-calendars",
    sidebarProps: {
      displayText: "Lịch làm việc",
      icon: <CalendarMonthIcon />,
    },
    child: [
      {
        state: "create-calendar",
        path: "/create-calendar",
        sidebarProps: {
          displayText: "Tạo lịch hẹn",
          icon: <CalendarMonthIcon />,
        },
      },
      {
        state: "calendar-staff",
        path: "/calendar-staff",
        sidebarProps: {
          displayText: "Lịch làm việc nhân viên",
          icon: <CalendarMonthIcon />,
        },
      },
    ],
  },
  treatmentsRoutes,
  drugRoutes,
  paymentRoutes,
];

export default appRoutes;
