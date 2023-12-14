package com.doanbenhvien.DoAnBenhVien.DTO.Request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class TaoCuocHenRequest {
    private String idBenhNhan;
    private String idNhaSi;
    private String idTroKham;
    private String idPhongKham;
    private LocalDateTime thoiGian;
    private String ghiChu;
    private String tinhTrang;
}
