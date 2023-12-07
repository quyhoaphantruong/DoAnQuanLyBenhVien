package com.doanbenhvien.DoAnBenhVien.Repository;

import com.doanbenhvien.DoAnBenhVien.Entity.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, String> {
    @Procedure(value = "DANG_KY")
    Integer dangKyBenhNhan(String dienThoai, String matKhau);
}
