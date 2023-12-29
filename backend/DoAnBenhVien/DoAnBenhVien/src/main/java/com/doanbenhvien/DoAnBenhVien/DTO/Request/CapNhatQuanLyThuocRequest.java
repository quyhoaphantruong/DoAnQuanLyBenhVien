package com.doanbenhvien.DoAnBenhVien.DTO.Request;

import lombok.Data;

@Data
public class CapNhatQuanLyThuocRequest {
    private Byte idPhongKham;
    private Integer idThuoc;
    private Integer soLuongTon;
}
