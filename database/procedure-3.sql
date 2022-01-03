use QLBanHoa
go

-- drop procedure sp_QL_xem_SP
CREATE PROCEDURE sp_QL_xem_SP
    @TenSP nvarchar(50)

AS
BEGIN TRAN
    BEGIN TRY
        declare @NgayAD as date = getdate()
		select sp.*,gia.GiaBan,gia.GiaNhap from SanPham sp join (select bg.* from BangGiaSP bg join (select MAX(NgayApDung) as NgayAD, MaSP from BangGiaSP
                                                        where NgayApDung <= @NgayAD 
                                                        group by MaSP
                                                        ) bg2
                                                        on bg.MaSP = bg2.MaSP and bg.NgayApDung = bg2.NgayAD) gia
                                        on sp.MaSP = gia.MaSP
                                        where sp.TenSP like N'%'+@TenSP+N'%' and sp.LoaiSP != N'Quà Tặng'
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




create proc sp_KH_TimSP
    @Ten nvarchar(50),
    @Mau nvarchar(50),
    @ChuDe nvarchar(50)
as
begin tran
    begin try
        select SP.*,BG.GiaBan from SanPham SP left join 
        (select bg.* from BangGiaSP bg join (select MAX(NgayApDung) as NgayAD, MaSP from BangGiaSP
                                            where NgayApDung < getdate() 
                                            group by MaSP
                                            ) bg2
                            on bg.MaSP = bg2.MaSP and bg.NgayApDung = bg2.NgayAD) BG
        on SP.MaSP = BG.MaSP 
        where ChuDe like '%' + @ChuDe + '%'
            and MauSac like '%' + @Mau + '%'
            and TenSP like '%' + @Ten + '%' 
			and sp.LoaiSP != N'Quà Tặng'
    end try
    begin catch
        select  error_message() as errormessage; 
        if @@trancount > 0
            rollback tran
    end catch
if @@trancount > 0
    commit tran;

-- drop procedure sp_TruyVet_GiaSP
CREATE PROCEDURE sp_TruyVet_GiaSP
    @MaSP char(10)
AS
BEGIN TRAN
    BEGIN TRY
        SELECT BangGiaSP.*, SanPham.TenSP
        FROM BangGiaSP join SanPham
		on BangGiaSP.MaSP = SanPham.MaSP
        WHERE BangGiaSP.MaSP = @MaSP
        ORDER BY NgayApDung

    END TRY
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