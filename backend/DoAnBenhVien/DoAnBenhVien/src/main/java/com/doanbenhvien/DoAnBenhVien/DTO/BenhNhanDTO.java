package com.doanbenhvien.DoAnBenhVien.DTO;

import lombok.Data;
import java.sql.Date;

@Data
public class BenhNhanDTO {
    private Integer idBenhNhan;
    private String ten;
    private String soDienThoai;
    private String email;
    private String diaChi;
    private String gioiTinh;
    private Date ngaySinh;
    private Long tongTienDieuTri;
    private Long tongTienThanhToan;
    private String thongTin;
    private String tinhTrang;
    private String chongChiDinh;
}
