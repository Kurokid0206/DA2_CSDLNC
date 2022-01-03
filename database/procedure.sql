use QLBanHoa
go

drop proc sp_Insert_KhackHang 
drop procedure sp_Insert_SanPham
drop procedure sp_Insert_NV
drop procedure sp_NV_DiemDanh
drop proc sp_NV_NhanDon
drop proc sp_NV_XacNhanHD
drop proc sp_PhatLuong
drop proc sp_XemBL
drop proc sp_Insert_GiamGia
drop proc sp_XemCTBL
drop proc sp_XemDoanhThu_NV
drop proc sp_Xem_CTDoanhThu_NV
drop procedure sp_Get_HieuSuat
drop proc sp_XemDoanhThu_SP
drop proc sp_XemSL
drop proc sp_Login
drop proc sp_Disable_Enable_Login
drop proc sp_Insert_HD
drop proc sp_Insert_CTHD
drop proc sp_XemDoanhThu_2SP
go

create procedure sp_Insert_KhackHang 
	@MaKH char(10) output,
	@HoTen nvarchar(50), 
	@SDT varchar(12), 
	@DiaChi nvarchar(100), 
	@Email varchar(50),
	@TK varchar(50),
	@MK varchar(50)
as	
begin tran
	begin try
		insert into TaiKhoan values(@TK,@MK,@HoTen,N'Khách Hàng','Enabled')
		set @MaKH = dbo.f_Auto_MaKH()
		insert into KhachHang(MaKH, HoTen, SDT, DiaChi, Email, TaiKhoan)
		values (@MaKH, @HoTen, @SDT, @DiaChi, @Email, @TK)
	end try
	begin catch
		select  error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;
go

create procedure sp_Insert_SanPham
	@MaSP char(10) output,
    @TenSP nvarchar(50),
    @SL int,
	@LoaiSP nvarchar(50),
	@Mau nvarchar(50),
	@ChuDe nvarchar(100)
as
begin tran
	begin try
		set @MaSP = dbo.f_Auto_MaSP()
		insert into SanPham
		values(@MaSP, @TenSP, @SL, @LoaiSP, @Mau, @ChuDe)
	end try
	begin catch
		select  error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;
go

create procedure sp_Insert_NV
	@MaNV char(10) output,
	@HoTen nvarchar(50), 
	@MucTieu int, 
	@TK varchar(50),
	@MK varchar(50)
as	
begin tran
	begin try
		insert into TaiKhoan values(@TK,@MK,@HoTen,N'Nhân Viên','Enabled')
		set @MaNV = dbo.f_Auto_MaNV()
		insert into NhanVien(MaNV,TenNV,MucTieu,TaiKhoan)
		values (@MaNV,@HoTen,@MucTieu,@TK)
	end try
	begin catch
		select  error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;
go

create procedure sp_NV_DiemDanh
	@MaNV char(10)
as	
begin tran
	begin try
		insert into NgayLamViec(MaNV, NgayLamViec) values (@MaNV, GETDATE())
	end try
	begin catch
		select  error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;
go

create proc sp_NV_NhanDon
	@MaNV char(10),
	@MaHD char(10)
as	
begin tran
	begin try
		if (select TrangThai from HoaDon where MaHD = @MaHD) = N'Chưa Giao'
			update HoaDon
			set NVGiaoHang = @MaNV, TrangThai = 'Đang Giao' where MaHD = @MaNV
	end try
	begin catch
		select  error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;
go

create proc sp_NV_XacNhanHD
	@MaNV char(10),
	@MaHD char(10)
as	
begin tran
	begin try
		update HoaDon
		set TrangThai = 'Đã Giao' where MaHD = @MaNV
		update NgayLamViec
		set SoDonGiao = SoDonGiao + 1 where MaNV = @MaNV and NgayLamViec = GETDATE()
	end try
	begin catch
		select  error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;
go

create proc sp_PhatLuong
	@MaNV char(10),
	@Luong int
as	
begin tran
	begin try
		if exists (select * from BangLuong BL where datediff(month,getdate(),BL.NgayPhatLuong) = 0)
			raiserror(N'Đã phát lương tháng này cho Nhân viên',16,1)
		declare @HeSo as float = 0
		declare @HieuSuat as float = (select HieuSuat from BangLuong 
									where MaNV = @MaNV and month(NgayPhatLuong) = month(getdate()))
		if @HieuSuat > 1
			set @HeSo = @HieuSuat - 1
		insert into BangLuong(MaNV, NgayPhatLuong, Luong, Thuong) values(@MaNV, GETDATE(), @Luong, @HeSo*@Luong)
	end try
	begin catch
		select  error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;
go

create proc sp_XemBL
as	
begin tran
	begin try
		select NV.MaNV, TenNV, Luong, Thuong, NgayPhatLuong 
		from BangLuong BL, NhanVien NV
		where BL.MaNV = NV.MaNV 
		and NgayPhatLuong = (select max(BL1.NgayPhatLuong) from BangLuong BL1 where BL.MaNV = BL1.MaNV)
	end try
	begin catch
		select  error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;
go

create proc sp_XemCTBL
	@MaNV char(10)
as	
begin tran
	begin try
		select NgayPhatLuong, Luong, Thuong from BangLuong BL 
		where MaNV = @MaNV
	end try
	begin catch
		select  error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;
go


create proc sp_XemDoanhThu_NV
	@Thang int
as
begin tran
	begin try
		select MaNV, TenNV, SUM(TongTien) DoanhThu
		from HoaDon right join NhanVien on MaNV = NVGiaoHang
		group by MaNV, TenNV, NgayLap
		having month(NgayLap) = @Thang
	end try
	begin catch
		select  error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;
go

create proc sp_Xem_CTDoanhThu_NV
	@MaNV char(10),
	@Thang int
as
begin tran
	begin try
		select MaHD, NgayLap, TongTien from HoaDon 
		where NVGiaoHang = @MaNV and month(NgayLap) = @Thang
	end try
	begin catch
		select  error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;
go

create proc sp_Insert_GiamGia
	@MaGiamGia char(10),
	@LoaiGiamGia bit,
	@GiamGia int,
	@NgayHetHan date
as 
begin tran
	begin try
		if @GiamGia <= 0 raiserror(N'Giá Giảm không hợp lệ',16,1)
		if @LoaiGiamGia = 1
		begin
			if @GiamGia > 90 raiserror(N'Giá Giảm không hợp lệ',16,1)
			insert into GiamGia(MaGiamGia, LoaiGiamGia, PhanTramGiam, NgayHetHan) values(@MaGiamGia,@LoaiGiamGia,@GiamGia,@NgayHetHan)
		end
		else insert into GiamGia(MaGiamGia, LoaiGiamGia, SoTienGiam, NgayHetHan) values(@MaGiamGia,@LoaiGiamGia,@GiamGia,@NgayHetHan)
	end try
	begin catch
		select  error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;
go

create procedure sp_Get_HieuSuat @thang int
as    
begin tran
    begin try
        select bl.MaNV,TenNV,MucTieu,HieuSuat
		from BangLuong bl join NhanVien nv on bl.MaNV=nv.MaNV 
		where month(NgayPhatLuong) = @thang
    end try
    begin catch
        select  error_message() as errormessage; 
        if @@trancount > 0  
            rollback tran
    end catch
if @@trancount > 0  
    commit tran;
go

create proc sp_XemDoanhThu_SP
	@Thang int
as
begin tran
	begin try
		select SP.MaSP, TenSP, SUM(ThanhTien) DoanhThu from 
		(select CTHD.MaSP, ThanhTien
		from CT_HoaDon CTHD join HoaDon HD on CTHD.MaHD = HD.MaHD 
		where month(NgayLap) = @Thang) CT right join SanPham SP on SP.MaSP = CT.MaSP
		group by SP.MaSP, TenSP
		order by SP.MaSP
	end try
	begin catch
		select  error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;
go

create proc sp_XemSL
	@Thang int
as
begin tran
	begin try
		select SP.MaSP, TenSP, COUNT(Xuat.MaSP) as TongXuat, COUNT(Nhap.MaSP) as TongNhap
		from SanPham SP left join 
		(select MaSP, NgayLap from CT_HoaDon CTHD  join HoaDon HD on CTHD.MaHD = HD.MaHD where month(NgayLap) = @Thang) Xuat
		on SP.MaSP = Xuat.MaSP
		left join 
		(select MaSP, NgayNhap from CT_NhapHang CTNH join DonNhapHang DN on CTNH.MaDonNhap = DN.MaDonNhap where month(NgayNhap) = @Thang) Nhap
		on SP.MaSP = Nhap.MaSP
		group by SP.MaSP, TenSP
		order by TongXuat desc
	end try
	begin catch
		select  error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;
go

create procedure sp_Login @TK varchar(50), @MK varchar(20), @Ma char(10) output
as
begin tran
	begin try
		if exists(select * from TaiKhoan where @TK = TenTK and @MK = MatKhau and TrangThai = 'Enabled')
			begin
			select * from TaiKhoan where @TK = TenTK and @MK = MatKhau
			declare @VaiTro as nvarchar(50)= (select VaiTro from TaiKhoan where TenTK = @TK)
			if @VaiTro = N'Khách Hàng' set @Ma = (select MaKH from KhachHang where TaiKhoan = @TK)
			else if @VaiTro = N'Nhân Viên' set @Ma = (select MaNV from NhanVien where TaiKhoan = @TK)
			else if @VaiTro = N'Quản Lý' set @Ma = 'QL00000000'
			else if @VaiTro = N'Nhân Sự' set @Ma = 'NS00000000'
			else set @Ma = 'QTV0000000' 
			end
		else
		raiserror('Wrong Login',16,1)
	end try
	begin catch
		select  error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;

go

create procedure sp_Disable_Enable_Login @TK varchar(50)
as
begin tran
	begin try
		declare @TinhTrang varchar(10) = (select TrangThai from taikhoan where @TK = TenTK)
		if @TinhTrang = 'Enabled' set @TinhTrang = 'Disabled'
		else set @TinhTrang = 'Enabled'
		update TaiKhoan
		set TrangThai = @TinhTrang
		where TenTK = @TK
	end try
	begin catch
		select  error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;
go

create proc sp_Insert_HD
    @MaKH char(10),
    @NguoiNhan nvarchar(50),
    @DiaChi nvarchar(100),
    @LoiNhan nvarchar(500),
    @MaGiamGia varchar(10),
    @MaHD char(10) output
as    
begin tran
    begin try
        set @MaHD  = dbo.f_Auto_MaHD()
        insert into HoaDon(MaHD, NgayLap, TenNguoiNhan, DiaChiGiaoHang, LoiNhan, TrangThai, MaKH)
        values(@MaHD, getdate(), @NguoiNhan, @DiaChi, @LoiNhan, N'Chưa Giao', @MaKH)
        if exists (select MaGiamGia from GiamGia where MaGiamGia = @MaGiamGia)
            if GETDATE() < (select NgayHetHan from GiamGia where MaGiamGia = @MaGiamGia)
                update HoaDon
                set MaGiamGia = @MaGiamGia where MaHD = @MaHD
    end try
    begin catch
        select  error_message() as errormessage; 
        if @@trancount > 0  
            rollback tran
    end catch
if @@trancount > 0  
    commit tran;
go

create proc sp_Insert_CTHD
	@MaHD char(10),
	@SoLuong int,
	@MaSP char(10)
as	
begin tran
	begin try
		declare @STT as int = dbo.f_Auto_STT_NhapHang(@MaHD) 
		insert into CT_HoaDon(MaHD, STT, MaSP, SoLuong)
		values(@MaHD, @STT, @MaSP, @SoLuong)
	end try
	begin catch
		select  error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
if @@trancount > 0  
    commit tran;
go


create proc sp_XemDoanhThu_2SP
@Thang1 int,
@Thang2 int
as
begin tran
	begin try
		select SP.MaSP, TenSP, SUM(CT1.ThanhTien) DoanhThu1,SUM(CT2.ThanhTien) DoanhThu2 from 
		(select CTHD.MaSP, ThanhTien
		from CT_HoaDon CTHD join HoaDon HD on CTHD.MaHD = HD.MaHD 
		where month(NgayLap) = @Thang1) CT1 

		right join SanPham SP on SP.MaSP = CT1.MaSP

		left join 
		(select CTHD.MaSP, ThanhTien
		from CT_HoaDon CTHD join HoaDon HD on CTHD.MaHD = HD.MaHD 
		where month(NgayLap) = @Thang2) CT2 on SP.MaSP = CT2.MaSP

		group by SP.MaSP, TenSP
		order by SP.MaSP
	end try
	begin catch
		select  error_message() as errormessage; 
		if @@trancount > 0  
			rollback tran
	end catch
	if @@trancount > 0  
		commit tran;
	go