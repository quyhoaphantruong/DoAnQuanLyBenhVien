package com.doanbenhvien.DoAnBenhVien.Service;

import com.doanbenhvien.DoAnBenhVien.DTO.KeHoachDieuTriCuTheDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.KeHoachDieuTriDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.CapNhatKeHoachDieuTriDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.TaoChiTietDieuTriDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.TaoKeHoachDieuTriRequest;

import com.doanbenhvien.DoAnBenhVien.Entity.ChiTietDieuTri;
import com.doanbenhvien.DoAnBenhVien.Repository.ChiTietDieuTriRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TreatmentService {
    @Autowired
    EntityManager entityManager;
    @Autowired
    private DataSource dataSource;
    @Autowired
    private ChiTietDieuTriRepository chiTietDieuTriRepository;

    public ResponseEntity<?> taoKeHoachDieuTri(TaoKeHoachDieuTriRequest taoKeHoachDieuTriRequest) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("THEM_KEHOACH_DIEUTRI");
        query.registerStoredProcedureParameter("NOIDUNG", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("CHANDOAN", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("ID_BENHNHAN", Integer.class, ParameterMode.IN);

        query.registerStoredProcedureParameter("OUTPUT_ID", Integer.class, ParameterMode.OUT);

        query.setParameter("NOIDUNG", taoKeHoachDieuTriRequest.getNoiDung());
        query.setParameter("CHANDOAN", taoKeHoachDieuTriRequest.getChanDoan());
        query.setParameter("ID_BENHNHAN", taoKeHoachDieuTriRequest.getIdBenhNhan());


        try {
            query.execute();
            Integer idKeHoachDieuTri = (Integer) query.getOutputParameterValue("OUTPUT_ID");
            System.out.println(query.getOutputParameterValue("OUTPUT_ID"));
            return ResponseEntity.ok(idKeHoachDieuTri);
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

            return ResponseEntity.ok("Cập nhật thành công");
        } catch (Exception e) {
            // Handle exceptions or log the error
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    public ResponseEntity<?> themChitietDieutri(List<TaoChiTietDieuTriDTO> chitietDieutriList) {
        try {
            // Map DTOs to ChiTietDieuTri entities
            List<ChiTietDieuTri> entities = chitietDieutriList.stream()
                    .map(dto -> new ChiTietDieuTri(
                            dto.getIdDieuTri(),
                            dto.getIdKeHoachDieuTri(),
                            dto.getIdRang(),
                            dto.getLoaiMat()
                    ))
                    .collect(Collectors.toList());
            entities.forEach(System.out::println);
            // Save entities using the repository
            chiTietDieuTriRepository.saveAll(entities);
            return ResponseEntity.ok("Thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    public ResponseEntity<List<KeHoachDieuTriDTO>> xemDsKeHoachDieuTri(Integer idBenhNhan) {
        List<KeHoachDieuTriDTO> resultList = new ArrayList<>();

        try {
            StoredProcedureQuery query = entityManager.createStoredProcedureQuery("XEM_DS_KEHOACH_DIEUTRI");
            query.registerStoredProcedureParameter("ID_BENHNHAN", Integer.class, ParameterMode.IN);
            query.setParameter("ID_BENHNHAN", idBenhNhan);

            List<Object[]> objects = query.getResultList();

            for (Object[] obj : objects) {
                KeHoachDieuTriDTO dto = new KeHoachDieuTriDTO();
                dto.setIdKehoachDieuTri((Integer) obj[0]);
                dto.setChanDoan((String) obj[1]);
                dto.setNoiDung((String) obj[2]);
                dto.setTinhTrangDieuTri((Byte) obj[3]);
                dto.setNgayTao((java.sql.Date) obj[4]);
                dto.setTongChiPhi((Integer) obj[5]);

                resultList.add(dto);
            }
            return ResponseEntity.ok(resultList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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
            keHoachDieuTriCuTheDTO.setNgayTao((Date) obj[4]);
            results.add(keHoachDieuTriCuTheDTO);
        }
        return ResponseEntity.ok(results);
    }

}
