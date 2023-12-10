package com.doanbenhvien.DoAnBenhVien.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LichLamViecDTO {
    private String idLichLamViec;
    private String idNhanVien;
    private String phongKham;
    private LocalDateTime gioBatDau;
    private LocalDateTime gioKetThuc;
}
