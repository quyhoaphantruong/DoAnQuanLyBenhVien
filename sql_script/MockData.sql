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

	--TẠO nha sĩ
    EXEC TAO_NHANVIEN @TEN, @NGAYSINH, @DIACHI, @EMAIL, @SODIENTHOAI, @LOAINHANVIEN;
    SET @counter = @counter + 1;
END;

--tạo lễ tân
DECLARE @counter INT = 1;
WHILE @counter <= 5
BEGIN
    DECLARE @TEN NVARCHAR(50) = 'NhanVien ' + CAST(@counter AS NVARCHAR(2));
    DECLARE @NGAYSINH DATE = DATEADD(YEAR, -30, GETDATE());
    DECLARE @DIACHI NVARCHAR(50) = 'Address ' + CAST(@counter AS NVARCHAR(2));
    DECLARE @EMAIL VARCHAR(30) = 'email' + CAST(@counter AS NVARCHAR(2)) + '@example.com';
    DECLARE @SODIENTHOAI CHAR(10) = '0234567' + CAST(@counter AS NVARCHAR(1));
    DECLARE @LOAINHANVIEN NVARCHAR(13) = N'Lễ tân';

    EXEC TAO_NHANVIEN @TEN, @NGAYSINH, @DIACHI, @EMAIL, @SODIENTHOAI, @LOAINHANVIEN;
    SET @counter = @counter + 1;
END;
--tạo admin
 EXEC TAO_NHANVIEN 'Admin', '01/01/1998', N'Nguyễn Tri Phương', 'admin1998@email.com', '0111222333', N'Quản trị viên'

SELECT * FROM NHANVIEN
-- TẠO LỊCH LÀM VIỆC 
EXEC TAO_LICHLAMVIEC 1, 1, '2023-12-01 6:00'
EXEC TAO_LICHLAMVIEC 2, 1, '2023-12-01 6:00'
EXEC TAO_LICHLAMVIEC 3, 1, '2023-12-01 6:00'
EXEC TAO_LICHLAMVIEC 1, 1, '2023-12-02 6:00'
EXEC TAO_LICHLAMVIEC 2, 1, '2023-12-02 13:00'
EXEC TAO_LICHLAMVIEC 3, 1, '2023-12-02 13:00'

--SELECT * FROM LICHLAMVIEC
-- TẠO PHÒNG KHÁM
--INSERT INTO PHONGKHAM(DIACHIPK, SDTPK)
--VALUES (N'TÂN BÌNH', '0934567895'),
--		(N'NGUYỄN VĂN LUÔNG', '0984578254')

SELECT * FROM PHONGKHAM
EXEC TAO_PHONGKHAM N'TÂN BÌNH', '0934567895'
EXEC TAO_PHONGKHAM N'NGUYỄN VĂN LUÔNG', '09845782546'
EXEC TAO_PHONGKHAM N'BÌNH TÂN', '0854365896'


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
GO

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
		('THUOC 2', 20),
		('THUOC 3', 200),
		('THUOC 4', 100),
		('THUOC 5', 500)

--TẠO CUỘC HẸN
EXEC TAO_CUOCHEN 8, 1, 3, '2023-12-30 16:30', '', N'Mới'
EXEC TAO_CUOCHEN 9, 2, 4, '2024-02-12 19:30', '', N'Tái khám'
EXEC TAO_CUOCHEN 1, 3, 5, '2023-12-01 19:30', '', N'Mới'
EXEC TAO_CUOCHEN 3, 1, 6, '2023-12-11 8:30', '', N'Tái khám'
EXEC TAO_CUOCHEN 4, 1, 16, '2023-12-31 8:30', '', N'Mới'

--TẠO ĐƠN THUỐC
EXEC THEM_DONTHUOC 5, 1, 3, ''
EXEC THEM_DONTHUOC 6, 2, 1, ''
EXEC THEM_DONTHUOC 2, 6, 3, ''
EXEC THEM_DONTHUOC 15, 1, 2, ''
EXEC THEM_DONTHUOC 50, 8, 2, N'Dị ứng Paracetamol'

--TẠO KẾ HOẠCH ĐIỀU TRỊ
DECLARE @OUTPUT_ID INT
EXEC THEM_KEHOACH_DIEUTRI N'NHỔ RĂNG', N'SÂU RĂNG', 1, @OUTPUT_ID = @OUTPUT_ID OUTPUT
EXEC THEM_KEHOACH_DIEUTRI N'TRÁM RĂNG', N'SÂU RĂNG', 2, @OUTPUT_ID = @OUTPUT_ID OUTPUT
EXEC THEM_KEHOACH_DIEUTRI N'SÂU RĂNG CỐI', N'SÂU RĂNG', 3, @OUTPUT_ID = @OUTPUT_ID OUTPUT
EXEC THEM_KEHOACH_DIEUTRI N'NHỔ RĂNG KHÔN', N'RĂNG MỌC LỆCH', 4, @OUTPUT_ID = @OUTPUT_ID OUTPUT
EXEC THEM_KEHOACH_DIEUTRI N'CẤY IMPLANT', N'SÂU RĂNG NẶNG ĐẾN TỦY', 5, @OUTPUT_ID = @OUTPUT_ID OUTPUT

--TẠO CHI TIẾT ĐIỀU TRỊ
GO
select * from KEHOACH_DIEUTRI
DECLARE @DS_CHITIET_DIEUTRI DS_CHITIET_DIEUTRI;
INSERT INTO @DS_CHITIET_DIEUTRI
VALUES (10001, 1, 3, 'L'),
		(10002, 2, 4, 'D'),
		(10003, 3, 4, 'F'),
		(10004, 4, 4, 'M'),
		(10002, 5, 3, 'R')
EXEC THEM_CHITIET_DIEUTRI @DS_CHITIET_DIEUTRI

--TẠO CHI TIẾT ĐƠN THUỐC
EXEC THEM_CHITIET_DONTHUOC 2, 2, 1, 1
EXEC THEM_CHITIET_DONTHUOC 3, 3, 2, 3
EXEC THEM_CHITIET_DONTHUOC 1, 4, 2, 2
EXEC THEM_CHITIET_DONTHUOC 4, 5, 3, 1
EXEC THEM_CHITIET_DONTHUOC 5, 2, 4, 2

-- QUẢN LÝ THUỐC
EXEC TAO_QUANLY_THUOC 1, 2, 100
EXEC TAO_QUANLY_THUOC 2, 1, 200
EXEC TAO_QUANLY_THUOC 3, 3, 200
EXEC TAO_QUANLY_THUOC 2, 4, 200
EXEC TAO_QUANLY_THUOC 1, 5, 200


-- THÔNG TIN THANH TOÁN
EXEC TAO_THONGTIN_THANHTOAN 0, 2000000, 2, '2023-12-30 15:30'
EXEC TAO_THONGTIN_THANHTOAN 0, 200000, 1, '2023-12-30 16:30'
EXEC TAO_THONGTIN_THANHTOAN 0, 100000, 3, '2023-12-30 11:30'
EXEC TAO_THONGTIN_THANHTOAN 0, 2500000, 7, '2023-12-31 10:00'
EXEC TAO_THONGTIN_THANHTOAN 0, 5000000, 6, '2023-12-30 14:30'

--TẠO THÔNG TIN THANH TOÁN ĐƠN THUỐC
EXEC TAO_THONGTIN_THANHTOAN_DONTHUOC 0, 1000000, 2
EXEC TAO_THONGTIN_THANHTOAN_DONTHUOC 100000, 100000, 1
EXEC TAO_THONGTIN_THANHTOAN_DONTHUOC 0, 50000, 3
EXEC TAO_THONGTIN_THANHTOAN_DONTHUOC 0, 60000, 4
EXEC TAO_THONGTIN_THANHTOAN_DONTHUOC 0, 30000, 5





