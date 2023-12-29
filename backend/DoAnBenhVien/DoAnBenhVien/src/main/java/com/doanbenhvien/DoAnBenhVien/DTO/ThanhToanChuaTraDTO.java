package com.doanbenhvien.DoAnBenhVien.DTO;

import lombok.Data;

import java.util.List;

@Data
public class ThanhToanChuaTraDTO {
    private List<ThanhToanDieuTriChuaTraDTO> thanhToanDieuTriChuaTraDTOList;
    private List<ThanhToanDonThuocChuaTraDTO> thanhToanDonThuocChuaTraDTOList;
}

