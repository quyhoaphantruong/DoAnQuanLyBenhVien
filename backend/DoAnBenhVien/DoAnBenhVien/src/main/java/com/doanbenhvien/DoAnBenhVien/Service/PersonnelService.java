package com.doanbenhvien.DoAnBenhVien.Service;

import com.doanbenhvien.DoAnBenhVien.DTO.Request.CreatePersonnelRequest;
import com.doanbenhvien.DoAnBenhVien.Utils.ErrorHandler;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;


@Service
public class PersonnelService {
    @Autowired
    EntityManager entityManager;
    @Autowired
    ErrorHandler errorHandler;
    public ResponseEntity<?> taoNhanVien(CreatePersonnelRequest createPersonnelRequest) {
        StoredProcedureQuery storedProcedureQuery = entityManager
                .createStoredProcedureQuery("TAO_NHAN_VIEN");

        // Registering parameters
        storedProcedureQuery.registerStoredProcedureParameter("ID_NHANVIEN", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("TEN", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("NGAYSINH", Date.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("DIACHI", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("EMAIL", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("SODIENTHOAI", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("LOAINHANVIEN", String.class, ParameterMode.IN);

        // Setting parameter values from the request object
        storedProcedureQuery.setParameter("ID_NHANVIEN", createPersonnelRequest.getIdNhanVien());
        storedProcedureQuery.setParameter("TEN", createPersonnelRequest.getTen());
        storedProcedureQuery.setParameter("NGAYSINH", createPersonnelRequest.getNgaySinh());
        storedProcedureQuery.setParameter("DIACHI", createPersonnelRequest.getDiaChi());
        storedProcedureQuery.setParameter("EMAIL", createPersonnelRequest.getEmail());
        storedProcedureQuery.setParameter("SODIENTHOAI", createPersonnelRequest.getSoDienThoai());
        storedProcedureQuery.setParameter("LOAINHANVIEN", createPersonnelRequest.getLoaiNhanVien());

        // Executing the stored procedure
        try {
            storedProcedureQuery.execute();
            return ResponseEntity.ok("Tạo nhân viên thành công");
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    errorHandler.getMessageError(e.getMessage())
            );
        }
    }
}
