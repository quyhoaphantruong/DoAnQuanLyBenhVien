package com.doanbenhvien.DoAnBenhVien.Controller;

import com.doanbenhvien.DoAnBenhVien.DTO.DangKyRequest;
import com.doanbenhvien.DoAnBenhVien.Service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/auth")
public class AuthenticationController {
    @Autowired
    AuthenticationService authenticationService;
    @GetMapping
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("hello");
    }
    @PostMapping("/signup")
    public ResponseEntity<String> dangKyBenhNhan(@RequestBody DangKyRequest dangKyRequest) {
        return authenticationService.dangKyBenhNhan(
                dangKyRequest.getSoDienThoai(),
                dangKyRequest.getMatKhau()
        );
    }

}
