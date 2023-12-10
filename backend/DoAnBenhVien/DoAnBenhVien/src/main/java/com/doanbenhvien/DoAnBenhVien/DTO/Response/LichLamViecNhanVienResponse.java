package com.doanbenhvien.DoAnBenhVien.DTO.Response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
public class LichLamViecNhanVienResponse {
    private Timestamp gioBatDau;
    private Timestamp gioKetThuc;

    public LichLamViecNhanVienResponse(Timestamp gioBatDau, Timestamp gioKetThuc) {
        this.gioBatDau = gioBatDau;
        this.gioKetThuc = gioKetThuc;
    }
}
