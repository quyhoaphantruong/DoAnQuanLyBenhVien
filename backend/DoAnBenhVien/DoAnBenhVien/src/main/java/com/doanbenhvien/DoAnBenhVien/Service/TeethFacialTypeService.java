package com.doanbenhvien.DoAnBenhVien.Service;

import com.doanbenhvien.DoAnBenhVien.DTO.MatDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.RangDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.StoredProcedureQuery;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeethFacialTypeService {
    @Autowired
    EntityManager entityManager;

    public ResponseEntity<List<RangDTO>> xemDanhSachRang() {
        StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("XEM_DANHSACH_RANG");

        procedureQuery.execute();
        List<Object[]> objects = procedureQuery.getResultList();
        List<RangDTO> results = mapObjectListToRangDTO(objects);
        return ResponseEntity.ok(results);
    }

    public ResponseEntity<List<MatDTO>> xemDanhSachMat() {
        StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("XEM_DANHSACH_MAT");
        procedureQuery.execute();
        List<Object[]> objects = procedureQuery.getResultList();
        List<MatDTO> results = new ArrayList<>();
        results = mapObjectListToMatDTO(objects);
        return ResponseEntity.ok(results);
    }
    public List<RangDTO> mapObjectListToRangDTO(List<Object[]> objects) {
        List<RangDTO> results = new ArrayList<>();
        for (Object[] obj : objects) {
            RangDTO dto = new RangDTO();
            dto.setIdRang((Byte) obj[0]);
            dto.setTenRang((String) obj[1]);
            results.add(dto);
        }
        return results;
    }

    public List<MatDTO> mapObjectListToMatDTO(List<Object[]> objects) {
        List<MatDTO> results = new ArrayList<>();
        for (Object[] obj : objects) {
            MatDTO dto = new MatDTO();
            dto.setLoaiMat((Character) obj[0]);
            dto.setTenMat((String) obj[1]);
            results.add(dto);
        }
        return results;
    }
}
