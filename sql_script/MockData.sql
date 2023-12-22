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
-- TẠO LỊCH LÀM VIỆC 
EXEC TAO_LICHLAMVIEC 1, 1, '2023-12-01 6:00'
EXEC TAO_LICHLAMVIEC 2, 1, '2023-12-01 6:00'
EXEC TAO_LICHLAMVIEC 3, 1, '2023-12-01 6:00'

EXEC TAO_LICHLAMVIEC 1, 1, '2023-12-02 6:00'
EXEC TAO_LICHLAMVIEC 2, 1, '2023-12-02 13:00'
EXEC TAO_LICHLAMVIEC 3, 1, '2023-12-02 13:00'

SELECT * FROM LICHLAMVIEC
-- TẠO PHÒNG KHÁM
INSERT INTO PHONGKHAM(DIACHIPK, SDTPK)
VALUES (N'TÂN BÌNH', '0934567895'),
		(N'NGUYỄN VĂN LUÔNG', '0984578254')

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
EXEC TAO_PHONGKHAM N'BÌNH TÂN', '0854365896'
SELECT * FROM PHONGKHAM
GO
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
VALUES (N'Răng chải trên phải 1'), -- răng chải
		(N'Răng chải trên phải 2')
,(N'Răng chải trên trái 1')
,(N'Răng chải trên trái 2')
,(N'Răng cắt trên phải 1')-- răng cắt
,(N'Răng cắt trên trái 1')
,(N'Răng nhai đầu trên phải 1')--răng nhai đầu
,(N'Răng nhai đầu trên phải 2')
,(N'Răng nhai đầu trên trái 1')
,(N'Răng nhai đầu trên trái 2')
,(N'Răng nhai trên phải 1')--răng nhai
,(N'Răng nhai trên phải 2')
,(N'Răng nhai trên phải 3')
,(N'Răng nhai trên trái 1')
, (N'Răng nhai trên trái 2')
, (N'Răng nhai trên phải 3')
,(N'Răng chải dưới phải 1') -- răng chải
,(N'Răng chải dưới phải 2')
,(N'Răng chải dưới trái 1')
,(N'Răng chải dưới trái 2')
,(N'Răng cắt dưới phải 1')-- răng cắt
,(N'Răng cắt dưới trái 1')
,(N'Răng nhai đầu dưới phải 1')--răng nhai đầu
,(N'Răng nhai đầu dưới phải 2')
,(N'Răng nhai đầu dưới trái 1')
,(N'Răng nhai đầu dưới trái 2')
,(N'Răng nhai dưới phải 1')--răng nhai
,(N'Răng nhai dưới phải 2')
,(N'Răng nhai dưới phải 3')
,(N'Răng nhai dưới trái 1')
,(N'Răng nhai dưới trái 2')
,(N'Răng nhai dưới phải 3')

INSERT INTO MAT(LOAIMAT, TENMAT)
VALUES ('L', 'Lingual'),
 ('F', 'Facial'),
 ('D', 'Distal'),
 ('M', 'Mesial'),
 ('T', 'Top'), 
 ('R', 'Root') 

-- THÊM DANH MỤC ĐIỀU TRỊ VÀ ĐIỀU TRỊ
INSERT INTO DANHMUC_DIEUTRI(TENDANHMUC)
VALUES 
   (N'Chăm sóc nha khoa chung'),
   (N'Phục hình răng'),
   (N'Trám răng'),
   (N'Nhổ răng'),
   (N'Chụp X-quang răng');

INSERT INTO DIEUTRI(ID_DANHMUC_DIEUTRI, TENDIEUTRI, PHI)
VALUES   (1, N'Dịch vụ chăm sóc tổng thể', 80),
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

-- TẠO THUỐC
INSERT INTO THUOC(TEN_THUOC, PHI)
VALUES ('THUOC 1', 10),
		('THUOC 2', 20)