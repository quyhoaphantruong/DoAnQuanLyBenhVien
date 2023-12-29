package com.doanbenhvien.DoAnBenhVien.Service;

import com.doanbenhvien.DoAnBenhVien.DTO.PhongKhamDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.QuanLyThuocPhongKhamDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.CapNhatQuanLyThuocRequest;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClinicService {
    @Autowired
    EntityManager entityManager;

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ClinicService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    public ResponseEntity<List<PhongKhamDTO>> xemDsPhongKham() {
        try {
            StoredProcedureQuery query = entityManager.createStoredProcedureQuery("XEM_DS_PHONGKHAM");
            query.execute();
            List<Object[]> resultList = query.getResultList();
            List<PhongKhamDTO> phongKhamDTOS = new ArrayList<>();
            for (Object[] obj : resultList) {
                PhongKhamDTO phongKhamDTO = new PhongKhamDTO();
                phongKhamDTO.setIdPhongKham((Byte) obj[0]);
                phongKhamDTO.setDiaChiPhongKham((String) obj[1]);
                phongKhamDTO.setSoDienThoai((String) obj[2]);
                phongKhamDTOS.add(phongKhamDTO);
            }
            return ResponseEntity.ok(phongKhamDTOS);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    public ResponseEntity<?> xemQuanLyThuocPhongKham(Integer idPhongKham) {
        try {
            StoredProcedureQuery query = entityManager.createStoredProcedureQuery("XEM_QUANLY_THUOC_PHONGKHAM");
            query.registerStoredProcedureParameter("ID_PHONGKHAM", Integer.class, ParameterMode.IN);
            query.setParameter("ID_PHONGKHAM", idPhongKham);
            query.execute();
            List<Object[]> resultList = query.getResultList();
            List<QuanLyThuocPhongKhamDTO> quanLyThuocPhongKhamDTOS = new ArrayList<>();
            for (Object[] obj : resultList) {
                QuanLyThuocPhongKhamDTO phongKhamDTO = new QuanLyThuocPhongKhamDTO();
                phongKhamDTO.setIdPhongKham((Byte) obj[0]);
                phongKhamDTO.setIdThuoc((Integer) obj[1]);
                phongKhamDTO.setTenThuoc((String) obj[2]);
                phongKhamDTO.setSoLuongTon((Integer) obj[3]);
                quanLyThuocPhongKhamDTOS.add(phongKhamDTO);
            }
            return ResponseEntity.ok(quanLyThuocPhongKhamDTOS);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
    @Transactional
    public ResponseEntity<?> capNhatQuanLyThuocPhongKham(CapNhatQuanLyThuocRequest capNhatQuanLyThuocRequest) {
        try {
            System.out.println(capNhatQuanLyThuocRequest);
            jdbcTemplate.update(
                    "EXEC CAPNHAT_QUANLY_THUOC ?, ?, ?",
                    capNhatQuanLyThuocRequest.getIdPhongKham(),
                    capNhatQuanLyThuocRequest.getIdThuoc(),
                    capNhatQuanLyThuocRequest.getSoLuongTon()
            );
             return ResponseEntity.ok("Cập nhật quản lý thuốc thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    public ResponseEntity<?> taoQuanLyThuoc(CapNhatQuanLyThuocRequest capNhatQuanLyThuocRequest) {
        try {
            jdbcTemplate.update(
                    "EXEC TAO_QUANLY_THUOC ?, ?, ?",
                    capNhatQuanLyThuocRequest.getIdPhongKham(),
                    capNhatQuanLyThuocRequest.getIdThuoc(),
                    capNhatQuanLyThuocRequest.getSoLuongTon()
            );
            return ResponseEntity.ok("Quản lý thuốc đã được tạo thành công.");
        } catch (Exception ex) {
            String errorMessage = "Lỗi khi tạo quản lý thuốc: " + ex.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }
}
