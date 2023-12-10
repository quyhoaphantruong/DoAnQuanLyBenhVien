package com.doanbenhvien.DoAnBenhVien.Controller;

import com.doanbenhvien.DoAnBenhVien.DTO.NhanVienDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.CreatePersonnelRequest;
import com.doanbenhvien.DoAnBenhVien.Service.PersonnelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api/personnel")
public class PersonnelController {
    @Autowired
    PersonnelService personnelService;
    @PostMapping
    public ResponseEntity<?> taoNhanSu(@RequestBody CreatePersonnelRequest createPersonnelRequest) {
        System.out.println(createPersonnelRequest);
        return personnelService.taoNhanVien(createPersonnelRequest);
    }

    @GetMapping
    public ResponseEntity<List<NhanVienDTO>> layDanhSachNhanVien() {
        return personnelService.layDanhSachNhanVien();
    }

}
