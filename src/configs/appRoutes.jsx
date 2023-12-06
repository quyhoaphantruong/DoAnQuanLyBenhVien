import HomeIcon from "@mui/icons-material/Home";
import AccessibleIcon from "@mui/icons-material/Accessible";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ManIcon from "@mui/icons-material/Man";

const appRoutes = [
  {
    state: "home",
    path: "/home",
    sidebarProps: {
      displayText: "Home",
      icon: <HomeIcon />,
    },
  },
  {
    state: "manage-patient",
    path: "/patients",
    sidebarProps: {
      displayText: "Patients",
      icon: <AccessibleIcon />,
    },
  },
  {
    state: "appointment",
    path: "/appointments",
    sidebarProps: {
      displayText: "Appointments",
      icon: <LocalPhoneIcon />,
    },
  },
  {
    state: "staff",
    path: "/staff",
    sidebarProps: {
      displayText: "Staff",
      icon: <ManIcon />,
    },
  },
  {
    state: "working-calendars",
    path: "/working-calendars",
    sidebarProps: {
      displayText: "Working calendars",
      icon: <CalendarMonthIcon />,
    },
  },
];

export default appRoutes;
