package com.doanbenhvien.DoAnBenhVien.DTO.Request;

import lombok.Data;

@Data
public class TaoThanhToanDTO {
    private Integer idBenhNhan;
    private Long tienDaTra;
    private Long tienThoi;
    private String loaiThanhToan;
    private String ghiChu;
    private Long tongTienThanhToan;
    private Integer idKeHoachDieuTri;
}

