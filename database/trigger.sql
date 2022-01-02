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