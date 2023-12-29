package com.doanbenhvien.DoAnBenhVien.DTO;

import lombok.Data;

import java.sql.Date;
import java.time.LocalDate;

@Data
public class ThanhToanDonThuocChuaTraDTO {
    private Integer idThongTinThanhToan;
    private Long tongTienThanhToan;
    private Date ngayTao;
    private String tenBacSi;
}
