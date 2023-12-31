﻿USE QLPHONGKHAM_CSDLNC;
GO

-- XEM DANH MỤC ĐIỀU TRỊ
CREATE OR ALTER PROCEDURE XEM_DANHMUC_DIEUTRI
AS
BEGIN
	SELECT * FROM DANHMUC_DIEUTRI
END
GO
EXEC XEM_DANHMUC_DIEUTRI
 go
-- TẠO DANH MỤC ĐIỀU TRỊ
CREATE OR ALTER PROCEDURE TAO_DANHMUC_DIEUTRI
	@TENDANHMUC NVARCHAR(30)
AS
BEGIN
	INSERT INTO DANHMUC_DIEUTRI(TENDANHMUC)
	VALUES (@TENDANHMUC)
END
GO

-- XOÁ DANH MỤC ĐIỀU TRỊ
CREATE OR ALTER PROCEDURE XOA_DANHMUC_DIEUTRI
	@ID_DANHMUC_DIEUTRI INT
AS
BEGIN
	DELETE DANHMUC_DIEUTRI
	WHERE ID_DANHMUC_DIEUTRI = @ID_DANHMUC_DIEUTRI
END
GO

-- XEM ĐIỀU TRỊ CỦA DANH MỤC 
CREATE OR ALTER PROCEDURE XEM_DIEUTRI
	@ID_DANHMUC_DIEUTRI TINYINT
AS
BEGIN
	SELECT * FROM DIEUTRI
	WHERE ID_DANHMUC_DIEUTRI = @ID_DANHMUC_DIEUTRI
END
GO
--EXEC XEM_DIEUTRI
-- THÊM ĐIỀU TRỊ 
CREATE OR ALTER PROCEDURE THEM_DIEUTRI
	@ID_DANHMUC_DIEUTRI INT,
	@TENDIEUTRI NVARCHAR(30),
	@PHI INT
AS
BEGIN
	IF NOT EXISTS(SELECT 1 FROM DANHMUC_DIEUTRI WHERE ID_DANHMUC_DIEUTRI = @ID_DANHMUC_DIEUTRI)
	BEGIN
		RAISERROR(N'DANH MỤC ĐIỀU TRỊ KO TỒN TẠI', 16, 1)
		RETURN
	END;

	INSERT INTO DIEUTRI(ID_DANHMUC_DIEUTRI, TENDIEUTRI, PHI)
	VALUES (@ID_DANHMUC_DIEUTRI, @TENDIEUTRI, @PHI)
END
GO

-- XOÁ ĐIỀU TRỊ
CREATE OR ALTER PROCEDURE THEM_DIEUTRI
	@ID_DIEUTRI INT
AS
BEGIN
	IF NOT EXISTS(SELECT 1 FROM DIEUTRI WHERE ID_DIEUTRI = @ID_DIEUTRI)
	BEGIN
		RAISERROR(N'ĐIỀU TRỊ KO TỒN TẠI', 16, 1)
		RETURN
	END;

	DELETE DIEUTRI
	WHERE ID_DIEUTRI = @ID_DIEUTRI
END
GO