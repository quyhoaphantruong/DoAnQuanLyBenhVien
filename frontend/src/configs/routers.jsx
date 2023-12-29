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
import CreateTreatMentPage from "../pages/treatments/CreateTreatMentPage";
import PaymentDebtPage from "../pages/payment/PaymentDebtPage";
import PatientDebtPage from "../pages/payment/PatientDebtPage";
import CompletePaymentDebtPage from "../pages/payment/CompletePaymentDebtPage";
import CreatePatientPage from "../pages/patients/CreatePatientPage";
import drugRouters from "../constants/routers/drugRouter";
import ViewTreatmentsPage from "../pages/treatments/ViewTreatmentsPage";
import treatmentRouter from "../constants/routers/treatmentRouter";
import clinicsRouter from "../constants/routers/clincsRouter";

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
        path: "/create-patient",
        element: <CreatePatientPage />,
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
      {
        path: "payment-debt",
        element: <PaymentDebtPage />,
      },
      {
        path: "patient-debt/:patientId",
        element: <PatientDebtPage />,
      },
      {
        path: "complete-payment-debt/:debtId",
        element: <CompletePaymentDebtPage />,
      },
      ...drugRouters,
      ...treatmentRouter,
      ...clinicsRouter,
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
