package com.doanbenhvien.DoAnBenhVien.Service;

import com.doanbenhvien.DoAnBenhVien.DTO.NhanVienDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.SigninRequest;
import com.doanbenhvien.DoAnBenhVien.DTO.Response.ErrorResponse;
import com.doanbenhvien.DoAnBenhVien.Repository.TaiKhoanRepository;
import com.doanbenhvien.DoAnBenhVien.Utils.ErrorHandler;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthenticationService {
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private ErrorHandler errorHandler;

    public ResponseEntity<?> dangKyBenhNhan(String dienThoai, String matKhau) {
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
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setError(error);
            return ResponseEntity.badRequest()
                    .body(errorResponse);
        }
    }

    public ResponseEntity<?> dangNhapNhanVien(SigninRequest signinRequest) {
        StoredProcedureQuery storedProcedureQuery = entityManager.createStoredProcedureQuery("DANG_NHAP_NHANVIEN");
        storedProcedureQuery.registerStoredProcedureParameter("SODIENTHOAI", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("MATKHAU", String.class, ParameterMode.IN);

        storedProcedureQuery.setParameter("SODIENTHOAI", signinRequest.getSoDienThoai());
        storedProcedureQuery.setParameter("MATKHAU", signinRequest.getMatKhau());

        try {
            storedProcedureQuery.execute();
            List<Object[]> resultList = storedProcedureQuery.getResultList();

            if (!resultList.isEmpty()) {
                Object[] result = resultList.get(0); // Assuming the first row contains NhanVien details
                String ten = (String) result[0]; // Assuming the first column is TEN (name)
                String soDienThoai = (String) result[1]; // Assuming the second column is SODIENTHOAI (phone number)
                String loaiNhanVien = (String) result[2]; // Assuming the third column is LOAINHANVIEN (employee type)

                NhanVienDTO nhanVienDTO = new NhanVienDTO();
                nhanVienDTO.setTen(ten);
                nhanVienDTO.setSoDienThoai(soDienThoai);
                nhanVienDTO.setLoaiNhanVien(loaiNhanVien);
                return ResponseEntity.ok(nhanVienDTO); // Return the NhanVien details
            }
        } catch (Exception e) {
            String error = errorHandler.getMessageError(e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setError(error);
            return ResponseEntity.badRequest()
                    .body(errorResponse);
        }
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setError("Lỗi hệ thống");
        return ResponseEntity.internalServerError().body(errorResponse);
    }
}
