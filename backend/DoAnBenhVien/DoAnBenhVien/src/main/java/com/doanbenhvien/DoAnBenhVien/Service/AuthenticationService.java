package com.doanbenhvien.DoAnBenhVien.Service;

import com.doanbenhvien.DoAnBenhVien.DTO.NhanVienDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.BenhNhanRequest;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.SigninRequest;
import com.doanbenhvien.DoAnBenhVien.DTO.Response.ErrorResponse;
import com.doanbenhvien.DoAnBenhVien.Utils.ErrorHandler;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthenticationService {
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private ErrorHandler errorHandler;

    public ResponseEntity<?> dangKyBenhNhan(BenhNhanRequest benhNhanRequest) {
        StoredProcedureQuery storedProcedure = entityManager.createStoredProcedureQuery("DANG_KY");

        storedProcedure.registerStoredProcedureParameter("SODIENTHOAI", String.class, ParameterMode.IN);
        storedProcedure.registerStoredProcedureParameter("MATKHAU", String.class, ParameterMode.IN);
        storedProcedure.registerStoredProcedureParameter("TEN", String.class, ParameterMode.IN);
        storedProcedure.registerStoredProcedureParameter("GIOITINH", String.class, ParameterMode.IN);
        storedProcedure.registerStoredProcedureParameter("EMAIL", String.class, ParameterMode.IN);

        storedProcedure.setParameter("SODIENTHOAI", benhNhanRequest.getSoDienThoai());
        storedProcedure.setParameter("MATKHAU", benhNhanRequest.getMatKhau());
        storedProcedure.setParameter("EMAIL", benhNhanRequest.getEmail());
        storedProcedure.setParameter("GIOITINH", benhNhanRequest.getGioiTinh());
        storedProcedure.setParameter("TEN", benhNhanRequest.getTen());

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
                Integer idNhanVien = (Integer) result[0];
                String ten = (String) result[1]; // Assuming the first column is TEN (name)
                String soDienThoai = (String) result[2]; // Assuming the second column is SODIENTHOAI (phone number)
                String loaiNhanVien = (String) result[3]; // Assuming the third column is LOAINHANVIEN (employee type)

                NhanVienDTO nhanVienDTO = new NhanVienDTO();
                nhanVienDTO.setIdNhanVien(idNhanVien);
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
