USE QLPHONGKHAM_CSDLNC;
GO

CREATE OR ALTER PROCEDURE XEM_DANHSACH_RANG
AS
BEGIN
	SELECT * FROM RANG
END
GO
EXEC XEM_DANHSACH_RANG
GO 

CREATE OR ALTER PROCEDURE XEM_DANHSACH_MAT
AS
BEGIN
	SELECT * FROM MAT
END
GO