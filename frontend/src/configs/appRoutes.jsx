import HomeIcon from "@mui/icons-material/Home";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ManIcon from "@mui/icons-material/Man";
import treatmentsRoutes from "./constantsForAppRoutes/treatmentsRoutes";
import drugRoutes from "./constantsForAppRoutes/drugRoutes";
import paymentRoutes from "./constantsForAppRoutes/paymentRoutes";
import patientRoutes from "./constantsForAppRoutes/patientRoutes";
import clinicRoutes from "./constantsForAppRoutes/clinicRoutes";
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
      {
        state: "view-appointments",
        path: "/view-appointments",
        sidebarProps: {
          displayText: "Xem cuộc hẹn",
          icon: <LocalPhoneIcon />,
        },
      },
    ],
  },
  // staff
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
        roles: ["Quản trị viên"],
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
    ],
  },
  // working calendars
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
          displayText: "Tạo lịch làm việc",
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
  clinicRoutes,
];

export default appRoutes;
