package com.doanbenhvien.DoAnBenhVien.DTO.Request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TimNhaSiRanhRequest {
    private Integer idBenhNhan;
    private LocalDateTime gioBatDau;
}
