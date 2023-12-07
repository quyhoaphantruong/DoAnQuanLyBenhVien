package com.doanbenhvien.DoAnBenhVien.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class TaiKhoan {
    @Id
    private String soDienThoai;
    private String matKhau;
}
