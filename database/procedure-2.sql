use QLBanHoa
go

--DROP PROCEDURE sp_Insert_SanPham
CREATE PROCEDURE sp_Insert_SanPham
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