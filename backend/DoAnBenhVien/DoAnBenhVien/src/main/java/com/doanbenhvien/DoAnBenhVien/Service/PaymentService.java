package com.doanbenhvien.DoAnBenhVien.Service;

import com.doanbenhvien.DoAnBenhVien.DTO.*;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.TaoThanhToanDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private EntityManager entityManager;

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PaymentService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

//    public ResponseEntity<List<ThanhToanChuaTraDTO>> xemThongTinThanhToan(int patientId) {
//        StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("XEM_DS_THANHTOAN");
//        procedureQuery.registerStoredProcedureParameter("ID_BENHNHAN", Integer.class, ParameterMode.IN);
//        procedureQuery.setParameter("ID_BENHNHAN", patientId);
//
//        List<Object[]> objects = procedureQuery.getResultList();
//        List<ThanhToanChuaTraDTO> results = new ArrayList<>();
//
//        for (Object[] obj : objects) {
//            ThanhToanChuaTraDTO thongTinThanhToanDTO = new ThanhToanChuaTraDTO();
//            thongTinThanhToanDTO.setIdThongTinThanhToan((Integer) obj[0]);
//            thongTinThanhToanDTO.setTienDaTra((Double) obj[1]);
//            thongTinThanhToanDTO.setTienThoi((Double) obj[2]);
//            thongTinThanhToanDTO.setLoaiThanhToan((String) obj[3]);
//            thongTinThanhToanDTO.setGhiChu((String) obj[4]);
//            thongTinThanhToanDTO.setChanDoan((String) obj[5]);
//            thongTinThanhToanDTO.setNoiDung((String) obj[6]);
//            thongTinThanhToanDTO.setTinhTrangDieuTri((Integer) obj[7]);
//            thongTinThanhToanDTO.setTongChiPhi((Double) obj[8]);
//            results.add(thongTinThanhToanDTO);
//        }
//
//        return ResponseEntity.ok(results);
//    }

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


    public ResponseEntity<?> xemThanhToanChuaTra(int idBenhNhan) {
        StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("XEM_THANHTOAN_CHUATRA");
        procedureQuery.registerStoredProcedureParameter("ID_BENHNHAN", Integer.class, ParameterMode.IN);
        procedureQuery.setParameter("ID_BENHNHAN", idBenhNhan);

        ThanhToanChuaTraDTO resultDTO = new ThanhToanChuaTraDTO();
        try {
            procedureQuery.execute();
            List<Object[]> thongTinThanhToanDieuTri = procedureQuery.getResultList();

            List<ThanhToanDieuTriChuaTraDTO> dieuTriChuaTraList = new ArrayList<>();
            for (Object[] obj : thongTinThanhToanDieuTri) {
                ThanhToanDieuTriChuaTraDTO dto = new ThanhToanDieuTriChuaTraDTO();
                dto.setIdThongTinThanhToan((Integer) obj[0]);
                dto.setTongTienThanhToan((Long) obj[1]);
                dto.setChanDoan((String) obj[2]);
                dto.setNoiDung((String) obj[3]);
                dto.setNgayTao((Date) obj[4]);
                dieuTriChuaTraList.add(dto);
            }
            List<Object[]> thongTinThanhToanDonThuoc = new ArrayList<>();
            if (procedureQuery.hasMoreResults()) {
                thongTinThanhToanDonThuoc = procedureQuery.getResultList();
            }
            List<ThanhToanDonThuocChuaTraDTO> donThuocChuaTraList = new ArrayList<>();
            for (Object[] obj : thongTinThanhToanDonThuoc) {
                ThanhToanDonThuocChuaTraDTO dto = new ThanhToanDonThuocChuaTraDTO();
                dto.setIdThongTinThanhToan((Integer) obj[0]);
                dto.setTongTienThanhToan((Long) obj[1]);
                dto.setNgayTao((Date) obj[2]);
                dto.setTenBacSi((String) obj[3]);
                donThuocChuaTraList.add(dto);
            }

            resultDTO.setThanhToanDieuTriChuaTraDTOList(dieuTriChuaTraList);
            resultDTO.setThanhToanDonThuocChuaTraDTOList(donThuocChuaTraList);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(resultDTO);
    }

    public ResponseEntity<?> thanhToanDieuTri(ThongTinThanhToanDieuTriDTO thongTinThanhToanDieuTriDTO) {
        System.out.println(thongTinThanhToanDieuTriDTO);
        try {
            jdbcTemplate.update(
                    "EXEC THANHTOAN_KEHOACH_DIEUTRI ?, ?, ?, ?, ?, ?",
                    thongTinThanhToanDieuTriDTO.getIdThongTinThanhToan(),
                    thongTinThanhToanDieuTriDTO.getTienDaTra(),
                    thongTinThanhToanDieuTriDTO.getTienThoi(),
                    thongTinThanhToanDieuTriDTO.getTongTienThanhToan(),
                    thongTinThanhToanDieuTriDTO.getLoaiThanhToan(),
                    thongTinThanhToanDieuTriDTO.getGhiChu()
            );
            return ResponseEntity.ok("Thanh toán thành công");
        } catch (Exception ex) {
            ex.printStackTrace();
            ResponseEntity.internalServerError().body(ex.getMessage());
        }
        return ResponseEntity.internalServerError().body("Lỗi hệ thống");
    }

    public ResponseEntity<?> thanhToanDonThuoc(ThongTinThanhToanDieuTriDTO thongTinThanhToanDieuTriDTO) {
        System.out.println(thongTinThanhToanDieuTriDTO);
        try {
            jdbcTemplate.update(
                    "EXEC THANHTOAN_DONTHUOC ?, ?, ?, ?, ?, ?",
                    thongTinThanhToanDieuTriDTO.getIdThongTinThanhToan(),
                    thongTinThanhToanDieuTriDTO.getTienDaTra(),
                    thongTinThanhToanDieuTriDTO.getTienThoi(),
                    thongTinThanhToanDieuTriDTO.getTongTienThanhToan(),
                    thongTinThanhToanDieuTriDTO.getLoaiThanhToan(),
                    thongTinThanhToanDieuTriDTO.getGhiChu()
            );
            return ResponseEntity.ok("Thanh toán thành công");
        } catch (Exception ex) {
            ex.printStackTrace();
            ResponseEntity.internalServerError().body(ex.getMessage());
        }
        return ResponseEntity.internalServerError().body("Lỗi hệ thống");
    }

    public ResponseEntity<?> xemTongTienThanhToan(Integer idThongTinThanhToan) {
        String sql = "EXEC XEM_TONGTIENTHANHTOAN_THONGTIN_THANHTOAN ?";

        try {
            ThongTinThanhToanDTO result = jdbcTemplate.queryForObject(
                    sql,
                    new Object[]{idThongTinThanhToan},
                    (rs, rowNum) -> {
                        ThongTinThanhToanDTO thongTin = new ThongTinThanhToanDTO();
                        thongTin.setIdThongTinThanhToan(rs.getInt("ID_THONGTIN_THANHTOAN"));
                        thongTin.setTongTienThanhToan(rs.getLong("TONGTIENTHANHTOAN"));
                        return thongTin;
                    }
            );
            return ResponseEntity.ok(result);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }
}
