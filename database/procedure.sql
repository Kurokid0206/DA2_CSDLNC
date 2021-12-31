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

create proc