import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/HomePage";
import PatientsPage from "../pages/PatientsPage";
import AppointmentsPage from "../pages/AppointmentsPage";
import LoginPageForPersonnel from "../pages/LoginPageForPersonnel";
import CreateStaffPage from "../pages/CreateStaffPage";
import CreateAppointment from "../pages/appointments/CreateAppointment";
import CreateCalendar from "../pages/working-calendar/CreateCalendar";
import StaffViewPage from "../pages/staff/StaffViewPage";
import CalendarStaffPage from "../pages/working-calendar/CalendarStaffPage";
import CalendarEachStaff from "../pages/working-calendar/CalendarEachStaff";
import ManageStaffPage from "../pages/staff/ManageStaffPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/patients",
        element: <PatientsPage />,
      },
      {
        path: "/appointments",
        element: <AppointmentsPage />,
      },
      {
        path: "/create-appointment",
        element: <CreateAppointment />,
      },
      {
        path: "/staff",
        element: <StaffViewPage />,
      },
      {
        path: "/create-staff",
        element: <CreateStaffPage />,
      },
      {
        path: "/manage-staff",
        element: <ManageStaffPage />,
      },
      {
        path: "/working-calendars",
        element: <div>Working Calendars</div>,
      },
      {
        path: "/create-calendar",
        element: <CreateCalendar />,
      },
      {
        path: "/calendar-staff",
        element: <CalendarStaffPage />,
      },
      {
        path: "/calendar-staff/:idNhanVien",
        element: <CalendarEachStaff />,
      },
    ],
  },
  {
    path: "/login-personnel",
    element: <LoginPageForPersonnel />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);

export default router;
