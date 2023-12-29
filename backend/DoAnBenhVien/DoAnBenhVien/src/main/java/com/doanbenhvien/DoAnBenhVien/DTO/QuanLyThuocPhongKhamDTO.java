package com.doanbenhvien.DoAnBenhVien.DTO;

import lombok.Data;

@Data
public class QuanLyThuocPhongKhamDTO {
    private Byte idPhongKham;
    private Integer idThuoc;
    private String tenThuoc;
    private Integer soLuongTon;
}
