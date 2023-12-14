package com.doanbenhvien.DoAnBenhVien.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LichLamViecDTO {
    private Integer idNhanVien;
    private Integer phongKham;
    private LocalDateTime gioBatDau;
    private LocalDateTime gioKetThuc;
}
