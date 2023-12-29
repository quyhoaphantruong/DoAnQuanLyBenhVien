import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  ListItemButton,
} from "@mui/material";
import { mockTreatments } from "../../constants/TreatmentMockData";
import TeethAndFacialSelection from "./TeethAndFacialSelection";
import TreatmentDataService from "../../api/services/TreatmentDataService";
import { formatToVND } from "../../utilities/formatPrice";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTreatment } from "../../redux/features/treatmentPlanSlice";
import ReviewInformation from "./ReviewInformation";

const TreatmentsComponent = () => {
  const { selectedTreatment } = useSelector((state) => state.treatmentPlan);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingTreatments, setLoadingTreatments] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await TreatmentDataService.xemDanhSachDanhMucDieuTri();
        if (response?.status == 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Ko lấy đươc danh mục:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    setLoadingTreatments(true);

    try {
      const response = await TreatmentDataService.xemDanhSachDieuTri(
        categoryId
      );
      console.log(response);
      if (response?.status == 200) setTreatments(response.data);
    } catch (error) {
      console.error("Error fetching treatments:", error);
    } finally {
      setLoadingTreatments(false);
    }
  };

  const handleTreatmentClick = (treatment) => {
    dispatch(setSelectedTreatment(treatment));
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "40%", marginRight: "20px" }}>
          <Typography variant="h5">Danh mục điều trị</Typography>
          {loadingCategories && <CircularProgress />}
          <List>
            {categories?.map((category) => (
              <ListItem
                key={category.id}
                onClick={() => handleCategoryClick(category.idDanhMucDieuTri)}
              >
                <ListItemButton>
                  <ListItemText primary={category?.tenDanhMuc} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
        <div style={{ width: "40%" }}>
          <Typography variant="h5">Điều trị</Typography>
          {loadingTreatments && <CircularProgress />}
          <List>
            {treatments?.map((treatment) => (
              <ListItemButton
                key={treatment?.idDieuTri}
                disableGutters
                onClick={() => handleTreatmentClick(treatment)}
              >
                <ListItemText
                  primary={treatment.tenDieuTri}
                  secondary={formatToVND(treatment?.phi)}
                />
              </ListItemButton>
            ))}
          </List>
        </div>
      </div>
      {selectedTreatment && <TeethAndFacialSelection />}
      {/* Review information */}
      <ReviewInformation />
    </>
  );
};

export default TreatmentsComponent;
