package com.doanbenhvien.DoAnBenhVien.Repository;

import com.doanbenhvien.DoAnBenhVien.Entity.ChiTietDieuTri;
import com.doanbenhvien.DoAnBenhVien.Entity.ChiTietDieuTriId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
public interface ChiTietDieuTriRepository extends JpaRepository<ChiTietDieuTri, ChiTietDieuTriId> {

}