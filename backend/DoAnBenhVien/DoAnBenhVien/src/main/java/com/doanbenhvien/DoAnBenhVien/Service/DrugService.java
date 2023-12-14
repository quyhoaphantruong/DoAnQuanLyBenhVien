package com.doanbenhvien.DoAnBenhVien.Service;

import com.doanbenhvien.DoAnBenhVien.DTO.Request.TaoThuocDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.ThuocDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Service
public class DrugService {
    @Autowired
    EntityManager entityManager;

    public ResponseEntity<List<ThuocDTO>> xemDanhSachThuoc() {
        StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("XEM_DS_THUOC");
        procedureQuery.execute();
        List<Object[]> objects = procedureQuery.getResultList();
        List<ThuocDTO> results = new ArrayList<>();
        for (Object[] obj : objects) {
            ThuocDTO dto = new ThuocDTO();
            dto.setIdThuoc((Integer) obj[0]);
            dto.setTenThuoc((String) obj[1]);
            dto.setPhi((Integer) obj[2]);
            dto.setDonViTinh((String) obj[3]);
            results.add(dto);
        }
        return ResponseEntity.ok(results);
    }

    public ResponseEntity<String> themThuoc(TaoThuocDTO taoThuocDTO) {
        StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("THEM_THUOC");
        procedureQuery.registerStoredProcedureParameter("TEN_THUOC", String.class, ParameterMode.IN);
        procedureQuery.registerStoredProcedureParameter("PHI", Integer.class, ParameterMode.IN);
        procedureQuery.registerStoredProcedureParameter("DONVITINH", String.class, ParameterMode.IN);

        procedureQuery.setParameter("TEN_THUOC", taoThuocDTO.getTenThuoc());
        procedureQuery.setParameter("PHI", taoThuocDTO.getPhi());
        procedureQuery.setParameter("DONVITINH", taoThuocDTO.getDonViTinh());

        try {
            procedureQuery.execute();
            return ResponseEntity.ok("Thêm thuốc thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to add drug");
        }
    }

    @Transactional
    public ResponseEntity<?> xoaThuoc(int idThuoc) {
        try {
            StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("XOA_THUOC");
            procedureQuery.registerStoredProcedureParameter("ID_THUOC", Integer.class, ParameterMode.IN);
            procedureQuery.setParameter("ID_THUOC", idThuoc);
            procedureQuery.execute();
            return ResponseEntity.ok("Xoá thuốc thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Lỗi hệ thống");
        }
    }

    @Transactional
    public ResponseEntity<?> capNhatThuoc(ThuocDTO thuocDTO) {
        try {
            StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("CAPNHAT_THUOC");
            procedureQuery.registerStoredProcedureParameter("ID_THUOC", Integer.class, ParameterMode.IN);
            procedureQuery.registerStoredProcedureParameter("TEN_THUOC", String.class, ParameterMode.IN);
            procedureQuery.registerStoredProcedureParameter("PHI", Integer.class, ParameterMode.IN);
            procedureQuery.registerStoredProcedureParameter("DONVITINH", String.class, ParameterMode.IN);

            procedureQuery.setParameter("ID_THUOC", thuocDTO.getIdThuoc());
            procedureQuery.setParameter("TEN_THUOC", thuocDTO.getTenThuoc());
            procedureQuery.setParameter("PHI", thuocDTO.getPhi());
            procedureQuery.setParameter("DONVITINH", thuocDTO.getDonViTinh());

            procedureQuery.execute();
            return ResponseEntity.ok("CẬP NHẬT THÀNH CÔNG");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Lỗi hệ thống");
        }
    }
}