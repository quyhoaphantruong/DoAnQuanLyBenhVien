﻿USE master; 
GO

IF DB_ID('QLPHONGKHAM_CSDLNC') IS NOT NULL
	DROP DATABASE QLPHONGKHAM_CSDLNC
GO

CREATE DATABASE QLPHONGKHAM_CSDLNC
GO

USE QLPHONGKHAM_CSDLNC
GO
CREATE TABLE BENHNHAN
(
	ID_BENHNHAN INT IDENTITY(1,1),
	TEN NVARCHAR(50) NOT NULL,
	GIOITINH NVARCHAR(3) NOT NULL,-- ENUM(N'Nam',N'Nữ')
	EMAIL VARCHAR(30) NOT NULL,
	SODIENTHOAI CHAR(10) NOT NULL,
	NGAYSINH DATE DEFAULT '2003-01-28',
	DIACHI NVARCHAR(50) DEFAULT '',
	TONGTIENTHANHTOAN BIGINT DEFAULT 0, -- tổng tiền đã thanh toán
	TONGTIENCHUATHANHTOAN BIGINT DEFAULT 0, -- tổng tiền điều trị + TỔNG TIỀN ĐƠN THUỐC
	THONGTIN NVARCHAR(500) DEFAULT '',
	TINHTRANG NVARCHAR(10) DEFAULT '',
	CHONGCHIDINH NVARCHAR(150) DEFAULT '',
	PRIMARY KEY(ID_BENHNHAN),
	CHECK(GIOITINH IN (N'Nam', N'Nữ'))
)
GO

CREATE TABLE CUOCHEN
(
	ID_CUOCHEN INT IDENTITY(1,1),
	ID_NHASI INT,
	ID_PHONGKHAM TINYINT,
	ID_BENHNHAN INT,
	TINHTRANG NVARCHAR(11),
	THOIGIAN DATETIME,
	GHICHU NVARCHAR(50),
	PRIMARY KEY(ID_CUOCHEN)
)
GO
CREATE TABLE THONGTIN_THANHTOAN
(
	ID_THONGTIN_THANHTOAN INT IDENTITY(1,1),
	TIENDATRA BIGINT,
	TIENTHOI BIGINT DEFAULT 0,
	NGAYTHANHTOAN DATE DEFAULT GETDATE(),
	NGAYTAO_CAC_CHITIET_DIEUTRI DATE DEFAULT GETDATE(),
	LOAITHANHTOAN NVARCHAR(8) DEFAULT '',--(N'Tiền mặt',N'Online'),
	GHICHU NVARCHAR(50) DEFAULT '',
	TONGTIENTHANHTOAN BIGINT DEFAULT 0,
	ID_KEHOACH_DIEUTRI INT,
	PRIMARY KEY (ID_THONGTIN_THANHTOAN)
)
GO 

CREATE TABLE RANG
(
	ID_RANG TINYINT IDENTITY(1,1),
	TEN_RANG NVARCHAR(25),
	PRIMARY KEY (ID_RANG)
)
GO 

CREATE TABLE MAT
(
	LOAIMAT CHAR(1),
	TENMAT NVARCHAR(20),
	PRIMARY KEY (LOAIMAT)
)
GO

CREATE TABLE QUANLY_THUOC
(
	ID_THUOC INT,
	ID_PHONGKHAM TINYINT,
	SOLUONGTON INT,
	PRIMARY KEY(ID_THUOC, ID_PHONGKHAM)
)
GO 
CREATE TABLE DONTHUOC
(
	ID_DONTHUOC INT IDENTITY(1,1),
	ID_BENHNHAN INT,
	NGAYTAO DATE DEFAULT GETDATE(),
	GHICHU NVARCHAR(50) DEFAULT '',
	BACSIDIEUTRI INT,
	ID_PHONGKHAM INT,
	TONG_CHIPHI INT DEFAULT 0, -- THUỘC TÍNH SUY DIỄN
	PRIMARY KEY (ID_DONTHUOC)
)
GO

CREATE TABLE LICHLAMVIEC
(
	ID_LICHLAMVIEC INT IDENTITY(1,1),
	ID_NHANVIEN INT,
	GIOBATDAU DATETIME,
	GIOKETTHUC DATETIME,
	ID_PHONGKHAM TINYINT,
	PRIMARY KEY(ID_LICHLAMVIEC)
)
GO

CREATE TABLE PHONGKHAM
(
	ID_PHONGKHAM TINYINT IDENTITY(1,1),
	DIACHIPK NVARCHAR(50),
	SDTPK NCHAR(10),
	PRIMARY KEY(ID_PHONGKHAM)
)
GO

CREATE TABLE NHANVIEN
(
	ID_NHANVIEN INT IDENTITY(1,1),
	TEN NVARCHAR(50),
	NGAYSINH DATE,
	DIACHI NVARCHAR(50),
	EMAIL VARCHAR(30),
	SODIENTHOAI CHAR(10),
	LOAINHANVIEN NVARCHAR(13) -- ENUM(Quản trị viên, Lễ Tân, Nha sĩ)
	PRIMARY KEY (ID_NHANVIEN)
)
GO
-- TINYINT TO INT IN ID_DANHMUC
CREATE TABLE DANHMUC_DIEUTRI
(
	ID_DANHMUC_DIEUTRI INT IDENTITY(1,1),
	TENDANHMUC NVARCHAR(30),
	PRIMARY KEY (ID_DANHMUC_DIEUTRI)
)
GO
CREATE TABLE DIEUTRI
(
	ID_DIEUTRI INT IDENTITY(1,1),
	TENDIEUTRI NVARCHAR(30),
	ID_DANHMUC_DIEUTRI TINYINT,
	PHI INT,
	PRIMARY KEY (ID_DIEUTRI)
)
GO

CREATE TABLE TAIKHOAN
(
	DIENTHOAI CHAR(10),
	MATKHAU VARCHAR(20),
	PRIMARY KEY(DIENTHOAI)
)
GO
CREATE TABLE KEHOACH_DIEUTRI
(
	ID_KEHOACH_DIEUTRI INT IDENTITY(1,1),
	CHANDOAN NVARCHAR(100) DEFAULT '',
	NOIDUNG NVARCHAR(100) DEFAULT '',
	TINHTRANGDIEUTRI TINYINT DEFAULT 0, --ENUM( 0 LÀ Kế hoạch, 1 Đã hoàn thành',2 Đã hủy),
	ID_BENHNHAN INT,
	NGAYTAO DATE DEFAULT GETDATE(),
	TONG_CHIPHI INT DEFAULT 0 -- THUỘC TÍNH SUY DIỄN,
	PRIMARY KEY (ID_KEHOACH_DIEUTRI)
)
GO
CREATE TABLE THUOC
(
	ID_THUOC INT IDENTITY(1,1),
	TEN_THUOC NVARCHAR(20),
	PHI INT,
	PRIMARY KEY (ID_THUOC)
)
GO

CREATE TABLE CHITIET_DONTHUOC
(
	ID_DONTHUOC INT,
	ID_THUOC INT,
	SOLUONG INT,
	PRIMARY KEY (ID_DONTHUOC, ID_THUOC)
)
GO
CREATE TABLE THONGTIN_THANHTOAN_DONTHUOC
(
	ID_THONGTIN_THANHTOAN_DONTHUOC INT IDENTITY(1,1),
	TIENDATRA BIGINT DEFAULT 0,
	TIENTHOI BIGINT DEFAULT 0,
	NGAYTHANHTOAN DATE DEFAULT NULL,
	LOAITHANHTOAN NVARCHAR(8),--(N'Tiền mặt',N'Online'),
	GHICHU NVARCHAR(50),
	TONGTIENTHANHTOAN BIGINT DEFAULT 0,
	ID_DONTHUOC INT,
	PRIMARY KEY (ID_THONGTIN_THANHTOAN_DONTHUOC)
)
GO

CREATE TABLE CHITIET_DIEUTRI
(
	ID_DIEUTRI INT,
	ID_KEHOACH_DIEUTRI INT,
	ID_RANG TINYINT,
	LOAIMAT CHAR(1),
	NGAYTAO DATE DEFAULT GETDATE()
	PRIMARY KEY (ID_DIEUTRI, ID_RANG, LOAIMAT, ID_KEHOACH_DIEUTRI)
)
GO

ALTER TABLE CUOCHEN ADD FOREIGN KEY(ID_NHASI) REFERENCES NHANVIEN(ID_NHANVIEN)
ALTER TABLE CUOCHEN ADD FOREIGN KEY(ID_PHONGKHAM) REFERENCES PHONGKHAM(ID_PHONGKHAM)
ALTER TABLE CUOCHEN ADD FOREIGN KEY(ID_BENHNHAN) REFERENCES BENHNHAN(ID_BENHNHAN)

ALTER TABLE QUANLY_THUOC ADD FOREIGN KEY(ID_THUOC) REFERENCES THUOC(ID_THUOC)
ALTER TABLE QUANLY_THUOC ADD FOREIGN KEY(ID_PHONGKHAM) REFERENCES PHONGKHAM(ID_PHONGKHAM)

ALTER TABLE LICHLAMVIEC ADD FOREIGN KEY(ID_NHANVIEN) REFERENCES NHANVIEN(ID_NHANVIEN)
ALTER TABLE LICHLAMVIEC ADD FOREIGN KEY(ID_PHONGKHAM) REFERENCES PHONGKHAM(ID_PHONGKHAM)

ALTER TABLE CHITIET_DIEUTRI ADD FOREIGN KEY(ID_RANG) REFERENCES RANG(ID_RANG)
ALTER TABLE CHITIET_DIEUTRI ADD FOREIGN KEY(LOAIMAT) REFERENCES MAT(LOAIMAT)
ALTER TABLE CHITIET_DIEUTRI ADD FOREIGN KEY(ID_DIEUTRI) REFERENCES DIEUTRI(ID_DIEUTRI)
ALTER TABLE CHITIET_DIEUTRI ADD FOREIGN KEY(ID_KEHOACH_DIEUTRI) REFERENCES KEHOACH_DIEUTRI(ID_KEHOACH_DIEUTRI)

ALTER TABLE NHANVIEN ADD FOREIGN KEY(SODIENTHOAI) REFERENCES TAIKHOAN(DIENTHOAI)
ALTER TABLE BENHNHAN ADD FOREIGN KEY(SODIENTHOAI) REFERENCES TAIKHOAN(DIENTHOAI)

ALTER TABLE DIEUTRI ADD FOREIGN KEY (ID_DANHMUC_DIEUTRI) REFERENCES DANHMUC_DIEUTRI(ID_DANHMUC_DIEUTRI)

ALTER TABLE KEHOACH_DIEUTRI ADD FOREIGN KEY(ID_BENHNHAN) REFERENCES BENHNHAN(ID_BENHNHAN)
ALTER TABLE CHITIET_DONTHUOC ADD FOREIGN KEY(ID_DONTHUOC) REFERENCES DONTHUOC(ID_DONTHUOC)
ALTER TABLE CHITIET_DONTHUOC ADD FOREIGN KEY(ID_THUOC) REFERENCES THUOC(ID_THUOC)

ALTER TABLE DONTHUOC ADD FOREIGN KEY(ID_BENHNHAN) REFERENCES BENHNHAN(ID_BENHNHAN)
ALTER TABLE DONTHUOC ADD FOREIGN KEY(BACSIDIEUTRI) REFERENCES NHANVIEN(ID_NHANVIEN)
ALTER TABLE DONTHUOC ADD FOREIGN KEY(ID_PHONGKHAM) REFERENCES PHONGKHAM(ID_PHONGKHAM)

ALTER TABLE THONGTIN_THANHTOAN ADD FOREIGN KEY(ID_KEHOACH_DIEUTRI) REFERENCES KEHOACH_DIEUTRI(ID_KEHOACH_DIEUTRI)

ALTER TABLE THONGTIN_THANHTOAN_DONTHUOC ADD FOREIGN KEY(ID_DONTHUOC) REFERENCES DONTHUOC(ID_DONTHUOC)
