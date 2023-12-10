package com.doanbenhvien.DoAnBenhVien.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Data
public class LichLamViec {
    @Id
    @Column(name = "ID_LICHLAMVIEC")
    private String idLichLamViec;
    @Column(name = "GIOBATDAU")
    private LocalDateTime gioBatDau;

    @Column(name = "GIOKETTHUC")
    private LocalDateTime gioKetThuc;

    @Column(name = "PHONGKHAM")
    private String phongKham;


}
