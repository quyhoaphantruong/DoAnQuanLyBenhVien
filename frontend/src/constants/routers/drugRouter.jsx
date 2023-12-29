import ManageDrugPage from "../../pages/drug/ManageDrugPage";
import PrescribeDrugPage from "../../pages/drug/PrescribeDrugPage";
import ViewClinicDrugDetailsPage from "../../pages/drug/ViewClinicDrugDetailsPage";

const drugRouters = [
  {
    path: "prescribe-drug",
    element: <PrescribeDrugPage />,
  },
  {
    path: "manage-drug",
    element: <ManageDrugPage />,
  },
  {
    path: "/clinic/:idPhongKham/drug",
    element: <ViewClinicDrugDetailsPage />,
  },
];

export default drugRouters;
