﻿USE QLPHONGKHAM_CSDLNC; 
GO 

CREATE OR ALTER PROCEDURE XEM_INDEX_BANG (@NAME VARCHAR(50))
AS
BEGIN
    SELECT 
        TableName = t.name,
        IndexName = ind.name,
        IndexType = ind.type_desc,
        ic.index_column_id,
        ColumnName = col.name
    FROM 
        sys.indexes ind
    INNER JOIN 
        sys.index_columns ic ON ind.object_id = ic.object_id AND ind.index_id = ic.index_id
    INNER JOIN 
        sys.columns col ON ic.object_id = col.object_id AND ic.column_id = col.column_id
    INNER JOIN 
        sys.tables t ON ind.object_id = t.object_id
    WHERE 
        t.name = @NAME
        AND ind.is_primary_key = 0 -- Exclude primary keys
        AND ind.is_unique_constraint = 0 -- Exclude unique constraints
    ORDER BY 
        t.name, ind.name, ic.index_column_id;
END;

-- INSERT 100,000 KEHOACHDIEUTRI ĐỂ TEST ĐỘ HIỆU QUẢ CỦA INDEX
GO

EXEC DBO.XEM_INDEX_BANG 'KEHOACH_DIEUTRI'
EXEC DBO.XEM_INDEX_BANG 'THONGTIN_THANHTOAN'
EXEC DBO.XEM_INDEX_BANG 'DONTHUOC'
EXEC DBO.XEM_INDEX_BANG 'THONGTIN_THANHTOAN_DONTHUOC'

-- TẠO INDEX  TRÊN TRUY VẤN XEM THANH TOÁN DIỀU TRỊ CHƯA TRẢ
-- 10,000 KEHOACH_DIEUTRI, 100,000 THONGTIN_THANHTOAN
CREATE NONCLUSTERED INDEX IX_THONGTIN_THANHTOAN_ID_KEHOACH_DIEUTRI ON THONGTIN_THANHTOAN(ID_KEHOACH_DIEUTRI)
INCLUDE (TONGTIENTHANHTOAN)
CREATE NONCLUSTERED INDEX IX_KHDT_ID_BENHNHAN ON KEHOACH_DIEUTRI(ID_BENHNHAN)

-- DROP INDEX CỦA TRUY VẤN XEM THANH TOÁN ĐIỀU TRỊ
DROP INDEX IX_KHDT_ID_BENHNHAN ON KEHOACH_DIEUTRI
DROP INDEX IX_THONGTIN_THANHTOAN_ID_KEHOACH_DIEUTRI ON THONGTIN_THANHTOAN

-- TẠO INDEX TRÊN TRUY VẤN XEM THANH TOÁN ĐƠN THUỐC CHƯA TRẢ
CREATE NONCLUSTERED INDEX IX_THANHTOAN_DONTHUOC_ID_DONTHUOC ON THONGTIN_THANHTOAN_DONTHUOC(ID_DONTHUOC) 
INCLUDE(TONGTIENTHANHTOAN)
--CREATE NONCLUSTERED INDEX IX_DONTHUOC_ID_BENHNHAN ON DONTHUOC(ID_BENHNHAN)

-- DROP INDEX CỦA TRUY VẤN XEM THANH TOÁN ĐƠN THUỐC CHƯA TRẢ
DROP INDEX IX_THANHTOAN_DONTHUOC_ID_DONTHUOC ON THONGTIN_THANHTOAN_DONTHUOC
DROP INDEX IX_DONTHUOC_ID_BENHNHAN ON DONTHUOC
GO

-- TEST ĐỘ HIỆU QUẢ CỦA INDEX
CREATE OR ALTER PROCEDURE XEM_THANHTOAN_CHUATRA_TOIUU
    @ID_BENHNHAN INT
AS
    -- THANH TOÁN CHƯA TRẢ CỦA KẾ HOẠCH ĐIỀU TRỊ
    SELECT TT.ID_THONGTIN_THANHTOAN, TT.TONGTIENTHANHTOAN,
		KHDT.ID_KEHOACH_DIEUTRI, KHDT.CHANDOAN, KHDT.NOIDUNG, KHDT.NGAYTAO
	FROM KEHOACH_DIEUTRI KHDT 
    JOIN THONGTIN_THANHTOAN TT ON KHDT.ID_KEHOACH_DIEUTRI = TT.ID_KEHOACH_DIEUTRI
	WHERE KHDT.ID_BENHNHAN = @ID_BENHNHAN AND TT.TIENDATRA = 0
	
	-- THANH TOÁN CHƯA TRẢ CỦA ĐƠN THUỐC
	SELECT DT.ID_DONTHUOC, DT.NGAYTAO,
		NV.TEN, 
		TT.TONGTIENTHANHTOAN
    FROM DONTHUOC DT
	JOIN THONGTIN_THANHTOAN_DONTHUOC TT ON DT.ID_DONTHUOC = TT.ID_DONTHUOC
	JOIN NHANVIEN NV ON NV.ID_NHANVIEN = DT.BACSIDIEUTRI
    WHERE DT.ID_BENHNHAN = @ID_BENHNHAN AND TT.TIENDATRA = 0
END
GO

SET STATISTICS TIME ON; 
exec XEM_THANHTOAN_CHUATRA_TOIUU 348
SET STATISTICS TIME OFF;

--SELECT  DT.ID_BENHNHAN, COUNT(*)
--     FROM DONTHUOC DT
--	JOIN THONGTIN_THANHTOAN_DONTHUOC TT ON DT.ID_DONTHUOC = TT.ID_DONTHUOC
--	JOIN NHANVIEN NV ON NV.ID_NHANVIEN = DT.BACSIDIEUTRI
--    WHERE TT.TIENDATRA = 0
--GROUP BY DT.ID_BENHNHAN
--ORDER BY COUNT(*) DESC