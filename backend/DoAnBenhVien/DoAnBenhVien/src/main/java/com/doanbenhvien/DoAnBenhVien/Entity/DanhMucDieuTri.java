package com.doanbenhvien.DoAnBenhVien.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class DanhMucDieuTri {
    @Id
    private String idDanhMuc;
    private String tenDanhMuc;
}
