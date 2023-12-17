package com.doanbenhvien.DoAnBenhVien.Controller;

import com.doanbenhvien.DoAnBenhVien.DTO.MatDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.RangDTO;
import com.doanbenhvien.DoAnBenhVien.Service.TeethFacialTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api/teeth-face")
public class TeethFacialTypeController {
    @Autowired
    private TeethFacialTypeService teethFacialTypeService;
    @GetMapping("/teeth")
    public ResponseEntity<List<RangDTO>> xemDanhSachRang() {
        return teethFacialTypeService.xemDanhSachRang();
    }
    @GetMapping("/face")
    public ResponseEntity<List<MatDTO>> xemDanhSachMat() {
        return teethFacialTypeService.xemDanhSachMat();
    }
}
