package com.doanbenhvien.DoAnBenhVien.Controller;

import com.doanbenhvien.DoAnBenhVien.DTO.DanhMucDieuTriDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.DieuTriDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.KeHoachDieuTriCuTheDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.KeHoachDieuTriDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.CapNhatKeHoachDieuTriDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.TaoChiTietDieuTriDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.TaoKeHoachDieuTriRequest;
import com.doanbenhvien.DoAnBenhVien.Service.TreatmentDataService;
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
    @Autowired
    private TreatmentDataService treatmentDataService;

    @GetMapping("/treatment-details/{idKeHoachDieuTri}")
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
    public ResponseEntity<?> themChiTietDieuTri(@RequestBody List<TaoChiTietDieuTriDTO> taoChiTietDieuTriDTOS) {
        return treatmentService.themChitietDieutri(taoChiTietDieuTriDTOS);
    }

    @GetMapping("/category-treatments")
    public ResponseEntity<List<DanhMucDieuTriDTO>> xemDanhMucDieuTri() {
        return treatmentDataService.xemDanhMucDieuTri();
    }
    @GetMapping("/treatment-services/{id}")
    public ResponseEntity<List<DieuTriDTO>> xemDanhSachDieuTri(@PathVariable(name = "id") Integer idDanhMucDieuTri) {
        return treatmentDataService.xemDanhSachDieuTri(idDanhMucDieuTri);
    }
    @GetMapping("/patient/{id}")
    public ResponseEntity<List<KeHoachDieuTriDTO>> xemDanhSachKeHoachDieuTri(@PathVariable(name="id") Integer idBenhNhan) {
        return treatmentService.xemDsKeHoachDieuTri(idBenhNhan);
    }
}
