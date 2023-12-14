package com.doanbenhvien.DoAnBenhVien.Controller;

import com.doanbenhvien.DoAnBenhVien.DTO.KeHoachDieuTriCuTheDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.CapNhatKeHoachDieuTriDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.TaoChiTietDieuTriDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.TaoKeHoachDieuTriRequest;
import com.doanbenhvien.DoAnBenhVien.Service.TreatmentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/treatments")
public class TreatmentController {
    @Autowired
    private TreatmentService treatmentService;

    @GetMapping("/treatment/{idKeHoachDieuTri}")
    public ResponseEntity<List<KeHoachDieuTriCuTheDTO>> xemKeHoachDieuTriCuThe(@PathVariable(name = "idKeHoachDieuTri") Integer idKeHoachDieuTri) {
        return treatmentService.xemKeHoachDieuTriCuThe(idKeHoachDieuTri);
    }

    @PostMapping
    public ResponseEntity<?> taoKeHoachDieuTri(@RequestBody TaoKeHoachDieuTriRequest taoKeHoachDieuTriRequest) {
        return treatmentService.taoKeHoachDieuTri(taoKeHoachDieuTriRequest);
    }
    @PutMapping
    public ResponseEntity<?> capNhatKeHoachDieuTri(@RequestBody CapNhatKeHoachDieuTriDTO capNhatKeHoachDieuTriDTO) {
        return treatmentService.capNhatKehoachDieuTri(capNhatKeHoachDieuTriDTO);
    }
    @PostMapping("/treatment-details")
    public ResponseEntity<?>  themChiTietDieuTri(@RequestBody TaoChiTietDieuTriDTO taoChiTietDieuTriDTO) {
        return treatmentService.themChiTietDieuTri(taoChiTietDieuTriDTO);
    }
}
