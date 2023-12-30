﻿
use QLPHONGKHAM_CSDLNC1
GO
--Giá của Thuốc phải lớn hơn bằng 0.
--Phí của một Buổi điều trị phải lớn hơn hoặc bằng 0

CREATE OR ALTER TRIGGER PhiThuocLonHon0 ON THUOC AFTER INSERT, UPDATE
AS 
IF UPDATE(PHI)
BEGIN
	IF EXISTS (SELECT * FROM THUOC WHERE PHI<0)
	BEGIN
		RAISERROR(N'LỖI NHẬP PHÍ NHỎ HƠN 0!',16,1)
		ROLLBACK
	END
END


GO
CREATE OR ALTER TRIGGER PhiBDT ON DIEUTRI FOR INSERT,UPDATE
AS 
IF UPDATE(PHI)
BEGIN
	IF EXISTS (SELECT * FROM DIEUTRI WHERE PHI<0)
	BEGIN
		RAISERROR(N'LỖI NHẬP PHÍ NHỎ HƠN 0!',16,1)
		ROLLBACK
	END
END 
--Mặt răng gồm: L, F, D, M ,T, G.
GO
CREATE OR ALTER TRIGGER MatRang ON MAT FOR INSERT,UPDATE
AS
	IF UPDATE(LOAIMAT)
	BEGIN
		IF EXISTS(SELECT * FROM MAT LM WHERE LM.LOAIMAT!='L' AND LM.LOAIMAT!='F' AND LM.LOAIMAT!='D' AND LM.LOAIMAT!='M' AND LM.LOAIMAT!='T' AND LM.LOAIMAT!='G')
			BEGIN
				RAISERROR(N'LỖI NHẬP SAI LOẠI MẶT!',16,1)
				ROLLBACK
			END
	END
--Giờ kết thúc của lịch làm việc phải sau giờ bắt đầu
GO
CREATE OR ALTER TRIGGER GioLichLamViec ON LICHLAMVIEC FOR INSERT,UPDATE
AS
	IF UPDATE(GIOBATDAU) OR UPDATE(GIOKETTHUC)
	BEGIN
		IF  EXISTS (SELECT * FROM LICHLAMVIEC WHERE GIOKETTHUC<GIOBATDAU)
		BEGIN
			RAISERROR(N'GIỜ BẮT ĐẦU SAU GIỜ KẾT THÚC',16,1)
				ROLLBACK
		END
	END
--Tiền thối trong thông tin thanh toán bằng tiền đã trả trừ đi tổng tiền thanh toán
GO
CREATE OR ALTER TRIGGER TrgTienThoi ON THONGTIN_THANHTOAN
FOR INSERT,UPDATE
AS
	UPDATE THONGTIN_THANHTOAN
	SET TIENTHOI= (SELECT I.TIENDATRA FROM inserted I)- (SELECT I.TONGTIENTHANHTOAN FROM inserted I)
	IF @@ERROR <> 0
	BEGIN
		RAISERROR('LỖI HỆ THỐNG KO THỂ UPDATE THÔNG TIN THANH TOÁN', 16, 1)
		RETURN
	END;
--Giới tính phải là nam hoặc nữ.

GO
CREATE OR ALTER TRIGGER GioiTinh ON BENHNHAN FOR INSERT,UPDATE
AS
	IF UPDATE(GIOITINH)
	BEGIN
		IF EXISTS(SELECT * FROM BENHNHAN WHERE GIOITINH!='Nam' AND GIOITINH!=N'Nữ')
			BEGIN
				RAISERROR(N'Vui lòng nhập giới tính nam và nữ',16,1)
				ROLLBACK
			END
	END