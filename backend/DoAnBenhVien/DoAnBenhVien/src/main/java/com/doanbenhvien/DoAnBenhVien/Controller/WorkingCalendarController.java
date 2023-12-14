package com.doanbenhvien.DoAnBenhVien.Controller;

import com.doanbenhvien.DoAnBenhVien.DTO.LichLamViecDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Response.LichLamViecNhanVienResponse;
import com.doanbenhvien.DoAnBenhVien.Service.WorkingCalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/working-calendar")
public class WorkingCalendarController {
    @Autowired
    private WorkingCalendarService workingCalendarService;
    @PostMapping
    public ResponseEntity<?> taoLichLamViec(@RequestBody LichLamViecDTO lichLamViecDTO) {
        return workingCalendarService.taoLichLamViec(lichLamViecDTO);
    }
    @GetMapping("/personnel/{idNhanVien}")
    public ResponseEntity<List<LichLamViecNhanVienResponse>> xemLichLamViecNhanVien(
            @PathVariable(value = "idNhanVien") String idNhanVien) {
        return workingCalendarService.xemLichLamNhanVien(idNhanVien);
    }

}
