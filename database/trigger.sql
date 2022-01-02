use QLBanHoa
go

create trigger trg_HieuSuat
on NgayLamViec for insert, update
as
begin
	if UPDATE(SoDonGiao)
	begin
		declare @MaNV as char(10) = (select MaNV from inserted)
		--declare @Thang as int = month((select NgayLamViec from inserted))
		declare @TongSoHD as int = (select sum(SoDonGiao) from NgayLamViec
									where MaNV = @MaNV and datepart(month, NgayLamViec) = month(getdate()))
		declare @HieuSuat as float = @TongSoHD/(select MucTieu from NhanVien where MaNV = @MaNV)
		update NhanVien
		set HieuSuat = @HieuSuat where  MaNV = @MaNV
	end
end
go

create trigger trg_ThanhTien
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

create trigger trg_TongTien
on CT_HoaDon
after insert, update, delete
as
begin
	declare @MaHD as char(10) = NULL
	if UPDATE(ThanhTien) or UPDATE(MaHD)
		set @MaHD = (select MaHD from inserted)
	else 
		set @MaHD = (select MaHD from deleted)

	declare @MaGiamGia as varchar(10) = (select MaGiamGia from HoaDon where MaHD = @MaHD)
	declare @GiaGiam as int = (select SoTienGiam from GiamGia where MaGiamGia = @MaGiamGia)
							+ (select PhanTramGiam from GiamGia where MaGiamGia = @MaGiamGia)/100
	update HoaDon
	set TongTien = (select (SUM(ThanhTien) - @GiaGiam) from CT_HoaDon where MaHD = @MaHD) 
	where MaHD = @MaHD
end
go

create trigger trg_TenND
on TaiKhoan
after insert, update
as
begin
	if UPDATE(NguoiDung)
		declare @TK as varchar(50) = (select TenTK from inserted)
		declare @VaiTro as nvarchar(50) = (select VaiTro from inserted)
		declare @Ten as nvarchar(50) = (select NguoiDung from inserted)
	if @VaiTro like N'Khách Hàng'
		update KhachHang
		set HoTen = @Ten
	if @VaiTro like N'Nhân Viên'
		update NhanVien
		set TenNV = @Ten
end
