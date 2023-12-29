import React from "react";

function HomePage() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
  };

  const titleBoxStyle = {
    backgroundColor: "white",
    borderRadius: "8px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  };

  const titleContentStyle = {
    marginLeft: "20px", // Add margin to separate the image and title
  };

  const titleStyle = {
    fontWeight: "bold",
    fontSize: "24px",
    marginTop: "10px", 
    marginLeft: "130px",
  };

  const imageStyle = {
    width: "700px",
    height: "500px",
  };

  const informationStyle1 = {
    fontWeight: "bold",
    fontSize: "18px",
    marginTop: "40px", 
    marginLeft: "130px",
  };

  const informationStyle2 = {
    fontSize: "16px",
    marginTop: "30px", 
    marginLeft: "140px",
  };

  return (
    <div style={containerStyle}>
      <div style={titleBoxStyle}>
        <img
          src="https://images.pexels.com/photos/287237/pexels-photo-287237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Your Alt Text"
          style={imageStyle}
        />
        <div style={titleContentStyle}>
          <div style={titleStyle}>Phòng khám nha khoa</div>
          <div style={informationStyle1}>Giờ làm việc:</div>
          <div style={informationStyle2}>* Thứ 2 đến Thứ 7: 8 giờ - 21 giờ </div>
          <div style={informationStyle2}>* Chủ nhật và các ngày lễ: 8 giờ - 13 giờ </div>
          <div style={informationStyle1}>Chi nhánh:</div>
          <div style={informationStyle2}>1. Tân Bình: 0934567895</div>
          <div style={informationStyle2}>2. Bình Tân: 0854365896</div>
          <div style={informationStyle2}>3. Nguyễn Văn Luông: 0984578254</div>
        </div>
      </div>
      <main>
        {/* Content of your homepage */}
        {/* ... */}
      </main>
    </div>
  );
}

export default HomePage;
