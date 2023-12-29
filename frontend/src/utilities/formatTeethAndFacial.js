export const formatTeethAndFacialTypesToString = (teethAndFacialTypes) => {
  let result = [];
  teethAndFacialTypes.forEach((item) => {
    result.push(`${item.tenRang}-${item.tenMat}`);
  });
  return result.join(", ");
};
