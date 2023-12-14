package com.doanbenhvien.DoAnBenhVien.DTO.Request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TaoKeHoachDieuTriRequest {
    private Integer idBenhNhan;
    private String chanDoan;
    private String noiDung;

    public TaoKeHoachDieuTriRequest(Integer idBenhNhan, String chanDoan, String noiDung) {
        this.idBenhNhan = idBenhNhan;
        this.chanDoan = chanDoan;
        this.noiDung = noiDung;
    }
}
