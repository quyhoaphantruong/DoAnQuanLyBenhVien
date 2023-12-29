package com.doanbenhvien.DoAnBenhVien.Controller;

import com.doanbenhvien.DoAnBenhVien.DTO.Request.TaoThanhToanDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.ThanhToanChuaTraDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.ThongTinThanhToanDieuTriDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.XemThanhToanChuaTraDTO;
import com.doanbenhvien.DoAnBenhVien.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/payments")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
//    @GetMapping("/patient/{id}")
//    public ResponseEntity<List<ThanhToanChuaTraDTO>> xemThongTinThanhToan(@PathVariable(name = "id") Integer idBenhNhan) {
//        return paymentService.xemThongTinThanhToan(idBenhNhan);
//    }
    @PostMapping("/payment/treatment")
    public ResponseEntity<?> thanhToanDieuTri(@RequestBody ThongTinThanhToanDieuTriDTO thongTinThanhToanDieuTriDTO) {
        return paymentService.thanhToanDieuTri(thongTinThanhToanDieuTriDTO);
    }

    @PostMapping("/payment/prescription")
    public ResponseEntity<?> thanhToanDonThuoc(@RequestBody ThongTinThanhToanDieuTriDTO thongTinThanhToanDieuTriDTO) {
        System.out.println(thongTinThanhToanDieuTriDTO);
        return paymentService.thanhToanDonThuoc(thongTinThanhToanDieuTriDTO);
    }

    @GetMapping("/patient/{id}/paid-yet")
    public ResponseEntity<?> xemThanhToanChuaTra(@PathVariable(name = "id") Integer idBenhNhan) {
        return paymentService.xemThanhToanChuaTra(idBenhNhan);
    }
    @GetMapping("payment/total-sum/{id}")
    public ResponseEntity<?> xemTongTienThanhToan(@PathVariable(name = "id") Integer idThongTinThanhToan) {
        return paymentService.xemTongTienThanhToan(idThongTinThanhToan);
    }


}
