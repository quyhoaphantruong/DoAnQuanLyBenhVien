package com.doanbenhvien.DoAnBenhVien.Controller;

import com.doanbenhvien.DoAnBenhVien.DTO.PhongKhamDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.CapNhatQuanLyThuocRequest;
import com.doanbenhvien.DoAnBenhVien.Service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/clinics")
@CrossOrigin("http://localhost:5173")
public class ClinicController {
    @Autowired
    ClinicService clinicService;
    @GetMapping
    public ResponseEntity<List<PhongKhamDTO>> xemDanhSachPhongKham() {
        return clinicService.xemDsPhongKham();
    }
    @GetMapping("/{id}/drug")
    public ResponseEntity<?> xemQuanLyThuocPhongKham(@PathVariable(name="id") Integer idPhongKham) {
        return clinicService.xemQuanLyThuocPhongKham(idPhongKham);
    }
    @PutMapping("/drug")
    public ResponseEntity<?> capNhatQuanLyThuoc(@RequestBody CapNhatQuanLyThuocRequest capNhatQuanLyThuocRequest) {
        return clinicService.capNhatQuanLyThuocPhongKham(capNhatQuanLyThuocRequest);
    }
    @PostMapping("/drug")
    public ResponseEntity<?> themQuanLyThuoc(@RequestBody CapNhatQuanLyThuocRequest capNhatQuanLyThuocRequest) {
        return clinicService.taoQuanLyThuoc(capNhatQuanLyThuocRequest);
    }

}
