package com.doanbenhvien.DoAnBenhVien.Controller;

import com.doanbenhvien.DoAnBenhVien.DTO.Request.TaoCuocHenRequest;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.TimNhaSiRanhRequest;
import com.doanbenhvien.DoAnBenhVien.Service.AppointmentService;
import jakarta.persistence.EntityManager;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;
    @GetMapping
    public ResponseEntity<?> xemCacCuocHen() {
        return appointmentService.xemCacCuocHen();
    }
    @PostMapping
    public ResponseEntity<?> taoCuocHen(@RequestBody TaoCuocHenRequest taoCuocHenRequest) {
        return appointmentService.taoCuocHen(taoCuocHenRequest);
    }

    @PostMapping("/free/dentist")
    public ResponseEntity<?> timNhaSiRanh(@RequestBody TimNhaSiRanhRequest timNhaSiRanhRequest) {
        return appointmentService.timNhaSiRanh(timNhaSiRanhRequest);
    }

    @DeleteMapping("/appointment/{appointmentId}")
    public ResponseEntity<?> xoaCuocHen(@PathVariable(value = "appointmentId") Integer idCuocHen) {
        return appointmentService.xoaCuocHen(idCuocHen);
    }
    @GetMapping("/dentist/{id}")
    public ResponseEntity<?> xemCuocHenNhaSi(@PathVariable(value = "id") Integer idNhaSi) {
        return appointmentService.xemCuocHenNhaSi(idNhaSi);
    }
}
