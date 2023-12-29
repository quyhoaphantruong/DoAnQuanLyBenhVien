﻿USE QLPHONGKHAM_CSDLNC
GO

-- XEM DANH SÁCH THUỐC
CREATE OR ALTER PROCEDURE XEM_DS_THUOC
AS
BEGIN
	SELECT * 
	FROM THUOC
END; 
GO

EXEC XEM_DS_THUOC

-- THÊM THUỐC
CREATE OR ALTER PROCEDURE THEM_THUOC
	@TEN_THUOC NVARCHAR(20),
	@PHI INT
AS
BEGIN
	INSERT INTO THUOC(TEN_THUOC, PHI)
	VALUES (@TEN_THUOC, @PHI)
END;
GO

EXEC THEM_THUOC N'MA TUÝ', 30000, 'MG'

-- XOÁ THUỐC
CREATE OR ALTER PROCEDURE XOA_THUOC
	@ID_THUOC INT
AS
BEGIN
	DELETE THUOC WHERE ID_THUOC = @ID_THUOC
END;
GO

EXEC XOA_THUOC 1
GO

-- CẬP NHẬT THUỐC
CREATE OR ALTER PROCEDURE CAPNHAT_THUOC
	@ID_THUOC INT,
	@TEN_THUOC NVARCHAR(20),
	@PHI INT
AS 
BEGIN
	IF NOT EXISTS(SELECT 1 FROM THUOC WHERE ID_THUOC = @ID_THUOC)
	BEGIN
		RAISERROR(N'KO TỒN TẠI THUỐC NÀY', 16, 1)
		RETURN
	END;
	
	UPDATE THUOC
	SET TEN_THUOC = @TEN_THUOC,
		PHI = @PHI	
	WHERE ID_THUOC = @ID_THUOC
END
GO
EXEC CAPNHAT_THUOC 3, N'VITAMIN C', 35000, 'MG'
GO

-- THÊM ĐƠN THUỐC
CREATE OR ALTER PROCEDURE THEM_DONTHUOC
	@ID_BENHNHAN INT,
	@BACSIDIEUTRI INT,
	@ID_PHONGKHAM INT,
	@GHICHU NVARCHAR(50)
AS
BEGIN
BEGIN TRY
	-- KIEM TRA CO PHAI nha si KO
	IF NOT EXISTS(SELECT 1 FROM NHANVIEN WHERE ID_NHANVIEN = @BACSIDIEUTRI AND LOAINHANVIEN = N'Nha sĩ')
	BEGIN
		RAISERROR(N'KHÔNG PHẢI BÁC SĨ', 16, 1)
		RETURN
	END

	DECLARE @ID_DONTHUOC INT; -- Declare variable to store the ID_DONTHUOC

	BEGIN TRANSACTION;

	INSERT INTO DONTHUOC(ID_BENHNHAN, GHICHU, BACSIDIEUTRI)
	VALUES (@ID_BENHNHAN, @GHICHU, @BACSIDIEUTRI);

	SET @ID_DONTHUOC = SCOPE_IDENTITY();
	INSERT INTO THONGTIN_THANHTOAN_DONTHUOC(ID_DONTHUOC, TONGTIENTHANHTOAN) 
	VALUES (@ID_DONTHUOC, 0)

	COMMIT TRANSACTION;
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION;
	THROW;
END CATCH
END;
GO
-- THÊM CHI TIẾT ĐƠN THUỐC 
CREATE OR ALTER PROCEDURE THEM_CHITIET_DONTHUOC
	@ID_DONTHUOC INT,
	@ID_THUOC INT, 
	@SOLUONG INT, 
	@ID_PHONGKHAM INT
AS
BEGIN
BEGIN TRY
	BEGIN TRANSACTION;

	IF NOT EXISTS(SELECT 1 FROM QUANLY_THUOC WHERE ID_PHONGKHAM = @ID_PHONGKHAM 
			AND SOLUONGTON >= @SOLUONG)
	BEGIN
		THROW 50000, N'PHÒNG KHÁM KO ĐỦ SỐ LƯỢNG THUỐC', 1;
	END

	DECLARE @PHI_THUOC INT = (SELECT PHI FROM THUOC WHERE ID_THUOC = @ID_THUOC);

	INSERT INTO CHITIET_DONTHUOC(ID_DONTHUOC, ID_THUOC, SOLUONG)
	VALUES (@ID_DONTHUOC, @ID_THUOC, @SOLUONG)

	UPDATE DONTHUOC
	SET TONG_CHIPHI = TONG_CHIPHI + @SOLUONG * @PHI_THUOC
	WHERE ID_DONTHUOC = @ID_DONTHUOC

	UPDATE QUANLY_THUOC
	SET SOLUONGTON = SOLUONGTON - @SOLUONG
	WHERE ID_PHONGKHAM = @ID_PHONGKHAM AND ID_THUOC = @ID_THUOC
	
	UPDATE BENHNHAN
	SET TONGTIENCHUATHANHTOAN = TONGTIENCHUATHANHTOAN + @SOLUONG * @PHI_THUOC
	WHERE ID_BENHNHAN = (SELECT ID_BENHNHAN FROM DONTHUOC WHERE ID_DONTHUOC = @ID_DONTHUOC)

	UPDATE THONGTIN_THANHTOAN_DONTHUOC
	SET TONGTIENTHANHTOAN = TONGTIENTHANHTOAN + @SOLUONG * @PHI_THUOC
	WHERE ID_DONTHUOC = @ID_DONTHUOC;

	COMMIT TRANSACTION;
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION;
	THROW; -- Rethrow the error for further handling
END CATCH
END;
GO

SELECT * FROM DONTHUOC DT
JOIN THONGTIN_THANHTOAN_DONTHUOC TT ON TT.ID_DONTHUOC = DT.ID_DONTHUOC
EXEC THEM_CHITIET_DONTHUOC 2, 2, 1, 1

-- XOÁ CHI TIẾT ĐƠN THUỐC
CREATE OR ALTER XOA_CHITIET_DONTHUOC
	@ID_DONTHUOC INT, 
	@ID_THUOC INT
AS
BEGIN
	DECLARE @SOLUONG INT;
	SELECT @SOLUONG = (SELECT SOLUONG FROM CHITIET_DONTHUOC WHERE ID_DONTHUOC = @ID_DONTHUOC AND ID_THUOC = @ID_THUOC)
	-- XOÁ CHI TIẾT ĐƠN THUỐC
	DELETE CHITIET_DONTHUOC WHERE ID_DONTHUOC = @ID_DONTHUOC AND ID_THUOC = @ID_THUOC
	-- TRỪ TỔNG CHI PHÍ CỦA ĐƠN THUỐC
	UPDATE DONTHUOC
	SET TONG_CHIPHI = TONG_CHIPHI - @SOLUONG * (SELECT PHI FROM THUOC WHERE ID_THUOC = @ID_THUOC)
	WHERE ID_DONTHUOC = @ID_DONTHUOC
END
GO