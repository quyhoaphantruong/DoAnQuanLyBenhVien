package com.doanbenhvien.DoAnBenhVien.DTO;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class CuocHenNhaSiDTO {
    private Integer idCuocHen;
    private Byte idPhongKham;
    private Integer idBenhNhan;
    private String tinhTrang;
    private String ghiChu;
    private Timestamp thoiGian;
}
