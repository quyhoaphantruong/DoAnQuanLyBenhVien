import { Button, FormControl, Grid, MenuItem, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedToothAndFacialType,
  setSelectedFacialType,
  setSelectedTooth,
} from "../../redux/features/treatmentPlanSlice";
function TeethAndFacialForm({ teeth, facialTypes }) {
  const { selectedTooth, selectedFacialType } = useSelector(
    (state) => state.treatmentPlan
  );
  const dispatch = useDispatch();
  return (
    <Grid container columnGap={5} alignItems={"center"}>
      <Grid item>
        <Select
          value={selectedTooth || teeth[0]}
          onChange={(e) => {
            dispatch(setSelectedTooth(e.target.value));
          }}
        >
          {teeth?.map((tooth) => (
            <MenuItem key={tooth.idRang} value={tooth}>
              {tooth?.tenRang}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <FormControl>
          <Select
            value={selectedFacialType || facialTypes[0]}
            onChange={(e) => {
              dispatch(setSelectedFacialType(e.target.value));
            }}
          >
            {facialTypes?.map((facialType) => (
              <MenuItem key={facialType?.loaiMat} value={facialType}>
                {facialType?.tenMat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => {
            console.log(selectedTooth, selectedFacialType);
            if (selectedTooth && selectedFacialType) {
              dispatch(
                addSelectedToothAndFacialType({
                  ...selectedTooth,
                  ...selectedFacialType,
                })
              );
              return;
            }
            alert("Bạn chưa chọn răng và mặt");
          }}
        >
          <AddIcon />
        </Button>
      </Grid>
    </Grid>
  );
}

export default TeethAndFacialForm;
