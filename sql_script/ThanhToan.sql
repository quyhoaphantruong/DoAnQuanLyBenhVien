﻿USE QLPHONGKHAM_CSDLNC; 
GO

-- XEM DANH SÁCH CÁC THANH TOÁN	
CREATE OR ALTER PROCEDURE XEM_DS_THANHTOAN
	@ID_BENHNHAN INT
AS
BEGIN
	SELECT TT.ID_THONGTIN_THANHTOAN, 
	TT.TIENDATRA, TT.TIENTHOI, TT.LOAITHANHTOAN,
	TT.GHICHU, TT.TONGTIENTHANHTOAN,
	KHDT.CHANDOAN, KHDT.NOIDUNG,
	KHDT.TINHTRANGDIEUTRI, KHDT.TONG_CHIPHI
	FROM THONGTIN_THANHTOAN TT
	JOIN KEHOACH_DIEUTRI KHDT ON KHDT.ID_KEHOACH_DIEUTRI = TT.ID_KEHOACH_DIEUTRI
	WHERE KHDT.ID_BENHNHAN = @ID_BENHNHAN
END
GO

EXEC XEM_DS_THANHTOAN 1
GO
-- THANH TOÁN KẾ HOẠCH ĐIỀU TRỊ
CREATE OR ALTER PROCEDURE THANHTOAN_KEHOACH_DIEUTRI
	@ID_BENHNHAN INT,
	@ID_THONGTIN_THANHTOAN INT,
	@TIENDATRA BIGINT,
	@TIENTHOI BIGINT,
	@LOAITHANHTOAN NVARCHAR(8),--(N'Tiền mặt',N'Online'),
	@GHICHU NVARCHAR(50),
	@TONGTIENTHANHTOAN BIGINT,
	@ID_KEHOACH_DIEUTRI INT
AS
BEGIN
	IF NOT EXISTS(SELECT 1 FROM KEHOACH_DIEUTRI WHERE ID_BENHNHAN = @ID_BENHNHAN)
	BEGIN
		RAISERROR(N'BỆNH NHÂN CHƯA CÓ KẾ HOẠCH ĐIỀU TRỊ ĐỂ TRẢ', 16, 1)
		RETURN
	END; 
	IF NOT EXISTS(SELECT 1 FROM THONGTIN_THANHTOAN WHERE ID_THONGTIN_THANHTOAN = @ID_THONGTIN_THANHTOAN)
	BEGIN
		RAISERROR(N'KHÔNG TỒN TẠI THANH TOÁN NÀY', 16, 1)
		RETURN
	END; 
	UPDATE THONGTIN_THANHTOAN
	SET
		TIENDATRA = @TIENDATRA,
		TIENTHOI = @TIENTHOI,
		LOAITHANHTOAN = @LOAITHANHTOAN,
		GHICHU = @GHICHU,
		TONGTIENTHANHTOAN = @TONGTIENTHANHTOAN
	WHERE ID_THONGTIN_THANHTOAN = @ID_THONGTIN_THANHTOAN;

	
	-- CẬP NHẬT TỔNG TIỀN THANH TOÁN VÀ TỔNG TIỀN CHƯA THANH TOÁN CỦA BỆNH NHÂN
	UPDATE BENHNHAN
	SET TONGTIENTHANHTOAN = TONGTIENTHANHTOAN + @TONGTIENTHANHTOAN,
	TONGTIENCHUATHANHTOAN = TONGTIENCHUATHANHTOAN - @TONGTIENTHANHTOAN
	WHERE ID_BENHNHAN = @ID_BENHNHAN
END; 

EXEC TAO_THONGTIN_THANHTOAN 1, 20000, 0, N'ONLINE', '', 20000, 4
GO

-- XEM CÁC THANH TOÁN CHƯA TRẢ
CREATE OR ALTER PROCEDURE XEM_THANHTOAN_CHUATRA
    @ID_BENHNHAN INT
AS
BEGIN
	-- THANH TOÁN CHƯA TRẢ CỦA KẾ HOẠCH ĐIỀU TRỊ
    SELECT TT.ID_THONGTIN_THANHTOAN, TT.TIENDATRA, TT.TONGTIENTHANHTOAN,
		KHDT.ID_KEHOACH_DIEUTRI, KHDT.CHANDOAN, KHDT.NOIDUNG, KHDT.NGAYTAO
    FROM THONGTIN_THANHTOAN TT
	JOIN KEHOACH_DIEUTRI KHDT ON KHDT.ID_KEHOACH_DIEUTRI = TT.ID_KEHOACH_DIEUTRI
	WHERE TT.ID_BENHNHAN = @ID_BENHNHAN AND TT.TIENDATRA = 0
	

	-- THANH TOÁN CHƯA TRẢ CỦA ĐƠN THUỐC
	SELECT DT.ID_DONTHUOC, DT.NGAYTAO,
		NV.TEN, TT.TIENDATRA, TT.TONGTIENTHANHTOAN
    FROM DONTHUOC DT
    JOIN NHANVIEN NV ON NV.ID_NHANVIEN = DT.ID_BENHNHAN
	JOIN THONGTIN_THANHTOAN_DONTHUOC TT ON DT.ID_DONTHUOC = TT.ID_DONTHUOC
    WHERE DT.ID_BENHNHAN = @ID_BENHNHAN AND TT.TIENDATRA = 0
END;
GO

EXEC XEM_THANHTOAN_CHUATRA 1

EXEC XEM_THANHTOAN_CHUATRA 3

-- XEM DANH SÁCH THANH TOÁN ĐƠN THUỐC => TRANG XEM THÔNG TIN THANH TOÁN ĐƠN THUỐC
CREATE OR ALTER PROCEDURE XEM_DS_THANHTOAN_DONTHUOC
	@ID_BENHNHAN INT
AS
BEGIN
	SELECT TT.ID_THONGTIN_THANHTOAN_DONTHUOC, 
	TT.TIENDATRA, TT.TIENTHOI, TT.LOAITHANHTOAN,
	TT.GHICHU, TT.TONGTIENTHANHTOAN,
	DT.ID_DONTHUOC, CTDT.*
	FROM THONGTIN_THANHTOAN_DONTHUOC TT
	JOIN DONTHUOC DT ON DT.ID_DONTHUOC= TT.ID_DONTHUOC
	JOIN CHITIET_DONTHUOC CTDT ON CTDT.ID_DONTHUOC = DT.ID_DONTHUOC
	WHERE TT.ID_BENHNHAN = @ID_BENHNHAN
END
GO

-- THANH TOÁN ĐƠN THUỐC
CREATE OR ALTER PROCEDURE THANHTOAN_DONTHUOC
	@ID_THONGTIN_THANHTOAN_DONTHUOC INT,
	@ID_BENHNHAN INT,
	@TIENDATRA BIGINT,
	@TIENTHOI BIGINT,
	@LOAITHANHTOAN NVARCHAR(8),--(N'Tiền mặt',N'Online'),
	@GHICHU NVARCHAR(50),
	@TONGTIENTHANHTOAN BIGINT,
	@ID_DONTHUOC INT
AS
BEGIN
	IF EXISTS(SELECT 1 FROM THONGTIN_THANHTOAN_DONTHUOC WHERE ID_DONTHUOC = @ID_DONTHUOC
	AND TIENDATRA > 0)
	BEGIN
		RAISERROR(N'ĐƠN THUỐC ĐÃ ĐƯỢC THANH TOÁN', 16, 1)
		RETURN
	END; 

	UPDATE THONGTIN_THANHTOAN_DONTHUOC
	SET
		TIENDATRA = @TIENDATRA,
		TIENTHOI = @TIENTHOI,
		LOAITHANHTOAN = @LOAITHANHTOAN,
		GHICHU = @GHICHU	
	WHERE
		ID_THONGTIN_THANHTOAN_DONTHUOC = @ID_THONGTIN_THANHTOAN_DONTHUOC; 

	-- CẬP NHẬT TỔNG TIỀN THANH TOÁN VÀ TỔNG TIỀN CHƯA THANH TOÁN CỦA BỆNH NHÂN
	UPDATE BENHNHAN
	SET TONGTIENTHANHTOAN = TONGTIENTHANHTOAN + @TONGTIENTHANHTOAN,
	TONGTIENCHUATHANHTOAN = TONGTIENCHUATHANHTOAN - @TONGTIENTHANHTOAN
	WHERE ID_BENHNHAN = @ID_BENHNHAN
END; 
GO 

-- SAU KHI TẠO KẾ HOẠCH ĐIỀU TRỊ HAY ĐƠN THUỐC, TẠO THÔNG TIN THANH TOÁN
CREATE OR ALTER PROCEDURE TAO_THONGTIN_THANHTOAN_DONTHUOC
	@TIENDATRA INT, 
	@TONGTIENTHANHTOAN BIGINT,
	@ID_DONTHUOC INT
AS
BEGIN
	INSERT INTO THONGTIN_THANHTOAN_DONTHUOC(TIENDATRA, TONGTIENTHANHTOAN, ID_DONTHUOC)
	VALUES (@TIENDATRA, @TONGTIENTHANHTOAN, @ID_DONTHUOC)
END
GO 

-- THÔNG TIN THANH TOÁN KẾ HOẠCH ĐIỀU TRỊ CHO NHIỀU NGÀY
CREATE OR ALTER PROCEDURE TAO_THONGTIN_THANHTOAN
	@TIENDATRA INT, 
	@TONGTIENTHANHTOAN BIGINT,
	@ID_KEHOACH_DIEUTRI INT, 
	@NGAYTAO_CAC_CHITIET_DIEUTRI DATE
AS
BEGIN
	IF EXISTS(SELECT 1 FROM THONGTIN_THANHTOAN WHERE NGAYTAO_CAC_CHITIET_DIEUTRI = @NGAYTAO_CAC_CHITIET_DIEUTRI)
	BEGIN
		RAISERROR(N'ĐÃ CÓ THÔNG TIN THANH TOÁN CHO NGÀY ĐIỀU TRỊ NÀY', 16, 1)
		RETURN
	END

	INSERT INTO THONGTIN_THANHTOAN(TIENDATRA, TONGTIENTHANHTOAN, ID_KEHOACH_DIEUTRI)
	VALUES (@TIENDATRA, @TONGTIENTHANHTOAN, @ID_KEHOACH_DIEUTRI)
END
