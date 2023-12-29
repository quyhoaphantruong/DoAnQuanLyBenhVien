﻿USE QLPHONGKHAM_CSDLNC; 
GO 

-- THÊM KẾ HOẠCH ĐIỀU TRỊ
CREATE OR ALTER PROCEDURE THEM_KEHOACH_DIEUTRI
    @NOIDUNG NVARCHAR(100),
    @CHANDOAN NVARCHAR(100),
    @ID_BENHNHAN INT,
    @OUTPUT_ID INT OUTPUT
AS
BEGIN
    IF NOT EXISTS(SELECT 1 FROM BENHNHAN WHERE ID_BENHNHAN = @ID_BENHNHAN)
    BEGIN
        RAISERROR(N'KO TỒN TẠI BỆNH NHÂN', 16, 1)
        RETURN
    END;

    INSERT INTO KEHOACH_DIEUTRI(ID_BENHNHAN, NOIDUNG, CHANDOAN)
    VALUES (@ID_BENHNHAN, @NOIDUNG, @CHANDOAN)

	-- TRẢ VỀ ID_KEHOACH_DIEUTRI VỪA INSERT
    SELECT @OUTPUT_ID = SCOPE_IDENTITY()
END;
GO

DECLARE @OUTPUT_ID INT
EXEC THEM_KEHOACH_DIEUTRI N'NHỔ RĂNG', N'SÂU RĂNG', 1, @OUTPUT_ID = @OUTPUT_ID OUTPUT
SELECT @OUTPUT_ID AS ID_KEHOACH_DIEUTRI_INSERTED
GO

-- CẬP NHẬT KẾ HOẠCH ĐIỀU TRỊ
CREATE OR ALTER PROCEDURE CAPNHAT_KEHOACH_DIEUTRI
	@ID_KEHOACH_DIEUTRI INT,
	@NOIDUNG NVARCHAR(100),
	@CHANDOAN NVARCHAR(100),
	@TINHTRANGDIEUTRI TINYINT
AS
BEGIN
	IF NOT EXISTS(SELECT 1 FROM KEHOACH_DIEUTRI WHERE ID_KEHOACH_DIEUTRI = @ID_KEHOACH_DIEUTRI)
	BEGIN
		RAISERROR(N'KO TỒN TẠI KẾ HOẠCH NÀY', 16, 1)
		RETURN;
	END; 
	UPDATE KEHOACH_DIEUTRI
	SET NOIDUNG = @NOIDUNG,
		CHANDOAN = @CHANDOAN,
		TINHTRANGDIEUTRI = @TINHTRANGDIEUTRI
	WHERE ID_KEHOACH_DIEUTRI = @ID_KEHOACH_DIEUTRI

	IF @@ERROR <> 0
	BEGIN
		RAISERROR(N'LỖI HỆ THỐNG', 16, 1)
		RETURN
	END;
END; 
go

EXEC CAPNHAT_KEHOACH_DIEUTRI 1, N'UPDATE', N'UPDATE', 1
GO

-- THÊM CHI TIẾT ĐIỀU TRỊ 
	CREATE TYPE DS_CHITIET_DIEUTRI AS TABLE (
			ID_KEHOACH_DIEUTRI INT,
			ID_DIEUTRI INT,
			ID_RANG TINYINT,
			LOAIMAT CHAR(1)
	);
	GO

CREATE OR ALTER FUNCTION CHECK_TONTAI_THONGTIN_THANHTOAN (@ID_KEHOACH_DIEUTRI INT, @NGAYTAO DATE)
RETURNS BIT
AS
BEGIN
	IF EXISTS(SELECT 1 FROM THONGTIN_THANHTOAN WHERE ID_KEHOACH_DIEUTRI = @ID_KEHOACH_DIEUTRI
	AND NGAYTAO_CAC_CHITIET_DIEUTRI = @NGAYTAO)
	BEGIN
		RETURN 1
	END;
	RETURN 0
END
GO
-- CHECK ĐÃ CÓ CHI TIẾT ĐIỀU TRI CỦA KẾ HOẠCH ĐIỀU TRỊ
CREATE OR ALTER FUNCTION CHECK_TONTAI_CHITIET_DIEUTRI (@ID_KEHOACH_DIEUTRI INT, 
	@ID_DIEUTRI INT, @ID_RANG INT, @LOAIMAT CHAR(1))
RETURNS BIT
AS
BEGIN
	IF EXISTS(SELECT 1 FROM CHITIET_DIEUTRI WHERE 
		ID_KEHOACH_DIEUTRI = @ID_KEHOACH_DIEUTRI
	AND ID_DIEUTRI = @ID_DIEUTRI AND ID_RANG = @ID_RANG AND LOAIMAT = @LOAIMAT)
	BEGIN
		RETURN 1
	END;
	RETURN 0
END
GO

CREATE OR ALTER PROCEDURE THEM_CHITIET_DIEUTRI
	@DS_CHITIET_DIEUTRI DS_CHITIET_DIEUTRI READONLY
AS
BEGIN
BEGIN TRY

	DECLARE @NGAYHOMNAY DATE = GETDATE();
	DECLARE @ID_KEHOACH_DIEUTRI INT = (SELECT TOP 1 ID_KEHOACH_DIEUTRI FROM KEHOACH_DIEUTRI)
	DECLARE @TONG_TIEN_DIEUTRI INT = (SELECT SUM(DT.PHI) FROM @DS_CHITIET_DIEUTRI DS
										JOIN DIEUTRI DT ON DT.ID_DIEUTRI = DS.ID_DIEUTRI)
	BEGIN TRANSACTION;
	INSERT INTO CHITIET_DIEUTRI(ID_KEHOACH_DIEUTRI, ID_DIEUTRI,ID_RANG, LOAIMAT)
	SELECT ID_KEHOACH_DIEUTRI, ID_DIEUTRI, ID_RANG, LOAIMAT 
	FROM @DS_CHITIET_DIEUTRI
		
	-- CẬP NHẬT TỔNG CHI PHÍ CỦA KẾ HOẠCH ĐIỀU TRỊ
	UPDATE KEHOACH_DIEUTRI
	SET TONG_CHIPHI = TONG_CHIPHI + @TONG_TIEN_DIEUTRI
	WHERE ID_KEHOACH_DIEUTRI = @ID_KEHOACH_DIEUTRI

	-- CẬP NHẬT TỔNG CHI PHÍ CỦA THÔNG TIN THANH TOÁN
	UPDATE THONGTIN_THANHTOAN
	SET TONGTIENTHANHTOAN = TONGTIENTHANHTOAN + @TONG_TIEN_DIEUTRI
	WHERE ID_KEHOACH_DIEUTRI = @ID_KEHOACH_DIEUTRI
	AND NGAYTAO_CAC_CHITIET_DIEUTRI = @NGAYHOMNAY
	COMMIT TRANSACTION
END TRY
BEGIN CATCH 
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION;
	THROW
END CATCH
END; 
GO
-- TEST
select * from KEHOACH_DIEUTRI
DECLARE @DS_CHITIET_DIEUTRI DS_CHITIET_DIEUTRI;
INSERT INTO @DS_CHITIET_DIEUTRI
VALUES (10001, 1, 3, 'L'),
		(10001, 1, 4, 'L')
EXEC THEM_CHITIET_DIEUTRI @DS_CHITIET_DIEUTRI
select * from CHITIET_DIEUTRI
SELECT * FROM THONGTIN_THANHTOAN
GO
-- XEM DS KẾ HOẠCH ĐIỀU TRỊ CỦA BỆNH NHÂN
CREATE OR ALTER PROCEDURE XEM_DS_KEHOACH_DIEUTRI
	@ID_BENHNHAN INT
AS
BEGIN
	SELECT ID_KEHOACH_DIEUTRI, 
	CHANDOAN, NOIDUNG, TINHTRANGDIEUTRI, NGAYTAO, TONG_CHIPHI
	FROM KEHOACH_DIEUTRI
	WHERE ID_BENHNHAN = @ID_BENHNHAN
END
-- test 
EXEC XEM_DS_KEHOACH_DIEUTRI 2

-- XEM KẾ HOẠCH ĐIỀU TRỊ CỤ THỂ
CREATE OR ALTER PROCEDURE XEM_KEHOACH_DIEUTRI_CUTHE
	@ID_KEHOACH_DIEUTRI INT
AS
BEGIN
	SELECT R.TEN_RANG, M.TENMAT, DT.TENDIEUTRI, DT.PHI,
	CTDT.NGAYTAO
	FROM CHITIET_DIEUTRI CTDT
	JOIN RANG R ON R.ID_RANG = CTDT.ID_RANG
	JOIN MAT M ON M.LOAIMAT = CTDT.LOAIMAT
	JOIN DIEUTRI DT ON DT.ID_DIEUTRI = CTDT.ID_DIEUTRI
	WHERE ID_KEHOACH_DIEUTRI = @ID_KEHOACH_DIEUTRI
END; 
GO

EXEC XEM_KEHOACH_DIEUTRI_CUTHE 10021
select * from KEHOACH_DIEUTRI
select * from CHITIET_DIEUTRI
