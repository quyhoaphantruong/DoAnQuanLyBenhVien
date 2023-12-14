package com.doanbenhvien.DoAnBenhVien.DTO.Request;

import lombok.Data;

@Data
public class TaoChiTietDieuTriDTO {
    private byte idRang;
    private String loaiMat;
    private Integer idDieuTri;
    private Integer idKeHoachDieuTri;
}
