/* ---------------------------------------------------- */
/*  Generated by Enterprise Architect Version 15.2 		*/
/*  Created On : 28-Dec-2021 9:07:53 PM 				*/
/*  DBMS       : SQL Server 2012 						*/
/* ---------------------------------------------------- */

/* Drop Foreign Key Constraints */
USE master
GO
IF DB_ID('QLBanHoa') is not NULL
	DROP DATABASE QLBanHoa
CREATE DATABASE QLBanHoa
GO
USE QLBanHoa
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_BangGiaSP_SanPham]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [BangGiaSP] DROP CONSTRAINT [FK_BangGiaSP_SanPham]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_BangLuong_NhanVien]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [BangLuong] DROP CONSTRAINT [FK_BangLuong_NhanVien]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_CT_HoaDon_HoaDon]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [CT_HoaDon] DROP CONSTRAINT [FK_CT_HoaDon_HoaDon]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_CT_HoaDon_SanPham]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [CT_HoaDon] DROP CONSTRAINT [FK_CT_HoaDon_SanPham]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_CT_NhapHang_DonNhapHang]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [CT_NhapHang] DROP CONSTRAINT [FK_CT_NhapHang_DonNhapHang]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_CT_NhapHang_SanPham]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [CT_NhapHang] DROP CONSTRAINT [FK_CT_NhapHang_SanPham]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_DonNhapHang_NhanVien]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [DonNhapHang] DROP CONSTRAINT [FK_DonNhapHang_NhanVien]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_HoaDon_GiamGia]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [HoaDon] DROP CONSTRAINT [FK_HoaDon_GiamGia]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_HoaDon_KhachHang]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [HoaDon] DROP CONSTRAINT [FK_HoaDon_KhachHang]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_HoaDon_NhanVien]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [HoaDon] DROP CONSTRAINT [FK_HoaDon_NhanVien]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[FK_NgayLamViec_NhanVien]') AND OBJECTPROPERTY(id, N'IsForeignKey') = 1) 
ALTER TABLE [NgayLamViec] DROP CONSTRAINT [FK_NgayLamViec_NhanVien]
GO

/* Drop Tables */

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[BangGiaSP]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [BangGiaSP]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[BangLuong]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [BangLuong]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[CT_HoaDon]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [CT_HoaDon]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[CT_NhapHang]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [CT_NhapHang]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[DonNhapHang]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [DonNhapHang]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[GiamGia]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [GiamGia]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[HoaDon]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [HoaDon]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[KhachHang]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [KhachHang]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[NgayLamViec]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [NgayLamViec]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[NhanVien]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [NhanVien]
GO

IF EXISTS (SELECT 1 FROM dbo.sysobjects WHERE id = object_id(N'[SanPham]') AND OBJECTPROPERTY(id, N'IsUserTable') = 1) 
DROP TABLE [SanPham]
GO

/* Create Tables */

CREATE TABLE [BangGiaSP]
(
	[MaSP] char(10) NOT NULL,
	[NgayApDung] date NOT NULL,
	[GiaNhap] int NULL,
	[GiaBan] int NULL
)
GO

CREATE TABLE [BangLuong]
(
	[MaNV] char(10) NOT NULL,
	[NgayPhatLuong] date NOT NULL,
	[Luong] int NULL,
	[HieuSuat] float DEFAULT 0,
	[Thuong] int DEFAULT 0
)
GO

CREATE TABLE [CT_HoaDon]
(
	[MaHD] char(10) NOT NULL,
	[STT] int NOT NULL,
	[MaSP] char(10) NULL,
	[SoLuong] int NULL,
	[ThanhTien] int DEFAULT 0
)
GO

CREATE TABLE [CT_NhapHang]
(
	[STT] int NOT NULL,
	[MaDonNhap] char(10) NOT NULL,
	[MaSP] char(10) NULL,
	[SoLuong] int NULL
)
GO

CREATE TABLE [DonNhapHang]
(
	[MaDonNhap] char(10) NOT NULL,
	[NgayNhap] date NULL,
)
GO

CREATE TABLE [GiamGia]
(
	[MaGiamGia] varchar(10) NOT NULL,
	[LoaiGiamGia] bit NULL,
	[SoTienGiam] int NULL,
	[PhanTramGiam] int NULL,
	[NgayHetHan] date NOT NULL
)
GO

CREATE TABLE [HoaDon]
(
	[MaHD] char(10) NOT NULL,
	[NgayLap] date NULL,
	[TenNguoiNhan] nvarchar(50) NULL,
	[DiaChiGiaoHang] nvarchar(100) NULL,
	[LoiNhan] nvarchar(500) NULL,
	[TrangThai] nvarchar(20) NULL,
	[MaKH] char(10) NULL,
	[NVGiaoHang] char(10) NULL,
	[MaGiamGia] varchar(10) NULL,
	[TongTien] int DEFAULT 0
)
GO

CREATE TABLE [KhachHang]
(
	[MaKH] char(10) NOT NULL,
	[TaiKhoan] varchar(50) NOT NULL,
	[HoTen] nvarchar(50) NULL,
	[Email] varchar(50) NULL,
	[SDT] varchar(12) NULL,
	[DiaChi] nvarchar(100) NULL,
)
GO

CREATE TABLE [NgayLamViec]
(
	[MaNV] char(10) NOT NULL,
	[NgayLamViec] date NOT NULL,
	[SoDonGiao] int DEFAULT 0
)
GO

CREATE TABLE [NhanVien]
(
	[MaNV] char(10) NOT NULL,
	[TenNV] nvarchar(50) NULL,
	[MucTieu] int NULL,
	[TaiKhoan] varchar(50) NOT NULL
)
GO

CREATE TABLE [SanPham]
(
	[MaSP] char(10) NOT NULL,
	[TenSP] nvarchar(50) NULL,
	[SoLuongTon] int NULL,
	[LoaiSP] nvarchar(50) NULL,
	[MauSac] nvarchar(50) NULL,
	[ChuDe] nvarchar(50) NULL
)
GO

CREATE TABLE [TaiKhoan]
(
	[TenTK] varchar(50) NOT NULL,
	[MatKhau] varchar(20) NOT NULL,
	[NguoiDung] nvarchar(50) NOT NULL,
	[VaiTro] nvarchar(20) NOT NULL,
	[TrangThai] varchar(10) NOT NULL
)
GO

/* Create Primary Keys, Indexes, Uniques, Checks */

ALTER TABLE [BangGiaSP] 
 ADD CONSTRAINT [PK_BangGiaSP]
	PRIMARY KEY CLUSTERED ([NgayApDung] ASC,[MaSP] ASC)
GO

ALTER TABLE [BangLuong] 
 ADD CONSTRAINT [PK_BangLuong]
	PRIMARY KEY CLUSTERED ([MaNV] ASC,[NgayPhatLuong] ASC)
GO

ALTER TABLE [CT_HoaDon] 
 ADD CONSTRAINT [PK_CT_HoaDon]
	PRIMARY KEY CLUSTERED ([STT] ASC,[MaHD] ASC)
GO

ALTER TABLE [CT_NhapHang] 
 ADD CONSTRAINT [PK_ChiTietNhapHang]
	PRIMARY KEY CLUSTERED ([STT] ASC,[MaDonNhap] ASC)
GO

ALTER TABLE [DonNhapHang] 
 ADD CONSTRAINT [PK_DonNhapHang]
	PRIMARY KEY CLUSTERED ([MaDonNhap] ASC)
GO

ALTER TABLE [GiamGia] 
 ADD CONSTRAINT [PK_GiamGia]
	PRIMARY KEY CLUSTERED ([MaGiamGia] ASC)
GO

ALTER TABLE [HoaDon] 
 ADD CONSTRAINT [PK_HoaDon]
	PRIMARY KEY CLUSTERED ([MaHD] ASC)
GO

ALTER TABLE [KhachHang] 
 ADD CONSTRAINT [PK_KhachHang]
	PRIMARY KEY CLUSTERED ([MaKH] ASC)
GO

ALTER TABLE [NgayLamViec] 
 ADD CONSTRAINT [PK_NgayLamViec]
	PRIMARY KEY CLUSTERED ([MaNV] ASC,[NgayLamViec] ASC)
GO

ALTER TABLE [NhanVien] 
 ADD CONSTRAINT [PK_NhanVien]
	PRIMARY KEY CLUSTERED ([MaNV] ASC)
GO

ALTER TABLE [SanPham] 
 ADD CONSTRAINT [PK_SanPham]
	PRIMARY KEY CLUSTERED ([MaSP] ASC)
GO

ALTER TABLE [TaiKhoan] 
 ADD CONSTRAINT [PK_TaiKhoan]
	PRIMARY KEY CLUSTERED ([TenTK] ASC)
GO
/* Create Foreign Key Constraints */

ALTER TABLE [BangGiaSP] ADD CONSTRAINT [FK_BangGiaSP_SanPham]
	FOREIGN KEY ([MaSP]) REFERENCES [SanPham] ([MaSP]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [BangLuong] ADD CONSTRAINT [FK_BangLuong_NhanVien]
	FOREIGN KEY ([MaNV]) REFERENCES [NhanVien] ([MaNV]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [CT_HoaDon] ADD CONSTRAINT [FK_CT_HoaDon_HoaDon]
	FOREIGN KEY ([MaHD]) REFERENCES [HoaDon] ([MaHD]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [CT_HoaDon] ADD CONSTRAINT [FK_CT_HoaDon_SanPham]
	FOREIGN KEY ([MaSP]) REFERENCES [SanPham] ([MaSP]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [CT_NhapHang] ADD CONSTRAINT [FK_CT_NhapHang_DonNhapHang]
	FOREIGN KEY ([MaDonNhap]) REFERENCES [DonNhapHang] ([MaDonNhap]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [CT_NhapHang] ADD CONSTRAINT [FK_CT_NhapHang_SanPham]
	FOREIGN KEY ([MaSP]) REFERENCES [SanPham] ([MaSP]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [HoaDon] ADD CONSTRAINT [FK_HoaDon_GiamGia]
	FOREIGN KEY ([MaGiamGia]) REFERENCES [GiamGia] ([MaGiamGia]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [HoaDon] ADD CONSTRAINT [FK_HoaDon_KhachHang]
	FOREIGN KEY ([MaKH]) REFERENCES [KhachHang] ([MaKH]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [HoaDon] ADD CONSTRAINT [FK_HoaDon_NhanVien]
	FOREIGN KEY ([NVGiaoHang]) REFERENCES [NhanVien] ([MaNV]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [NgayLamViec] ADD CONSTRAINT [FK_NgayLamViec_NhanVien]
	FOREIGN KEY ([MaNV]) REFERENCES [NhanVien] ([MaNV]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [NhanVien] ADD CONSTRAINT [FK_NhanVien_TaiKhoan]
	FOREIGN KEY ([TaiKhoan]) REFERENCES [TaiKhoan] ([TenTK]) ON DELETE No Action ON UPDATE No Action
GO

ALTER TABLE [KhachHang] ADD CONSTRAINT [FK_KhachHang_TaiKhoan]
	FOREIGN KEY ([TaiKhoan]) REFERENCES [TaiKhoan] ([TenTK]) ON DELETE No Action ON UPDATE No Action
GO