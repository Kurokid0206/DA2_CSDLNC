use QLBanHoa
go

--Thêm sản phẩm
--DROP PROCEDURE sp_QL_Insert_SanPham
CREATE PROCEDURE sp_QL_Insert_SanPham
    @MaSP char(10) output,
    @TenSP nvarchar(50),
    @SoLuongTon int,
    @GiaBan int,
    @MauSac nvarchar(50),
    @ChuDe nvarchar(50)

AS
BEGIN TRAN
    BEGIN TRY
        SET @MaSP = dbo.f_Auto_MaSP()
        INSERT INTO SanPham
        values(@MaSP, @TenSP, @SoLuongTon, NULL, @MauSac, @ChuDe)
		declare @NgayApDung as date
        SET @NgayApDung = GETDATE()
        INSERT INTO BangGiaSP
        values(@MaSP, @NgayApDung, NULL, @GiaBan)
    end try
    begin catch
        select  error_number() as errornumber,
                error_severity() as errorseverity, 
                error_state() as errorstate,
                error_procedure() as errorprocedure,
                error_line() as errorline,
                error_message() as errormessage; 
        if @@trancount > 0
            rollback tran
    end catch
if @@trancount > 0
    commit tran;
GO

--Xem đơn nhập hàng
--DROP PROCEDURE sp_View_DonNhapHang
CREATE PROCEDURE sp_View_DonNhapHang
	@MaDonNhap char(10)
AS

BEGIN TRAN
	BEGIN TRY
		SELECT * FROM DonNhapHang
		WHERE MaDonNhap = @MaDonNhap
	END TRY
	BEGIN CATCH
		SELECT  error_number() AS errornumber,
				error_severity() AS errorseverity, 
				error_state() AS errorstate,  
				error_procedure() AS errorprocedure,  
				error_line() AS errorline,  
				error_message() AS errormessage; 
		IF @@trancount > 0  
			ROLLBACK TRAN
	END CATCH
IF @@trancount > 0  
    COMMIT TRAN;
GO

--Cập nhật sản phẩm
--DROP PROCEDURE sp_Update_SanPham
CREATE PROCEDURE sp_Update_SanPham
	@MaSP char(10),
	@TenSP nvarchar(50),
	@MauSac nvarchar(50),
	@ChuDe nvarchar(50),
	@GiaBan int
AS

BEGIN TRAN
	BEGIN TRY
		UPDATE SanPham
		SET TenSP = @TenSP, MauSac = @MauSac, ChuDe = @ChuDe
		WHERE MaSP = @MaSP

		DECLARE @NgayApDung AS DATE
        SET @NgayApDung = GETDATE()

		INSERT INTO BangGiaSP
        VALUES(@MaSP, @NgayApDung, NULL, @GiaBan)
	END TRY
	BEGIN CATCH
		SELECT  error_number() AS errornumber,
				error_severity() AS errorseverity, 
				error_state() AS errorstate,  
				error_procedure() AS errorprocedure,  
				error_line() AS errorline,  
				error_message() AS errormessage; 
		IF @@trancount > 0  
			ROLLBACK TRAN
	END CATCH
IF @@trancount > 0  
    COMMIT TRAN;
GO


--Thêm đơn nhập hàng
--DROP PROCEDURE sp_Insert_DonNhapHang
CREATE PROCEDURE sp_Insert_DonNhapHang
	@MaDonNhap char(10) output,
	@NgayNhap date
AS

BEGIN TRAN
	BEGIN TRY
		SET @MaDonNhap = dbo.f_Auto_MaDN()
		INSERT INTO DonNhapHang
        VALUES(@MaDonNhap, @NgayNhap)
	END TRY
	BEGIN CATCH
		SELECT  error_number() AS errornumber,
				error_severity() AS errorseverity, 
				error_state() AS errorstate,  
				error_procedure() AS errorprocedure,  
				error_line() AS errorline,  
				error_message() AS errormessage; 
		IF @@trancount > 0  
			ROLLBACK TRAN
	END CATCH
IF @@trancount > 0  
    COMMIT TRAN;
GO

--Thêm chi tiết đơn nhập hàng
--DROP PROCEDURE sp_Insert_CT_NhapHang -- chua co f_Auto_STT()
CREATE PROCEDURE sp_Insert_CT_NhapHang
	@STT int,
	@MaDonNhap char(10),
	@MaSP char(10),
	@SoLuong int
AS

BEGIN TRAN
	BEGIN TRY
		INSERT INTO CT_NhapHang
        VALUES(@STT, @MaDonNhap, @MaSP, @SoLuong)
		update SanPham
		set SoLuongTon=SoLuongTon+@SoLuong
		where MaSP=@MaSP
	END TRY
	BEGIN CATCH
		SELECT  error_number() AS errornumber,
				error_severity() AS errorseverity, 
				error_state() AS errorstate,  
				error_procedure() AS errorprocedure,  
				error_line() AS errorline,  
				error_message() AS errormessage; 
		IF @@trancount > 0  
			ROLLBACK TRAN
	END CATCH
IF @@trancount > 0  
    COMMIT TRAN;
GO

--Xem lịch sử nhập --Chưa xuất được giá nhập của từng sản phẩm
--DROP PROCEDURE sp_View_LichSuNhap
CREATE PROCEDURE sp_View_LichSuNhap
AS
BEGIN TRAN
	BEGIN TRY
		--SELECT DonNhapHang.MaDonNhap, DonNhapHang.NgayNhap,  
		--FROM DonNhapHang, CT_NhapHang
	END TRY
	BEGIN CATCH
		SELECT  error_number() AS errornumber,
				error_severity() AS errorseverity, 
				error_state() AS errorstate,  
				error_procedure() AS errorprocedure,  
				error_line() AS errorline,  
				error_message() AS errormessage; 
		IF @@trancount > 0  
			ROLLBACK TRAN
	END CATCH
IF @@trancount > 0  
    COMMIT TRAN;
GO

CREATE PROCEDURE sp_Xem_CTDN
@MaDN char(10)
AS
BEGIN TRAN
	BEGIN TRY
		SELECT * from CT_NhapHang where MaDonNhap=@MaDN
		
	END TRY
	BEGIN CATCH
		SELECT error_message() AS errormessage; 
		IF @@trancount > 0  
			ROLLBACK TRAN
	END CATCH
IF @@trancount > 0  
    COMMIT TRAN;
GO