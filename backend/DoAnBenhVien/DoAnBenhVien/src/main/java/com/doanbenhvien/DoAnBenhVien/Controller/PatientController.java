package com.doanbenhvien.DoAnBenhVien.Controller;

import com.doanbenhvien.DoAnBenhVien.DTO.BenhNhanDTO;
import com.doanbenhvien.DoAnBenhVien.Service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api/patients")
public class PatientController {
    @Autowired
    PatientService patientService;
    @GetMapping
    public ResponseEntity<List<BenhNhanDTO>> xemDanhSachBenhNhan() {
        return patientService.xemDanhSachBenhNhan();
    }
    @PutMapping("/patient")
    public ResponseEntity<?> capNhatBenhNhan(@RequestBody BenhNhanDTO benhNhanDTO) {
        return patientService.capNhatBenhNhan(benhNhanDTO);
    }
}
