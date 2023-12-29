package com.doanbenhvien.DoAnBenhVien.DTO;

import lombok.Data;

import java.sql.Date;

@Data
public class KeHoachDieuTriDTO {
    private Integer idKehoachDieuTri;
    private String chanDoan;
    private String noiDung;
    private Byte tinhTrangDieuTri;
    private Date ngayTao;
    private Integer tongChiPhi;
}
