package com.doanbenhvien.DoAnBenhVien.Controller;

import com.doanbenhvien.DoAnBenhVien.DTO.Request.TaoThuocDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.ThuocDTO;
import com.doanbenhvien.DoAnBenhVien.Service.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/drugs")
public class DrugController {
    @Autowired
    private DrugService drugService;
    @GetMapping
    public ResponseEntity<List<ThuocDTO>> xemDanhSachThuoc() {
        return drugService.xemDanhSachThuoc();
    }
    @PostMapping(value = "/drug")
    public ResponseEntity<?> taoThuoc(@RequestBody TaoThuocDTO taoThuocDTO) {
        return drugService.themThuoc(taoThuocDTO);
    }
    @DeleteMapping(value = "/drug/{id}")
    public ResponseEntity<?> xoaThuoc(@PathVariable(name = "id") Integer idThuoc) {
        return drugService.xoaThuoc(idThuoc);
    }
    @PutMapping("/drug")
    public ResponseEntity<?> capNhatThuoc(@RequestBody ThuocDTO thuocDTO) {
        return drugService.capNhatThuoc(thuocDTO);
    }
}
