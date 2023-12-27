import HomeIcon from "@mui/icons-material/Home";

const paymentRoutes = {
  state: "payment",
  path: "/payment",
  sidebarProps: {
    displayText: "Thanh toán",
    icon: <HomeIcon />,
  },
  child: [
    {
      state: "payment-debt",
      path: "payment-debt",
      sidebarProps: {
        displayText: "Xem thanh toán nợ",
        icon: <HomeIcon />,
      },
    },
  ],
};

export default paymentRoutes;
