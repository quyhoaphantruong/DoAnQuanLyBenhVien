package com.doanbenhvien.DoAnBenhVien.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class NhanVienDTO {
    private Integer idNhanVien;
    private String ten;
    private Date ngaySinh;
    private String diaChi;
    private String soDienThoai;
    private String email;
    private String loaiNhanVien;

    public NhanVienDTO(Integer idNhanVien, String ten, Date ngaySinh, String diaChi, String soDienThoai, String email, String loaiNhanVien) {
        this.idNhanVien = idNhanVien;
        this.ten = ten;
        this.ngaySinh = ngaySinh;
        this.diaChi = diaChi;
        this.soDienThoai = soDienThoai;
        this.email = email;
        this.loaiNhanVien = loaiNhanVien;
    }

}
