USE [QLBanHoa]
GO

CREATE NONCLUSTERED INDEX TimKiemSP ON SanPham
(	MauSac ASC,
	ChuDe ASC,
	TenSP ASC)

CREATE NONCLUSTERED INDEX TimKiemSP_KH ON SanPham
(	MaKH ASC)