﻿USE QLPHONGKHAM_CSDLNC
GO

-- đăng ký cho bệnh nhân
CREATE OR ALTER PROCEDURE DANG_KY 
	@SODIENTHOAI CHAR(10),
	@MATKHAU CHAR(20),
	@TEN NVARCHAR(50),
	@GIOITINH NVARCHAR(3), -- ENUM(n'Nam', n'Nữ')
	@EMAIL char(30)
AS
BEGIN
	IF EXISTS(SELECT DIENTHOAI FROM TAIKHOAN WHERE DIENTHOAI = @SODIENTHOAI)
	BEGIN
		RAISERROR(N'ĐIỆN THOẠI ĐÃ ĐƯỢC SỬ DỤNG', 16, 1)
		RETURN 1
	END; 

	INSERT INTO TAIKHOAN(DIENTHOAI, MATKHAU)
	VALUES (@SODIENTHOAI, @MATKHAU)

	INSERT INTO BENHNHAN(TEN, GIOITINH, EMAIL, SODIENTHOAI)
	VALUES (@TEN, @GIOITINH, @EMAIL, @SODIENTHOAI)
	
	IF @@ERROR <> 0
	BEGIN
		RAISERROR(N'LỖI HỆ THỐNG KO THỂ TẠO TÀI KHOẢN', 16, 1)
		RETURN -1
	END; 
END;
GO

EXEC DANG_KY '1235', '123', 'LE THI A', 'Nam', 'a@gmail.com'
GO

-- đang nhập cho nhân viên
CREATE OR ALTER PROCEDURE DANG_NHAP_NHANVIEN
	@SODIENTHOAI NCHAR(10),
	@MATKHAU NCHAR(20),
	@NHANVIEN TABLE OUTPUT,
AS
BEGIN
	IF NOT EXISTS(
		SELECT 1 FROM NHANVIEN NV WHERE NV.SODIENTHOAI = @SODIENTHOAI
	)
	BEGIN
		RAISERROR(N'KHÔNG TỒN TẠI NHÂN VIÊN VỚI SỐ ĐIỆN THOẠI NÀY', 16, 1)
		RETURN 
	END;

	DECLARE @MATKHAUTAIKHOAN VARCHAR(20);
	SELECT @MATKHAUTAIKHOAN = TK.MATKHAU FROM TAIKHOAN TK WHERE TK.DIENTHOAI = @SODIENTHOAI

	IF @MATKHAUTAIKHOAN != @MATKHAU
	BEGIN
		RAISERROR(N'SAI MẬT KHẨU', 16, 1)
		RETURN
	END; 

	SELECT TEN, SODIENTHOAI, LOAINHANVIEN
	FROM NHANVIEN
END; 
GO

-- tạo nhân viên
CREATE OR ALTER PROCEDURE TAO_NHANVIEN
	@TEN NVARCHAR(50),
	@NGAYSINH DATE, 
	@DIACHI NVARCHAR(50),
	@EMAIL CHAR(30),
	@SODIENTHOAI CHAR(10),
	@LOAINHANVIEN NVARCHAR(13)
AS
BEGIN

	IF EXISTS(SELECT 1 FROM TAIKHOAN WHERE DIENTHOAI = @SODIENTHOAI)
	BEGIN
		RAISERROR(N'SỐ ĐIỆN THOẠI ĐÃ ĐƯỢC DÙNG', 16, 1)
		RETURN
	END;

	-- tạo tài khoản cho nhân viên
	INSERT INTO TAIKHOAN(DIENTHOAI, MATKHAU)
	VALUES (@SODIENTHOAI, @EMAIL)
	
	-- tạo nhân viên
	INSERT INTO NHANVIEN(TEN, NGAYSINH, DIACHI, EMAIL, SODIENTHOAI, LOAINHANVIEN)
	VALUES (@TEN, @NGAYSINH, @DIACHI, @EMAIL, @SODIENTHOAI, @LOAINHANVIEN)
	
	IF @@ERROR <> 0
	BEGIN
		RAISERROR(N'LỖI HỆ THỐNG KHÔNG THỂ THÊM NHÂN VIÊN', 16, 1)
		RETURN
	END; 
END;


-- Xem danh sách bệnh nhân
CREATE OR ALTER PROCEDURE XEM_DS_BENHNHAN
AS
BEGIN
	SELECT * FROM BENHNHAN
END;
GO

-- XEM DS NHÂN VIÊN
CREATE OR ALTER PROCEDURE XEM_DS_NHANVIEN
AS
BEGIN
	SELECT * FROM NHANVIEN
END;
GO

EXEC XEM_DS_BENHNHAN
GO

-- Thêm bệnh nhân
CREATE OR ALTER PROCEDURE THEM_BENHNHAN 
	@TEN NVARCHAR(50),
	@NGAYSINH DATE,
	@GIOITINH NVARCHAR(3),
	@DIACHI NVARCHAR(100),
	@EMAIL CHAR(30)
AS 
BEGIN
	INSERT INTO BENHNHAN(TEN, NGAYSINH, GIOITINH, DIACHI, EMAIL)
	VALUES 
		(@TEN, @NGAYSINH, @GIOITINH, @DIACHI, @EMAIL)

	IF @@ERROR <> 0
	BEGIN
		RAISERROR(N'LỖI HỆ THỐNG KO THỂ THÊM BỆNH NHÂN', 16, 1)
	END;
END;
GO

-- Cập nhật bệnh nhân
CREATE OR ALTER PROCEDURE CAPNHAT_BENHNHAN 
    @ID_BENHNHAN INT,
    @TEN NVARCHAR(50),
    @GIOITINH NVARCHAR(3),
    @EMAIL CHAR(20),
    @SODIENTHOAI CHAR(10),
    @NGAYSINH DATE,
    @DIACHI NVARCHAR(50),
    @TONGTIENTHANHTOAN BIGINT,
    @TONGTIENDIEUTRI BIGINT,
    @THONGTIN NVARCHAR(500),
    @TINHTRANG NVARCHAR(10),
    @CHONGCHIDINH NVARCHAR(150)
AS 
BEGIN
    UPDATE BENHNHAN 
    SET 
        TEN = @TEN,
        GIOITINH = @GIOITINH,
        EMAIL = @EMAIL,
        SODIENTHOAI = @SODIENTHOAI,
        NGAYSINH = @NGAYSINH,
        DIACHI = @DIACHI,
        TONGTIENTHANHTOAN = @TONGTIENTHANHTOAN,
        TONGTIENDIEUTRI = @TONGTIENDIEUTRI,
        THONGTIN = @THONGTIN,
        TINHTRANG = @TINHTRANG,
        CHONGCHIDINH = @CHONGCHIDINH
    WHERE 
        ID_BENHNHAN = @ID_BENHNHAN
END;
GO

-- CẬP NHẬT NHÂN VIÊN
CREATE OR ALTER PROCEDURE CAPNHAT_NHANVIEN
	@ID_NHANVIEN INT,
	@TEN NVARCHAR(50),
	@NGAYSINH DATE, 
	@DIACHI NVARCHAR(50)
AS
BEGIN
	UPDATE NHANVIEN
	SET TEN = @TEN,
		NGAYSINH = @NGAYSINH,
		DIACHI = @DIACHI
	WHERE ID_NHANVIEN = @ID_NHANVIEN
END
GO 

-- XOÁ NHÂN VIÊN
CREATE OR ALTER PROCEDURE XOA_NHANVIEN
	@ID_NHANVIEN INT
AS
BEGIN
	DELETE NHANVIEN WHERE ID_NHANVIEN = @ID_NHANVIEN
END;
GO 

-- TÌM BỆNH NHÂN BẰNG SỐ ĐIỆN THOẠI
CREATE OR ALTER PROCEDURE TIM_BENHNHAN_BANG_SDT
    @SODIENTHOAI VARCHAR(10)
AS
BEGIN
    SELECT *
    FROM BENHNHAN
    WHERE SODIENTHOAI LIKE CONCAT(@SODIENTHOAI, '%');
END;

EXEC TIM_BENHNHAN_BANG_SDT '0'