package com.doanbenhvien.DoAnBenhVien.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CuocHenDTO {
    private Integer idCuocHen;
    private Integer idBenhNhan;
    private Integer idNhaSi;
    private Integer idTroKham;
    private Byte idPhongKham;
    private String tinhTrang;
    private LocalDateTime thoiGian;
    private String ghiChu;
}
