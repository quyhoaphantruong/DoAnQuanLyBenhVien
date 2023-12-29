package com.doanbenhvien.DoAnBenhVien.DTO;

import lombok.Data;

import java.sql.Date;
import java.time.LocalDate;

@Data
public class ThanhToanDieuTriChuaTraDTO {
    private Integer idThongTinThanhToan;
    private Long tongTienThanhToan;
    private String chanDoan;
    private String noiDung;
    private Date ngayTao;
}
