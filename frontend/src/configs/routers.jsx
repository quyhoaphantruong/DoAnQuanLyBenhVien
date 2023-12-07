import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/HomePage";
import PatientsPage from "../pages/PatientsPage";
import AppointmentsPage from "../pages/AppointmentsPage";
import StaffPage from "../pages/StaffPage";
import LoginPageForPersonnel from "../pages/LoginPageForPersonnel";

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
        path: "/staff",
        element: <StaffPage />,
      },
      {
        path: "/working-calendars",
        element: <div>Working Calendars</div>,
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
