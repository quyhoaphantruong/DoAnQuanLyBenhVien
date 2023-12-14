package com.doanbenhvien.DoAnBenhVien.Service;

import com.doanbenhvien.DoAnBenhVien.DTO.Request.TaoThanhToanDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.ThongTinThanhToanDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.XemThanhToanChuaTraDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private EntityManager entityManager;

    public ResponseEntity<List<ThongTinThanhToanDTO>> xemThongTinThanhToan(int patientId) {
        StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("XEM_DS_THANHTOAN");
        procedureQuery.registerStoredProcedureParameter("ID_BENHNHAN", Integer.class, ParameterMode.IN);
        procedureQuery.setParameter("ID_BENHNHAN", patientId);

        List<Object[]> objects = procedureQuery.getResultList();
        List<ThongTinThanhToanDTO> results = new ArrayList<>();

        for (Object[] obj : objects) {
            ThongTinThanhToanDTO thongTinThanhToanDTO = new ThongTinThanhToanDTO();
            thongTinThanhToanDTO.setIdThongTinThanhToan((Integer) obj[0]);
            thongTinThanhToanDTO.setTienDaTra((Double) obj[1]);
            thongTinThanhToanDTO.setTienThoi((Double) obj[2]);
            thongTinThanhToanDTO.setLoaiThanhToan((String) obj[3]);
            thongTinThanhToanDTO.setGhiChu((String) obj[4]);
            thongTinThanhToanDTO.setChanDoan((String) obj[5]);
            thongTinThanhToanDTO.setNoiDung((String) obj[6]);
            thongTinThanhToanDTO.setTinhTrangDieuTri((Integer) obj[7]);
            thongTinThanhToanDTO.setTongChiPhi((Double) obj[8]);
            results.add(thongTinThanhToanDTO);
        }

        return ResponseEntity.ok(results);
    }

    public ResponseEntity<?> taoThanhToan(TaoThanhToanDTO taoThanhToanDTO) {
        StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("TAO_THONGTIN_THANHTOAN");
        procedureQuery.registerStoredProcedureParameter("ID_BENHNHAN", Integer.class, ParameterMode.IN);
        procedureQuery.registerStoredProcedureParameter("TIENDATRA", Long.class, ParameterMode.IN);
        procedureQuery.registerStoredProcedureParameter("TIENTHOI", Long.class, ParameterMode.IN);
        procedureQuery.registerStoredProcedureParameter("LOAITHANHTOAN", String.class, ParameterMode.IN);
        procedureQuery.registerStoredProcedureParameter("GHICHU", String.class, ParameterMode.IN);
        procedureQuery.registerStoredProcedureParameter("TONGTIENTHANHTOAN", Long.class, ParameterMode.IN);
        procedureQuery.registerStoredProcedureParameter("ID_KEHOACH_DIEUTRI", Integer.class, ParameterMode.IN);

        procedureQuery.setParameter("ID_BENHNHAN", taoThanhToanDTO.getIdBenhNhan());
        procedureQuery.setParameter("TIENDATRA", taoThanhToanDTO.getTienDaTra());
        procedureQuery.setParameter("TIENTHOI", taoThanhToanDTO.getTienThoi());
        procedureQuery.setParameter("LOAITHANHTOAN", taoThanhToanDTO.getLoaiThanhToan());
        procedureQuery.setParameter("GHICHU", taoThanhToanDTO.getGhiChu());
        procedureQuery.setParameter("TONGTIENTHANHTOAN", taoThanhToanDTO.getTongTienThanhToan());
        procedureQuery.setParameter("ID_KEHOACH_DIEUTRI", taoThanhToanDTO.getIdKeHoachDieuTri());
        try {
            procedureQuery.execute();
            return ResponseEntity.ok("Thanh toán thành công");
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Lỗi hệ thống");
        }
    }

    public ResponseEntity<List<XemThanhToanChuaTraDTO>> xemThanhToanChuaTra(int idBenhNhan) {
        StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("XEM_THANHTOAN_CHUATRA");
        procedureQuery.registerStoredProcedureParameter("ID_BENHNHAN", Integer.class, ParameterMode.IN);
        procedureQuery.setParameter("ID_BENHNHAN", idBenhNhan);

        List<XemThanhToanChuaTraDTO> results = new ArrayList<>();
        try {
            List<Object[]> objects = procedureQuery.getResultList();
            for (Object[] obj : objects) {
                XemThanhToanChuaTraDTO dto = new XemThanhToanChuaTraDTO();
                dto.setIdKeHoachDieuTri((Integer) obj[0]);
                dto.setTienConThieu((Long) obj[1]);
                results.add(dto);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(results);
    }

}
