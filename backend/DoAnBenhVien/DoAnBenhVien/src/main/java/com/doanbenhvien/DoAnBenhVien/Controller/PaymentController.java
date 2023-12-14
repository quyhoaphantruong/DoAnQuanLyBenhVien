package com.doanbenhvien.DoAnBenhVien.Controller;

import com.doanbenhvien.DoAnBenhVien.DTO.Request.TaoThanhToanDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.ThongTinThanhToanDTO;
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
    @GetMapping("/patient/{id}")
    public ResponseEntity<List<ThongTinThanhToanDTO>> xemThongTinThanhToan(@PathVariable(name = "id") Integer idBenhNhan) {
        return paymentService.xemThongTinThanhToan(idBenhNhan);
    }
    @PostMapping("/payment")
    public ResponseEntity<?> taoThanhToan(@RequestBody TaoThanhToanDTO taoThanhToanDTO) {
        return paymentService.taoThanhToan(taoThanhToanDTO);
    }
    @GetMapping("/patient/{id}/paid-yet")
    public ResponseEntity<List<XemThanhToanChuaTraDTO>> thanhToanChuaTra(@PathVariable(name = "id") Integer idBenhNhan) {
        return paymentService.xemThanhToanChuaTra(idBenhNhan);
    }
}
