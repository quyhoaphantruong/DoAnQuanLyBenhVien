package com.doanbenhvien.DoAnBenhVien.Service;
import java.util.ArrayList;
import java.util.List;

import com.doanbenhvien.DoAnBenhVien.DTO.DanhMucDieuTriDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.DieuTriDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TreatmentDataService {
    @Autowired
    private EntityManager entityManager;

    public ResponseEntity<List<DanhMucDieuTriDTO>> xemDanhMucDieuTri() {
        StoredProcedureQuery storedProcedure = entityManager.createStoredProcedureQuery("XEM_DANHMUC_DIEUTRI");
        storedProcedure.execute();

        List<Object[]> resultList = storedProcedure.getResultList();
        List<DanhMucDieuTriDTO> dtoList = mapObjectListToDanhMucDieuTriDTO(resultList);

        return  ResponseEntity.ok(dtoList);
    }

    private List<DanhMucDieuTriDTO> mapObjectListToDanhMucDieuTriDTO(List<Object[]> resultList) {
        List<DanhMucDieuTriDTO> results = new ArrayList<>();
        for (Object[] obj : resultList) {
            DanhMucDieuTriDTO dto = new DanhMucDieuTriDTO();
            dto.setIdDanhMucDieuTri((Byte) obj[0]);
            dto.setTenDanhMuc((String) obj[1]);
            results.add(dto);
        }
        return results;
    }

    public ResponseEntity<List<DieuTriDTO>> xemDanhSachDieuTri(Integer idDanhMucDieuTri) {
        StoredProcedureQuery storedProcedure = entityManager.createStoredProcedureQuery("XEM_DIEUTRI");
        storedProcedure.registerStoredProcedureParameter("ID_DANHMUC_DIEUTRI", Integer.class, ParameterMode.IN);
        storedProcedure.setParameter("ID_DANHMUC_DIEUTRI", idDanhMucDieuTri);
        storedProcedure.execute();

        List<Object[]> resultList = storedProcedure.getResultList();
        List<DieuTriDTO> dtoList = mapObjectListToDieuTriDTO(resultList);

        return ResponseEntity.ok(dtoList);
    }

    private List<DieuTriDTO> mapObjectListToDieuTriDTO(List<Object[]> resultList) {
        List<DieuTriDTO> results = new ArrayList<>();
        for (Object[] obj : resultList) {
            DieuTriDTO dto = new DieuTriDTO();
            dto.setIdDieuTri((Integer) obj[0]);
            dto.setTenDieuTri((String) obj[1]);
            dto.setPhi((Integer) obj[3]);
            results.add(dto);
        }
        return results;
    }
}
