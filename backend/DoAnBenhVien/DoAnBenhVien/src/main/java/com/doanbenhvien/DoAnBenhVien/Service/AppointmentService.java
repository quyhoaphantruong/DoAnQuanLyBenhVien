package com.doanbenhvien.DoAnBenhVien.Service;

import com.doanbenhvien.DoAnBenhVien.DTO.CuocHenDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.CuocHenNhaSiDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.NhaSiRanhDTO;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.TaoCuocHenRequest;
import com.doanbenhvien.DoAnBenhVien.DTO.Request.TimNhaSiRanhRequest;
import com.doanbenhvien.DoAnBenhVien.Utils.ErrorHandler;
import jakarta.persistence.*;
import org.apache.catalina.Store;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ssl.PemSslBundleProperties;
import org.springframework.core.PriorityOrdered;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class AppointmentService {
    @Autowired
    EntityManager entityManager;
    @Autowired
    ErrorHandler errorHandler;

    public ResponseEntity<?> xemCacCuocHen() {
        StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("XEM_DS_CUOCHEN");
        procedureQuery.execute();
        List<Object[]> objects = procedureQuery.getResultList();
        List<CuocHenDTO> results = new ArrayList<>();
        for (Object[] obj : objects) {
            CuocHenDTO cuocHenDTO = new CuocHenDTO();
            cuocHenDTO.setIdCuocHen((Integer) obj[0]);
            cuocHenDTO.setTinhTrang((String) obj[1]);
            cuocHenDTO.setThoiGian(((Timestamp) obj[2]).toLocalDateTime());
            cuocHenDTO.setGhiChu((String) obj[3]);
            cuocHenDTO.setIdNhaSi((Integer) obj[4]);
            if (obj[5] == null) {
                cuocHenDTO.setIdTroKham(-1);
            } else {
                cuocHenDTO.setIdTroKham((Integer) obj[5]);
            }
            cuocHenDTO.setIdPhongKham((Byte) obj[6]);
            cuocHenDTO.setIdBenhNhan((Integer) obj[7]);

            results.add(cuocHenDTO);
        }
        return ResponseEntity.ok(results);
    }

    public ResponseEntity<?> taoCuocHen(TaoCuocHenRequest taoCuocHenRequest) {
        StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("TAO_CUOCHEN");
        procedureQuery.registerStoredProcedureParameter("ID_BENHNHAN", String.class, ParameterMode.IN);
        procedureQuery.registerStoredProcedureParameter("ID_NHASI", String.class, ParameterMode.IN);
        procedureQuery.registerStoredProcedureParameter("ID_PHONGKHAM", String.class, ParameterMode.IN);
        procedureQuery.registerStoredProcedureParameter("THOIGIAN", LocalDateTime.class, ParameterMode.IN);
        procedureQuery.registerStoredProcedureParameter("GHICHU", String.class, ParameterMode.IN);
        procedureQuery.registerStoredProcedureParameter("TINHTRANG", String.class, ParameterMode.IN);

        procedureQuery.setParameter("ID_BENHNHAN", taoCuocHenRequest.getIdBenhNhan());
        procedureQuery.setParameter("ID_NHASI", taoCuocHenRequest.getIdNhaSi());
        procedureQuery.setParameter("ID_PHONGKHAM", taoCuocHenRequest.getIdPhongKham());
        procedureQuery.setParameter("THOIGIAN", taoCuocHenRequest.getThoiGian());
        procedureQuery.setParameter("GHICHU", taoCuocHenRequest.getGhiChu());
        procedureQuery.setParameter("TINHTRANG", taoCuocHenRequest.getTinhTrang());

        try {
            procedureQuery.execute();
            return ResponseEntity.ok("Lịch hẹn đã được tạo thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    errorHandler.getMessageError(e.getMessage())
            );
        }
    }

    public ResponseEntity<?> timNhaSiRanh(TimNhaSiRanhRequest timNhaSiRanhRequest) {
        try {
            String queryStr = "DECLARE @DS_NHASI TABLE (\n" +
                    "        ID_NHANVIEN INT,\n" +
                    "\t\tTEN NVARCHAR(50)\n" +
                    "    );\n" +
                    "\n" +
                    "\tDECLARE @GIO_KETTHUC DATETIME;\n" +
                    "\tSELECT @GIO_KETTHUC = DATEADD(HOUR, 1, :GIO_BATDAU)\n" +
                    "\n" +
                    "    INSERT INTO @DS_NHASI (ID_NHANVIEN, TEN)\n" +
                    "    SELECT NV.ID_NHANVIEN, NV.TEN\n" +
                    "    FROM NHANVIEN NV\n" +
                    "    JOIN LICHLAMVIEC LLV ON LLV.ID_NHANVIEN = NV.ID_NHANVIEN\n" +
                    "\tWHERE NV.LOAINHANVIEN = N'Nha sĩ'\n" +
                    "\tAND LLV.GIOBATDAU <= :GIO_BATDAU AND LLV.GIOKETTHUC >= :GIO_BATDAU\n" +
                    "\tAND NV.ID_NHANVIEN NOT IN (\n" +
                    "        SELECT CH.ID_NHASI\n" +
                    "        FROM CUOCHEN CH\n" +
                    "        WHERE CH.THOIGIAN >= :GIO_BATDAU AND DATEADD(HOUR, 1, CH.THOIGIAN) <= @GIO_KETTHUC\n" +
                    "    );\n" +
                    "\n" +
                    "    SELECT DS.ID_NHANVIEN, DS.TEN, 1 AS DA_KHAM\n" +
                    "    FROM @DS_NHASI DS WHERE DS.ID_NHANVIEN IN \n" +
                    "\t(SELECT CH.ID_NHASI FROM CUOCHEN CH WHERE CH.ID_BENHNHAN = :ID_BENHNHAN)\n" +
                    "\tUNION\n" +
                    "\tSELECT DS.ID_NHANVIEN, DS.TEN, 0 AS DA_KHAM\n" +
                    "\tFROM @DS_NHASI DS WHERE DS.ID_NHANVIEN NOT IN\n" +
                    "\t(SELECT CH.ID_NHASI FROM CUOCHEN CH WHERE CH.ID_BENHNHAN = :ID_BENHNHAN)";

            Query query = entityManager.createNativeQuery(queryStr);
            query.setParameter("ID_BENHNHAN", timNhaSiRanhRequest.getIdBenhNhan());
            query.setParameter("GIO_BATDAU", timNhaSiRanhRequest.getGioBatDau());
            List<Object[]> objects = query.getResultList();
            List<NhaSiRanhDTO> results = new ArrayList<>();
            for (Object[] obj : objects) {
                NhaSiRanhDTO dto = new NhaSiRanhDTO();
                dto.setIdNhanVien((Integer) obj[0]);
                dto.setTen((String) obj[1]);
                dto.setDaKham((Integer) obj[2]);
                results.add(dto);
            }
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Lỗi hệ thống");
        }
    }
    public ResponseEntity<?> xoaCuocHen(Integer idCuocHen) {
        StoredProcedureQuery procedureQuery = entityManager.createStoredProcedureQuery("XOA_CUOCHEN");
        procedureQuery.registerStoredProcedureParameter("ID_CUOCHEN", Integer.class, ParameterMode.IN);
        procedureQuery.setParameter("ID_CUOCHEN", idCuocHen);

        try{
            procedureQuery.execute();
            return ResponseEntity.ok("Xoá cuộc hẹn thành công");
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    public ResponseEntity<?> xemCuocHenNhaSi(Integer idNhaSi) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("CUOCHEN_NHASI");
        query.registerStoredProcedureParameter("ID_NHASI", Integer.class, ParameterMode.IN);
        query.setParameter("ID_NHASI", idNhaSi);
        try {
            query.execute();
            List<Object[]> objects = query.getResultList();
            List<CuocHenNhaSiDTO> cuocHenNhaSiDTOS = new ArrayList<>();
            for (Object[] obj : objects) {
                CuocHenNhaSiDTO cuocHenNhaSiDTO = new CuocHenNhaSiDTO();
                cuocHenNhaSiDTO.setIdCuocHen((Integer) obj[0]);
                cuocHenNhaSiDTO.setIdPhongKham((Byte) obj[1]);
                cuocHenNhaSiDTO.setIdBenhNhan((Integer) obj[2]);
                cuocHenNhaSiDTO.setTinhTrang((String) obj[3]);
                cuocHenNhaSiDTO.setGhiChu((String) obj[4]);
                cuocHenNhaSiDTO.setThoiGian((Timestamp) obj[5]);
                cuocHenNhaSiDTOS.add(cuocHenNhaSiDTO);
            }
            return ResponseEntity.ok(cuocHenNhaSiDTOS);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
