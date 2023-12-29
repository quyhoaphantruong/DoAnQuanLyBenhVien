package com.doanbenhvien.DoAnBenhVien.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "CHITIET_DIEUTRI")
@IdClass(ChiTietDieuTriId.class)
public class ChiTietDieuTri {
    @Id
    @Column(name = "ID_DIEUTRI")
    private int idDieuTri;

    @Id
    @Column(name = "ID_KEHOACH_DIEUTRI")
    private int idKeHoachDieuTri;

    @Id
    @Column(name = "ID_RANG")
    private int idRang;

    @Id
    @Column(name = "LOAIMAT")
    private String loaiMat;

    @Column(name = "NGAYTAO")
    private Date ngayTao;

    public ChiTietDieuTri(int idDieuTri, int idKeHoachDieuTri, int idRang, String loaiMat) {
        this.idDieuTri = idDieuTri;
        this.idKeHoachDieuTri = idKeHoachDieuTri;
        this.idRang = idRang;
        this.loaiMat = loaiMat;
        this.ngayTao = new Date(System.currentTimeMillis());
    }

}
