use QLBanHoa
go

drop trigger trg_HieuSuat
drop trigger trg_ThanhTien_HD
drop trigger trg_TongTien_HD
drop trigger trg_ThanhTien_NH
drop trigger trg_TongTien_NH
drop trigger trg_TenND
drop trigger trg_TenKH
drop trigger trg_TenNV
go

create trigger trg_HieuSuat
on NgayLamViec for insert, update
as
begin
	if UPDATE(SoDonGiao)
	begin
		declare @MaNV as char(10) = (select MaNV from inserted)
		declare @Thang as int = month((select NgayLamViec from inserted))
		declare @TongSoHD as int = (select sum(SoDonGiao) from NgayLamViec
									where MaNV = @MaNV and datepart(month, NgayLamViec) = @Thang)
		declare @HieuSuat as float = cast(@TongSoHD as float)/cast((select MucTieu from NhanVien where MaNV = @MaNV) as float)
		set @HieuSuat = round(@HieuSuat, 2)
		update BangLuong
		set HieuSuat = @HieuSuat where  MaNV = @MaNV and month(NgayPhatLuong) = @Thang
	end
end
go

create trigger trg_ThanhTien_HD
on CT_HoaDon
for insert, update
as
begin
	if UPDATE(SoLuong)
	begin
		declare @MaSP as char(10) = (select MaSP from inserted)
		declare @MaHD as char(10) = (select MaHD from inserted)
		declare @GiaBan as int = (select GiaBan from BangGiaSP 
								where MaSP = @MaSP and NgayApDung = (select max(NgayApDung) from BangGiaSP 
																	where MaSP = @MaSP))
		update CT_HoaDon
		set ThanhTien = SoLuong * @GiaBan
		where MaSP = @MaSP and MaHD = @MaHD
	end
end
go

create trigger trg_TongTien_HD
on CT_HoaDon
for insert, update, delete
as
begin
	declare @MaHD as char(10) 
	declare @MaGiamGia as varchar(10)
	declare @LoaiGiamGia as bit
	declare @GiaGiam as int = 0
	declare @TongTien as int
	if UPDATE(ThanhTien) or UPDATE(MaHD)
	begin
		set @MaHD = (select MaHD from HoaDon where exists (select * from inserted i where i.MaHD = HoaDon.MaHD))
		set @TongTien = (select SUM(ThanhTien) from CT_HoaDon where MaHD = @MaHD)
		if (select MaGiamGia from HoaDon where MaHD = @MaHD) is not null
		begin
			set @MaGiamGia = (select MaGiamGia from HoaDon where MaHD = @MaHD)
			set @LoaiGiamGia = (select LoaiGiamGia from GiamGia where MaGiamGia = @MaGiamGia)
			if @LoaiGiamGia = 0 set @GiaGiam = (select SoTienGiam from GiamGia where MaGiamGia = @MaGiamGia)
			else set @GiaGiam = @TongTien *
			(select PhanTramGiam from GiamGia where MaGiamGia = @MaGiamGia)/100
		end
		update HoaDon
		set TongTien = @TongTien - @GiaGiam
		where exists (select * from inserted i where i.MaHD = HoaDon.MaHD)
	end
	else
	begin
		set @MaHD = (select MaHD from HoaDon where exists (select * from deleted d where d.MaHD = HoaDon.MaHD))
		set @TongTien = (select SUM(ThanhTien) from CT_HoaDon where MaHD = @MaHD)
		if (select MaGiamGia from HoaDon where MaHD = @MaHD) is not null
		begin
			set @MaGiamGia = (select MaGiamGia from HoaDon where MaHD = @MaHD)
			set @LoaiGiamGia = (select LoaiGiamGia from GiamGia where MaGiamGia = @MaGiamGia)
			if @LoaiGiamGia = 0 set @GiaGiam = (select SoTienGiam from GiamGia where MaGiamGia = @MaGiamGia)
			else set @GiaGiam = @TongTien *
			(select PhanTramGiam from GiamGia where MaGiamGia = @MaGiamGia)/100
		end
		update HoaDon
		set TongTien = @TongTien - @GiaGiam
		where exists (select * from deleted d where d.MaHD = HoaDon.MaHD)
	end
end
go

create trigger trg_ThanhTien_NH
on CT_NhapHang
for insert, update
as
begin
	if UPDATE(SoLuong)
	begin
		declare @MaSP as char(10) = (select MaSP from inserted)
		declare @MaDN as char(10) = (select MaDonNhap from inserted)
		declare @GiaNhap as int = (select GiaNhap from BangGiaSP 
								where MaSP = @MaSP and NgayApDung = (select max(NgayApDung) from BangGiaSP 
																	where MaSP = @MaSP))
		update CT_NhapHang
		set ThanhTien = SoLuong * @GiaNhap
		where MaSP = @MaSP and MaDonNhap = @MaDN
	end
end
go

create trigger trg_TongTien_NH
on CT_NhapHang
for insert, update, delete
as
begin
	declare @MaDN as char(10) 
	declare @TongTien as int
	if UPDATE(ThanhTien) or UPDATE(MaDonNhap)
	begin
		set @MaDN = (select MaDonNhap from DonNhapHang where exists (select * from inserted i where i.MaDonNhap = DonNhapHang.MaDonNhap))
		set @TongTien = (select SUM(ThanhTien) from CT_NhapHang where MaDonNhap = @MaDN)
		update DonNhapHang
		set TongTien = @TongTien
		where exists (select * from inserted i where i.MaDonNhap = DonNhapHang.MaDonNhap)
	end
	else
	begin
		set @MaDN = (select MaDonNhap from DonNhapHang where exists (select * from deleted d where d.MaDonNhap = DonNhapHang.MaDonNhap))
		set @TongTien = (select SUM(ThanhTien) from CT_NhapHang where MaDonNhap = @MaDN)
		update DonNhapHang
		set TongTien = @TongTien
		where exists (select * from deleted d where d.MaDonNhap = DonNhapHang.MaDonNhap)
	end
end
go


create trigger trg_TenND
on TaiKhoan
for insert, update
as
begin
	if UPDATE(NguoiDung)
		declare @TK as varchar(50) = (select TenTK from inserted)
		declare @VaiTro as nvarchar(50) = (select VaiTro from inserted)
		declare @Ten as nvarchar(50) = (select NguoiDung from inserted)
	if @VaiTro like N'Kh??ch H??ng'
		update KhachHang
		set HoTen = @Ten
	if @VaiTro like N'Nh??n Vi??n'
		update NhanVien
		set TenNV = @Ten
end
go


create trigger trg_TenKH
on KhachHang
for insert, update
as
begin
	if UPDATE(TaiKhoan)
	begin
		declare @MaKH as char(10) = (select MaKH from inserted)
		declare @TK as varchar(50) = (select TaiKhoan from inserted)
		declare @Ten as nvarchar(50) = (select NguoiDung from TaiKhoan where TenTK = @TK)
		update KhachHang
		set HoTen = @Ten where MaKH = @MaKH
	end
end
go

create trigger trg_TenNV
on NhanVien
for insert, update
as
begin
	if UPDATE(TaiKhoan)
	begin
		declare @MaNV as char(10) = (select MaNV from inserted)
		declare @TK as varchar(50) = (select TaiKhoan from inserted)
		declare @Ten as nvarchar(50) = (select NguoiDung from TaiKhoan where TenTK = @TK)
		update NhanVien
		set TenNV = @Ten where MaNV = @MaNV
	end
end
go
