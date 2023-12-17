package com.doanbenhvien.DoAnBenhVien.DTO;

import jakarta.annotation.sql.DataSourceDefinitions;
import lombok.Data;

@Data
public class DieuTriDTO {
    private Integer idDieuTri;
    private String tenDieuTri;
    private Integer phi;
}
