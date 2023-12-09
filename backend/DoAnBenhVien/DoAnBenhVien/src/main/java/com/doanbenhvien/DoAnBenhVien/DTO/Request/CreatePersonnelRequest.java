package com.doanbenhvien.DoAnBenhVien.DTO.Request;

import lombok.Data;

import java.util.Date;

@Data
public class CreatePersonnelRequest {
    private String idNhanVien;
    private String ten;
    private Date ngaySinh;
    private String diaChi;
    private String email;
    private String soDienThoai;
    private String loaiNhanVien;
}
