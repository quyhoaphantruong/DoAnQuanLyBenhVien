import CreateTreatMentPage from "../../pages/treatments/CreateTreatMentPage";
import TreatmentDetailsPage from "../../pages/treatments/TreatmentDetailsPage";
import TreatmentsPatientListPage from "../../pages/treatments/TreatmentsPatientListPage";
import ViewTreatmentsPage from "../../pages/treatments/ViewTreatmentsPage";

const treatmentRouter = [
  {
    path: "create-treatment",
    element: <CreateTreatMentPage />,
  },
  {
    path: "view-treatments",
    element: <ViewTreatmentsPage />,
  },
  {
    path: "/treatments/:idBenhNhan",
    element: <TreatmentsPatientListPage />,
  },
  {
    path: "/treatment-details/:idKeHoachDieuTri",
    element: <TreatmentDetailsPage />,
  },
];

export default treatmentRouter;
