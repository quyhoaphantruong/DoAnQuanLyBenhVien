package com.doanbenhvien.DoAnBenhVien.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Thuoc {
    @Id
    private String idThuoc;
    private String tenThuoc;

    private Double phi;
    private String donViTinh;

}
