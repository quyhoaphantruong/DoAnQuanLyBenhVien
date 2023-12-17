package com.doanbenhvien.DoAnBenhVien.Service;

import com.doanbenhvien.DoAnBenhVien.DTO.NhanVienDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.CreatePersonnelRequest;
import com.doanbenhvien.DoAnBenhVien.Utils.ErrorHandler;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;


@Service
public class PersonnelService {
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private ErrorHandler errorHandler;

    public ResponseEntity<?> taoNhanVien(CreatePersonnelRequest createPersonnelRequest) {
        StoredProcedureQuery storedProcedureQuery = entityManager
                .createStoredProcedureQuery("TAO_NHANVIEN");
        // Registering parameters
        storedProcedureQuery.registerStoredProcedureParameter("TEN", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("NGAYSINH", Date.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("DIACHI", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("EMAIL", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("SODIENTHOAI", String.class, ParameterMode.IN);
        storedProcedureQuery.registerStoredProcedureParameter("LOAINHANVIEN", String.class, ParameterMode.IN);

        // Setting parameter values from the request object
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

    public ResponseEntity<List<NhanVienDTO>> layDanhSachNhanVien() {
        StoredProcedureQuery storedProcedure = entityManager.createStoredProcedureQuery("XEM_DS_NHANVIEN");
        storedProcedure.execute();

        List<Object[]> resultList = storedProcedure.getResultList();
        List<NhanVienDTO> nhanVienDTOList = new ArrayList<>();

        for (Object[] row : resultList) {
            NhanVienDTO dto = new NhanVienDTO();
            dto.setIdNhanVien((Integer) row[0]);
            dto.setTen((String) row[1]);
            dto.setNgaySinh((Date) row[2]);
            dto.setDiaChi((String) row[3]);
            dto.setEmail((String) row[4]);
            dto.setSoDienThoai((String) row[5]);
            dto.setLoaiNhanVien((String) row[6]);
            nhanVienDTOList.add(dto);
        }
        return ResponseEntity.ok(nhanVienDTOList);
    }

    @Transactional
    public ResponseEntity<?> capNhatNhanVien(NhanVienDTO nhanVienDTO) {
        StoredProcedureQuery storedProcedure = entityManager
                .createStoredProcedureQuery("CAPNHAT_NHANVIEN");

        storedProcedure.registerStoredProcedureParameter("ID_NHANVIEN", Integer.class, ParameterMode.IN);
        storedProcedure.registerStoredProcedureParameter("TEN", String.class, ParameterMode.IN);
        storedProcedure.registerStoredProcedureParameter("NGAYSINH", java.sql.Date.class, ParameterMode.IN);
        storedProcedure.registerStoredProcedureParameter("DIACHI", String.class, ParameterMode.IN);

        storedProcedure.setParameter("ID_NHANVIEN", nhanVienDTO.getIdNhanVien());
        storedProcedure.setParameter("TEN", nhanVienDTO.getTen());
        storedProcedure.setParameter("NGAYSINH", nhanVienDTO.getNgaySinh());
        storedProcedure.setParameter("DIACHI", nhanVienDTO.getDiaChi());
        try {
            storedProcedure.execute();
            return ResponseEntity.ok("Cập nhật thành công");
        } catch(Exception e) {
            return ResponseEntity.badRequest().body("Lỗi hệ thống");
        }
    }

    @Transactional
    public ResponseEntity<?> xoaNhanVien(Integer idNhanVien) {
        StoredProcedureQuery storedProcedure = entityManager
                .createStoredProcedureQuery("XOA_NHANVIEN");
        storedProcedure.registerStoredProcedureParameter("ID_NHANVIEN", Integer.class, ParameterMode.IN);
        storedProcedure.setParameter("ID_NHANVIEN", idNhanVien);

        try {
            storedProcedure.execute();
            return ResponseEntity.ok("Xoá nhân viên thành công");
        } catch(Exception e) {
            return ResponseEntity.badRequest().body("Lỗi hệ thống");
        }
    }
}
