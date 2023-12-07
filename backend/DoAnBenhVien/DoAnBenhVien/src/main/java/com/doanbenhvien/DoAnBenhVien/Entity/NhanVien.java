package com.doanbenhvien.DoAnBenhVien.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class NhanVien {
    @Id
    private String idNhanVien;
    private String ten;
    private Date ngaySinh;
    private String diaChi;
    private String email;
    private String soDienThoai;
    private String loaiNhanVien;
}
