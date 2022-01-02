use QLBanHoa
go

create function f_Auto_MaKH() 
returns char(10)
AS
begin
	declare @MaKH as varchar(10) ='00000001'
	while(exists(SELECT*
				 FROM KhachHang
				 WHERE MaKH ='KH'+ @MaKH))
		BEGIN
			SET @MaKH = @MaKH+1
			SET @MaKH=REPLICATE('0',8-LEN(RTRIM(CONVERT(varchar(10),@MaKH)))) + CONVERT(varchar(10),@MaKH)
		END
	set @MaKH = 'KH' + @MaKH
	return @MaKH
end
go

create function f_Auto_MaSP() 
returns char(10)
AS
begin
	declare @MaSP as varchar(10) ='00000001'
	while(exists(SELECT*
				 FROM SanPham
				 WHERE MaSP ='SP'+ @MaSP))
		BEGIN
			SET @MaSP = @MaSP + 1
			SET @MaSP=REPLICATE('0',8-LEN(RTRIM(CONVERT(varchar(10),@MaSP)))) + CONVERT(varchar(10),@MaSP)
		END
	set @MaSP = 'SP' + @MaSP
	return @MaSP
end
go

create function f_Auto_MaQua() 
returns char(10)
AS
begin
	declare @MaQT as varchar(10) ='00000001'
	while(exists(SELECT*
				 FROM SanPham
				 WHERE MaSP ='QT'+ @MaQT))
		BEGIN
			SET @MaQT = @MaQT + 1
			SET @MaQT=REPLICATE('0',8-LEN(RTRIM(CONVERT(varchar(10),@MaQT)))) + CONVERT(varchar(10),@MaQT)
		END
	set @MaQT = 'QT' + @MaQT
	return @MaQT
end
go

create function f_Auto_MaHD() 
returns char(10)
AS
begin
	declare @MaHD as varchar(10) ='00000001'
	while(exists(SELECT*
				 FROM HoaDon
				 WHERE MaHD ='HD'+ @MaHD))
		BEGIN
			SET @MaHD = @MaHD + 1
			SET @MaHD=REPLICATE('0',8-LEN(RTRIM(CONVERT(varchar(10),@MaHD)))) + CONVERT(varchar(10),@MaHD)
		END
	set @MaHD = 'HD' + @MaHD
	return @MaHD
end
go

create function f_Auto_MaNV() 
returns char(10)
AS
begin
	declare @MaNV as varchar(10) ='00000001'
	while(exists(SELECT*
				 FROM NhanVien
				 WHERE MaNV ='NV'+ @MaNV))
		BEGIN
			SET @MaNV = @MaNV+1
			SET @MaNV=REPLICATE('0',8-LEN(RTRIM(CONVERT(varchar(10),@MaNV)))) + CONVERT(varchar(10),@MaNV)
		END
	set @MaNV = 'NV' + @MaNV
	return @MaNV
end
go

create function f_Auto_MaDN() 
returns char(10)
AS
begin
	declare @MaDN as varchar(10) ='00000001'
	while(exists(SELECT*
				 FROM DonNhapHang
				 WHERE MaDonNhap ='DN'+ @MaDN))
		BEGIN
			SET @MaDN = @MaDN + 1
			SET @MaDN=REPLICATE('0',8-LEN(RTRIM(CONVERT(varchar(10),@MaDN)))) + CONVERT(varchar(10),@MaDN)
		END
	set @MaDN = 'DN' + @MaDN
	return @MaDN
end
go

create function f_Auto_STT_NhapHang(@MaHD char(10)) 
returns char(10)
AS
begin
	declare @STT as int = (select max(STT) from CT_HoaDon where MaHD = @MaHD)
	return @STT
end
go