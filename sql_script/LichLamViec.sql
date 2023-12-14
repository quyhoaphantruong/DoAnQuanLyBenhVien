﻿USE QLPHONGKHAM_CSDLNC;
GO

-- TẠO LỊCH LÀM VIỆC
CREATE OR ALTER PROCEDURE TAO_LICH_LAM_VIEC
	@ID_NHANVIEN INT,
	@ID_PHONGKHAM INT,
	@GIO_BATDAU DATETIME,
	@GIO_KETTHUC DATETIME
AS
BEGIN
	IF NOT EXISTS(SELECT 1 FROM NHANVIEN WHERE ID_NHANVIEN = @ID_NHANVIEN)
	BEGIN
		RAISERROR(N'KO TỒN TẠI NHÂN VIÊN NÀY', 16, 1)
		RETURN
	END;
	
	IF @GIO_BATDAU > @GIO_KETTHUC
	BEGIN
		RAISERROR(N'GIỜ BẮT ĐẦU < GIỜ KẾT THÚC', 16, 1)
		RETURN
	END;

	INSERT INTO LICHLAMVIEC(ID_NHANVIEN, GIOBATDAU, GIOKETTHUC, ID_PHONGKHAM)
	VALUES(@ID_NHANVIEN, @GIO_BATDAU, @GIO_KETTHUC, @ID_PHONGKHAM)
END;
GO
SELECT * FROM LICHLAMVIEC

EXEC TAO_LICH_LAM_VIEC 1, 1, '2023-01-28 5:30', '2023-01-28 11:00'
EXEC TAO_LICH_LAM_VIEC 1, 1, '2023-01-29 5:30', '2023-01-28 11:00'


INSERT INTO PHONGKHAM(ID_PHONGKHAM, DIACHIPK, SDTPK)
VALUES ('PK001', 'Q8', '123123')

SELECT * 
FROM LICHLAMVIEC LLV 
JOIN NHANVIEN NV ON NV.ID_NHANVIEN = LLV.ID_NHANVIEN

GO
-- tìm kiếm những nha sĩ rảnh vào giờ hẹn và chưa có cuộc hẹn nào vào giờ đó
CREATE OR ALTER PROCEDURE TIM_NHASI_RANH
    @GIO_BATDAU DATETIME,
	@ID_BENHNHAN INT
AS
BEGIN
    DECLARE @DS_NHASI TABLE (
        ID_NHANVIEN INT
    );

	DECLARE @GIO_KETTHUC DATETIME;
	SELECT @GIO_KETTHUC = DATEADD(HOUR, 1, @GIO_BATDAU)

    INSERT INTO @DS_NHASI (ID_NHANVIEN)
    SELECT NV.ID_NHANVIEN
    FROM NHANVIEN NV
    JOIN LICHLAMVIEC LLV ON LLV.ID_NHANVIEN = NV.ID_NHANVIEN
	WHERE NV.LOAINHANVIEN = N'Nha sĩ'
	AND LLV.GIOBATDAU <= @GIO_BATDAU AND LLV.GIOKETTHUC >= @GIO_BATDAU
	AND NV.ID_NHANVIEN NOT IN (
        SELECT CH.ID_NHASI
        FROM CUOCHEN CH
        WHERE CH.THOIGIAN >= @GIO_BATDAU AND DATEADD(HOUR, 1, CH.THOIGIAN) <= @GIO_KETTHUC
    );

    SELECT DS.ID_NHANVIEN, 1 AS DA_KHAM
    FROM @DS_NHASI DS WHERE DS.ID_NHANVIEN IN 
	(SELECT CH.ID_NHASI FROM CUOCHEN CH WHERE CH.ID_BENHNHAN = @ID_BENHNHAN)
	UNION
	SELECT DS.ID_NHANVIEN, 0 AS DA_KHAM
	FROM @DS_NHASI DS WHERE DS.ID_NHANVIEN NOT IN
	(SELECT CH.ID_NHASI FROM CUOCHEN CH WHERE CH.ID_BENHNHAN = @ID_BENHNHAN)
END;
GO

EXEC TIM_NHASI_RANH '2023-12-14 08:30', 2
GO

-- XEM LỊCH LÀM VIỆC CỦA MỖI NV
