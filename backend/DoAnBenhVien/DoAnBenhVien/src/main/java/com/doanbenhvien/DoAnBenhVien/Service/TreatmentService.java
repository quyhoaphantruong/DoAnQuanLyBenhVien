package com.doanbenhvien.DoAnBenhVien.Service;

import com.doanbenhvien.DoAnBenhVien.DTO.KeHoachDieuTriCuTheDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.CapNhatKeHoachDieuTriDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.TaoChiTietDieuTriDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.TaoKeHoachDieuTriRequest;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class TreatmentService {
    @Autowired
    EntityManager entityManager;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    public ResponseEntity<?> taoKeHoachDieuTri(TaoKeHoachDieuTriRequest taoKeHoachDieuTriRequest) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("THEM_KEHOACH_DIEUTRI");
        query.registerStoredProcedureParameter("NOIDUNG", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("CHANDOAN", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("ID_BENHNHAN", Integer.class, ParameterMode.IN);

        query.setParameter("NOIDUNG", taoKeHoachDieuTriRequest.getNoiDung());
        query.setParameter("CHANDOAN", taoKeHoachDieuTriRequest.getChanDoan());
        query.setParameter("ID_BENHNHAN", taoKeHoachDieuTriRequest.getIdBenhNhan());

        try {
            query.execute();
            return ResponseEntity.ok("Tạo kế hoạch điều trị thành công");
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @Transactional
    public ResponseEntity<?> capNhatKehoachDieuTri(CapNhatKeHoachDieuTriDTO capNhatKeHoachDieuTriDTO) {
        System.out.println(capNhatKeHoachDieuTriDTO);
        try {
            int rowsAffected = entityManager.createNativeQuery(
                            "UPDATE KEHOACH_DIEUTRI " +
                                    "SET NOIDUNG = :noiDung, CHANDOAN = :chanDoan, TINHTRANGDIEUTRI = :tinhTrangDieutri " +
                                    "WHERE ID_KEHOACH_DIEUTRI = :idKehoachDieutri")
                    .setParameter("noiDung", capNhatKeHoachDieuTriDTO.getNoiDung())
                    .setParameter("chanDoan", capNhatKeHoachDieuTriDTO.getChanDoan())
                    .setParameter("tinhTrangDieutri", capNhatKeHoachDieuTriDTO.getTinhTrangDieuTri())
                    .setParameter("idKehoachDieutri", capNhatKeHoachDieuTriDTO.getIdKehoachDieuTri())
                    .executeUpdate();

            logger.info("Rows updated: {}", rowsAffected);
            return ResponseEntity.ok("Cập nhật thành công");
        } catch (Exception e) {
            // Handle exceptions or log the error
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    public ResponseEntity<?> themChiTietDieuTri(TaoChiTietDieuTriDTO taoChiTietDieuTriDTO) {
        StoredProcedureQuery storedProcedure = entityManager.createStoredProcedureQuery("THEM_CHITIET_DIEUTRI");
        System.out.println(taoChiTietDieuTriDTO);
        storedProcedure.registerStoredProcedureParameter("ID_DIEUTRI", Integer.class, ParameterMode.IN);
        storedProcedure.registerStoredProcedureParameter("ID_KEHOACH_DIEUTRI", Integer.class, ParameterMode.IN);
        storedProcedure.registerStoredProcedureParameter("ID_RANG", Integer.class, ParameterMode.IN);
        storedProcedure.registerStoredProcedureParameter("LOAIMAT", String.class, ParameterMode.IN);

        storedProcedure.setParameter("ID_DIEUTRI", taoChiTietDieuTriDTO.getIdDieuTri());
        storedProcedure.setParameter("ID_KEHOACH_DIEUTRI", taoChiTietDieuTriDTO.getIdKeHoachDieuTri());
        storedProcedure.setParameter("ID_RANG", taoChiTietDieuTriDTO.getIdRang());
        storedProcedure.setParameter("LOAIMAT", taoChiTietDieuTriDTO.getLoaiMat());


        try {
            storedProcedure.execute();
            return ResponseEntity.ok("Thêm chi tiết điều trị thành công");
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    public ResponseEntity<List<KeHoachDieuTriCuTheDTO>> xemKeHoachDieuTriCuThe(Integer idKeHoachDieuTri) {
        StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("XEM_KEHOACH_DIEUTRI_CUTHE");
        procedureQuery.registerStoredProcedureParameter("ID_KEHOACH_DIEUTRI", Integer.class, ParameterMode.IN);
        procedureQuery.setParameter("ID_KEHOACH_DIEUTRI", idKeHoachDieuTri);

        procedureQuery.execute();
        List<Object[]> objects = procedureQuery.getResultList();
        List<KeHoachDieuTriCuTheDTO> results = new ArrayList<>();
        for (Object[] obj : objects) {
            KeHoachDieuTriCuTheDTO keHoachDieuTriCuTheDTO = new KeHoachDieuTriCuTheDTO();
            keHoachDieuTriCuTheDTO.setTenRang((String) obj[0]);
            keHoachDieuTriCuTheDTO.setTenMat((String) obj[1]);
            keHoachDieuTriCuTheDTO.setTenDieuTri((String) obj[2]);
            keHoachDieuTriCuTheDTO.setPhi((Integer) obj[3]);
            results.add(keHoachDieuTriCuTheDTO);
        }
        return ResponseEntity.ok(results);
    }
}
