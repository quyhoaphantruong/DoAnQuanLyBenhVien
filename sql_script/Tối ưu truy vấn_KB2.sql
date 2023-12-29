USE QLPHONGKHAM_CSDLNC;

CREATE INDEX IX_DIENTHOAI ON dbo.BENHNHAN (SODIENTHOAI);
DROP INDEX IX_DIENTHOAI ON dbo.BENHNHAN

CREATE NONCLUSTERED INDEX IX_NGAYTAO_ID_TTTT ON dbo.THONGTIN_THANHTOAN(ID_KEHOACH_DIEUTRI,NGAYTAO_CAC_CHITIET_DIEUTRI)
DROP INDEX IX_NGAYTAO_ID_TTTT ON dbo.THONGTIN_THANHTOAN
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


GO
exec dbo.XEM_INDEX_BANG 'BENHNHAN'


GO
SET STATISTICS TIME ON;
 --TÌM BỆNH NHÂN BẰNG SỐ ĐIỆN THOẠI
EXEC TIM_BENHNHAN_BANG_SDT '09'
SET STATISTICS TIME OFF;

GO
-- THÊM KẾ HOẠCH ĐIỀU TRỊ
--DECLARE @OUTPUT_KEHOACH_DIEUTRI INT;
--EXEC THEM_KEHOACH_DIEUTRI 'abc124', 'avc2', 11, @OUTPUT_KEHOACH_DIEUTRI


SELECT TOP 1 * FROM KEHOACH_DIEUTRI ORDER BY ID_KEHOACH_DIEUTRI DESC
-- THÊM CHI TIẾT ĐIỀU TRỊ
-- THÊM THÔNG TIN THANH TOÁN ĐIỀU TRỊV B
GO

EXEC THEM_CHITIET_DIEUTRI 1040, 2, 4, 'L'

