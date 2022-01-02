use QLBanHoa
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
		select MaNV, TenNV, SUM(TongTien) DoanThu
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

create
proc sp_Inser_GiamGia
	@MaGiamGia char(10),
	@LoaiGiamGia nvarchar(50),
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