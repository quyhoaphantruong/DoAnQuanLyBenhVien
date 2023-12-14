package com.doanbenhvien.DoAnBenhVien.Service;

import com.doanbenhvien.DoAnBenhVien.DTO.BenhNhanDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class PatientService {
    @Autowired
    EntityManager entityManager;

    public ResponseEntity<List<BenhNhanDTO>> xemDanhSachBenhNhan() {
        StoredProcedureQuery storedProcedureQuery = entityManager.createStoredProcedureQuery("XEM_DS_BENHNHAN");

        storedProcedureQuery.execute();
        List<Object[]> objects = storedProcedureQuery.getResultList();
        List<BenhNhanDTO> results = new ArrayList<>();
        for (Object[] obj : objects) {
            BenhNhanDTO benhNhanDTO = new BenhNhanDTO();
            benhNhanDTO.setIdBenhNhan((Integer) obj[0]);
            benhNhanDTO.setTen((String) obj[1]);
            benhNhanDTO.setGioiTinh((String) obj[2]);
            benhNhanDTO.setEmail((String) obj[3]);
            benhNhanDTO.setSoDienThoai((String) obj[4]);
            benhNhanDTO.setNgaySinh((Date) obj[5]);
            benhNhanDTO.setDiaChi((String) obj[6]);
            benhNhanDTO.setTongTienThanhToan((Long) obj[7]);
            benhNhanDTO.setTongTienDieuTri((Long) obj[8]);
            benhNhanDTO.setThongTin((String) obj[9]);
            benhNhanDTO.setTinhTrang((String) obj[10]);
            benhNhanDTO.setChongChiDinh((String) obj[11]);
            results.add(benhNhanDTO);
        }

        return ResponseEntity.ok(results);
    }
    public ResponseEntity<?> capNhatBenhNhan(BenhNhanDTO benhNhanDTO) {
        try {
            StoredProcedureQuery query = entityManager.createStoredProcedureQuery("CAPNHAT_BENHNHAN");
            query.registerStoredProcedureParameter("ID_BENHNHAN", Integer.class, ParameterMode.IN);
            query.registerStoredProcedureParameter("TEN", String.class, ParameterMode.IN);
            query.registerStoredProcedureParameter("GIOITINH", String.class, ParameterMode.IN);
            query.registerStoredProcedureParameter("EMAIL", String.class, ParameterMode.IN);
            query.registerStoredProcedureParameter("SODIENTHOAI", String.class, ParameterMode.IN);
            query.registerStoredProcedureParameter("NGAYSINH", Date.class, ParameterMode.IN);
            query.registerStoredProcedureParameter("DIACHI", String.class, ParameterMode.IN);
            query.registerStoredProcedureParameter("TONGTIENTHANHTOAN", Long.class, ParameterMode.IN);
            query.registerStoredProcedureParameter("TONGTIENDIEUTRI", Long.class, ParameterMode.IN);
            query.registerStoredProcedureParameter("THONGTIN", String.class, ParameterMode.IN);
            query.registerStoredProcedureParameter("TINHTRANG", String.class, ParameterMode.IN);
            query.registerStoredProcedureParameter("CHONGCHIDINH", String.class, ParameterMode.IN);

            query.setParameter("ID_BENHNHAN", benhNhanDTO.getIdBenhNhan());
            query.setParameter("TEN", benhNhanDTO.getTen());
            query.setParameter("GIOITINH", benhNhanDTO.getGioiTinh());
            query.setParameter("EMAIL", benhNhanDTO.getEmail());
            query.setParameter("SODIENTHOAI", benhNhanDTO.getSoDienThoai());
            query.setParameter("NGAYSINH", benhNhanDTO.getNgaySinh());
            query.setParameter("DIACHI", benhNhanDTO.getDiaChi());
            query.setParameter("TONGTIENTHANHTOAN", benhNhanDTO.getTongTienThanhToan());
            query.setParameter("TONGTIENDIEUTRI", benhNhanDTO.getTongTienDieuTri());
            query.setParameter("THONGTIN", benhNhanDTO.getThongTin());
            query.setParameter("TINHTRANG", benhNhanDTO.getTinhTrang());
            query.setParameter("CHONGCHIDINH", benhNhanDTO.getChongChiDinh());

            query.execute();
            return ResponseEntity.ok("Cập nhật bênh nhân thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Lỗi hệ thống");
        }
    }

}
