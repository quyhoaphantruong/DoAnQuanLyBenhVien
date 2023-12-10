package com.doanbenhvien.DoAnBenhVien.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class PhongKham {
    @Id
    @Column(name = "ID_PHONGKHAM")
    private String idPhongKham;
    @Column(name = "DIACHIPK")
    private String diaChiPhongKham;
    @Column(name = "SDTPK")
    private  String sdtPhongKham;
}
