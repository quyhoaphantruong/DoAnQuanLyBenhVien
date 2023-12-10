package com.doanbenhvien.DoAnBenhVien.Service;

import com.doanbenhvien.DoAnBenhVien.DTO.LichLamViecDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Response.LichLamViecNhanVienResponse;
import com.doanbenhvien.DoAnBenhVien.Utils.ErrorHandler;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class WorkingCalendarService {
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private ErrorHandler errorHandler;

    public ResponseEntity<?> taoLichLamViec(LichLamViecDTO lichLamViecDTO) {
        StoredProcedureQuery storedProcedureQuery = entityManager.createStoredProcedureQuery("TAO_LICH_LAM_VIEC");

        storedProcedureQuery.registerStoredProcedureParameter("ID_LICHLAMVIEC", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("ID_NHANVIEN", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("ID_PHONGKHAM", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("GIO_BATDAU", LocalDateTime.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("GIO_KETTHUC", LocalDateTime.class, ParameterMode.IN);

        storedProcedureQuery.setParameter("ID_LICHLAMVIEC", lichLamViecDTO.getIdLichLamViec());
        storedProcedureQuery.setParameter("ID_NHANVIEN", lichLamViecDTO.getIdNhanVien());
        storedProcedureQuery.setParameter("ID_PHONGKHAM", lichLamViecDTO.getPhongKham());
        storedProcedureQuery.setParameter("GIO_BATDAU", lichLamViecDTO.getGioBatDau());
        storedProcedureQuery.setParameter("GIO_KETTHUC", lichLamViecDTO.getGioKetThuc());

        try {
            storedProcedureQuery.execute();
            return ResponseEntity.ok("Đã tạo lịch làm việc thành công");
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(
                        errorHandler.getMessageError(e.getMessage())
                    );
        }
    }

    public ResponseEntity<List<LichLamViecNhanVienResponse>> xemLichLamNhanVien(String idNhanVien) {
        StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("XEM_LICHLAMVIEC_NHANVIEN");
        procedureQuery.registerStoredProcedureParameter("ID_NHANVIEN", String.class, ParameterMode.IN);
        procedureQuery.setParameter("ID_NHANVIEN", idNhanVien);
        procedureQuery.execute();


        List<Object[]> objects = procedureQuery.getResultList();
        List<LichLamViecNhanVienResponse> responses = new ArrayList<>();

        for (Object[] obj : objects) {
            Timestamp gioBatDau = (Timestamp) obj[0];
            Timestamp gioKetThuc = (Timestamp) obj[1];
            responses.add(new LichLamViecNhanVienResponse(gioBatDau, gioKetThuc));
        }
        return ResponseEntity.ok(responses);
    }
}