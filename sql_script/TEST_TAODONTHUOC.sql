﻿USE QLPHONGKHAM_CSDLNC; 
GO 

-- TÌM BỆNH NHÂN
EXEC TIM_BENHNHAN_BANG_SDT '099'

-- THÊM ĐƠN THUỐC
EXEC THEM_DONTHUOC 1, 1, 'GHI CHU 1'

SELECT * 
FROM DONTHUOC DT
JOIN THONGTIN_THANHTOAN_DONTHUOC TT ON TT.ID_DONTHUOC = DT.ID_DONTHUOC
-- THÊM CHI TIẾT ĐƠN THUỐC
EXEC THEM_CHITIET_DONTHUOC 1001, 1, 5

