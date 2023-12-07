package com.doanbenhvien.DoAnBenhVien.Service;

import com.doanbenhvien.DoAnBenhVien.Repository.TaiKhoanRepository;
import com.doanbenhvien.DoAnBenhVien.Utils.ErrorHandler;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private ErrorHandler errorHandler;

    public ResponseEntity<String> dangKyBenhNhan(String dienThoai, String matKhau) {
        StoredProcedureQuery storedProcedure = entityManager.createStoredProcedureQuery("DANG_KY");

        // Registering the parameters with the correct types and modes
        storedProcedure.registerStoredProcedureParameter("DIENTHOAI", String.class, ParameterMode.IN);
        storedProcedure.registerStoredProcedureParameter("MATKHAU", String.class, ParameterMode.IN);

        // Setting the parameter values
        storedProcedure.setParameter("DIENTHOAI", dienThoai);
        storedProcedure.setParameter("MATKHAU", matKhau);

        // Executing the stored procedure
        try {
            storedProcedure.execute();
            return ResponseEntity.ok("Đã tạo tài khoản thành công");
        } catch (Exception e) {
            String error = errorHandler.getMessageError(e.getMessage());
            return ResponseEntity.ok(error); // Return a value indicating failure
        }
    }

}
