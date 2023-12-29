export const getDieuTriStatusText = (tinhTrangDieuTri) => {
  switch (tinhTrangDieuTri) {
    case 0:
      return "Kế hoạch";
    case 1:
      return "Đã hoàn thành";
    case 2:
      return "Đã hủy";
    default:
      return "Unknown";
  }
};

export const getDieuTriColor = (tinhTrangDieuTri) => {
  switch (tinhTrangDieuTri) {
    case 0: {
      return "primary"; // Blue
    }
    case 1:
      return "secondary"; // Green
    case 2:
      return "info"; // Yellow
    default:
      return "black";
  }
};
