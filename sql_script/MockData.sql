USE QLPHONGKHAM_CSDLNC;
GO

DECLARE @counter INT = 1;
WHILE @counter <= 10
BEGIN
    DECLARE @TEN NVARCHAR(50) = 'NhanVien ' + CAST(@counter AS NVARCHAR(2));
    DECLARE @NGAYSINH DATE = DATEADD(YEAR, -30, GETDATE());
    DECLARE @DIACHI NVARCHAR(50) = 'Address ' + CAST(@counter AS NVARCHAR(2));
    DECLARE @EMAIL VARCHAR(30) = 'email' + CAST(@counter AS NVARCHAR(2)) + '@example.com';
    DECLARE @SODIENTHOAI CHAR(10) = '1234567' + CAST(@counter AS NVARCHAR(1));
    DECLARE @LOAINHANVIEN NVARCHAR(13) = N'Nha sĩ';

    EXEC TAO_NHANVIEN @TEN, @NGAYSINH, @DIACHI, @EMAIL, @SODIENTHOAI, @LOAINHANVIEN;

    SET @counter = @counter + 1;
END;

SELECT * FROM NHANVIEN

-- TẠO PHÒNG KHÁM
INSERT INTO PHONGKHAM(DIACHIPK, SDTPK)
VALUES (N'TÂN BÌNH', '0934567895')

DECLARE @counter INT = 1;
DECLARE @ID_PHONGKHAM NVARCHAR(10) = 1;

WHILE @counter <= 5
BEGIN
    DECLARE @ID_LICHLAMVIEC NVARCHAR(10) = 'LLV_' + CAST(@counter AS NVARCHAR(2));
    DECLARE @GIO_BATDAU DATETIME = DATEADD(DAY, @counter, GETDATE()); -- Adjust start time
    DECLARE @GIO_KETTHUC DATETIME = DATEADD(HOUR, 4, @GIO_BATDAU); -- Adding 4 hours to start time

    EXEC TAO_LICH_LAM_VIEC @ID_LICHLAMVIEC, 'NV_1', @ID_PHONGKHAM, @GIO_BATDAU, @GIO_KETTHUC;

    SET @counter = @counter + 1;
END;

SELECT * FROM LICHLAMVIEC

-- TẠO BỆNH NHÂN
-- Inserting mock data into TAIKHOAN table
INSERT INTO TAIKHOAN (DIENTHOAI, MATKHAU)
VALUES ('0123456789', 'password1'), -- Mocking an existing phone number
       ('0987654321', 'password2'), -- Another existing phone number
       ('0909090909', 'password3'); -- A new phone number

-- Inserting mock data into BENHNHAN table
INSERT INTO BENHNHAN (TEN, GIOITINH, EMAIL, SODIENTHOAI)
VALUES ('John Doe', N'Nam', 'john@example.com', '0123456789'), -- Existing phone number
       ('Jane Doe', N'Nữ', 'jane@example.com', '0987654321'), -- Another existing phone number
       ('Alice Smith', N'Nữ', 'alice@example.com', '0909090909'); -- A new phone number

-- TẠO PHÒNG KHÁM
INSERT INTO PHONGKHAM(ID_PHONGKHAM, DIACHIPK, SDTPK)
VALUES ('PK1', N'BÌNH TÂN', '0909090909')

-- TẠO LỊCH LÀM VIỆC

-- TẠO BỆNH NHÂN
DECLARE @Counter INT = 1;
WHILE @Counter <= 10
BEGIN
    DECLARE @Ten NVARCHAR(50) = 'BenhNhan ' + CAST(@Counter AS NVARCHAR(2));
    DECLARE @GioiTinh NVARCHAR(3);
    IF @Counter % 2 = 0
        SET @GioiTinh = N'Nam';
    ELSE
        SET @GioiTinh = N'Nữ';

    DECLARE @Email CHAR(30) = 'example' + CAST(@Counter AS NVARCHAR(2)) + '@domain.com';
    DECLARE @SoDienThoai CHAR(10) = '01234567' + CAST(@Counter AS NVARCHAR(2));
    DECLARE @MatKhau CHAR(20) = 'password' + CAST(@Counter AS NVARCHAR(2));

    EXEC DANG_KY 
        @SODIENTHOAI = @SoDienThoai,
        @MATKHAU = @MatKhau,
        @TEN = @Ten,
        @GIOITINH = @GioiTinh,
        @EMAIL = @Email;

    SET @Counter = @Counter + 1;
END;

-- tạo răng và mặt
INSERT INTO RANG(TEN_RANG)
VALUES (N'Răng chải trên phải 1') -- răng chải
VALUES (N'Răng chải trên phải 2')
VALUES (N'Răng chải trên trái 1')
VALUES (N'Răng chải trên trái 2')
VALUES (N'Răng cắt trên phải 1')-- răng cắt
VALUES (N'Răng cắt trên trái 1')
VALUES (N'Răng nhai đầu trên phải 1')--răng nhai đầu
VALUES (N'Răng nhai đầu trên phải 2')
VALUES (N'Răng nhai đầu trên trái 1')
VALUES (N'Răng nhai đầu trên trái 2')
VALUES (N'Răng nhai trên phải 1')--răng nhai
VALUES (N'Răng nhai trên phải 2')
VALUES (N'Răng nhai trên phải 3')
VALUES (N'Răng nhai trên trái 1')
VALUES (N'Răng nhai trên trái 2')
VALUES (N'Răng nhai trên phải 3')

VALUES (N'Răng chải dưới phải 1') -- răng chải
VALUES (N'Răng chải dưới phải 2')
VALUES (N'Răng chải dưới trái 1')
VALUES (N'Răng chải dưới trái 2')
VALUES (N'Răng cắt dưới phải 1')-- răng cắt
VALUES (N'Răng cắt dưới trái 1')
VALUES (N'Răng nhai đầu dưới phải 1')--răng nhai đầu
VALUES (N'Răng nhai đầu dưới phải 2')
VALUES (N'Răng nhai đầu dưới trái 1')
VALUES (N'Răng nhai đầu dưới trái 2')
VALUES (N'Răng nhai dưới phải 1')--răng nhai
VALUES (N'Răng nhai dưới phải 2')
VALUES (N'Răng nhai dưới phải 3')
VALUES (N'Răng nhai dưới trái 1')
VALUES (N'Răng nhai dưới trái 2')
VALUES (N'Răng nhai dưới phải 3')

INSERT INTO MAT(LOAIMAT, TENMAT)
VALUES ('L', 'Lingual')
VALUES ('F', 'Facial')
VALUES ('D', 'Distal')
VALUES ('M', 'Mesial')
VALUES ('T', 'Top') 
VALUES ('R', 'Root') 
-- THÊM DANH MỤC ĐIỀU TRỊ VÀ ĐIỀU TRỊ
INSERT INTO DANHMUC_DIEUTRI(TENDANHMUC)
VALUES 
   (N'Chăm sóc nha khoa chung'),
   (N'Phục hình răng'),
   (N'Trám răng'),
   (N'Nhổ răng'),
   (N'Chụp X-quang răng');

INSERT INTO DIEUTRI(ID_DANHMUC_DIEUTRI, TENDIEUTRI, PHI)
   (1, N'Dịch vụ chăm sóc tổng thể', 80),
   (1, N'Tẩy trắng răng', 120),
   (1, N'Đánh bóng răng', 50),
   (2, N'Phục hình răng sứ', 150),
   (2, N'Phục hình răng sứ cao cấp', 200),
   (2, N'Phục hình răng sứ Zirconia', 250),
   (3, N'Trám răng composite', 50),
   (3, N'Trám răng sứ', 100),
   (3, N'Trám răng bảo vệ', 70),
   (4, N'Nhổ răng mặt định vị', 120),
   (4, N'Nhổ răng khôn', 150),
   (4, N'Nhổ răng mọc sai', 100),
   (5, N'Chụp X-quang răng cắt lớp', 100),
   (5, N'Chụp X-quang răng toàn diện', 150),
   (5, N'Chụp X-quang răng nội soi', 180)