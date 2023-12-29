package com.doanbenhvien.DoAnBenhVien.DTO;

import lombok.Data;

import java.sql.Date;

@Data
public class KeHoachDieuTriCuTheDTO {
    private String tenRang;
    private String tenMat;
    private String tenDieuTri;
    private Integer phi;
    private Date ngayTao;
}
