const express = require("express");
const { json } = require("express/lib/response");
var router = express.Router()


const sql = require('mssql');
config = {
    user: 'sa',
    password: '.',
    server: 'localhost',
    database: 'QLBanHoa',
    port: 1433,
    options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}



//admin page
router.get("/", function(req, res) {
    res.render("manage_product")
})

//manager view products with name
router.post("/view-products", function(req, res) {

    (async() => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('TenSP', sql.VARCHAR(50), req.body.nameSearch)
                .execute('sp_QL_xem_SP')


            pool.close()
            console.log(result)
            res.send(result.recordset)
        } catch (err) {
            console.log(err.message)
            res.send(err.message)
        }

    })()

})



//manager view all products
router.get("/product-data", function(req, res) {

    (async() => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query("select * from SanPham")
                // .input('tk', sql.VARCHAR(50), `${req.body.username}`)
                // .input('mk', sql.VarChar(20), `${req.body.password}`)
                // .output('ma', sql.Char(10))
                // .execute('sp_TK_Login')

            pool.close()
                //console.log(result)
            res.send(result.recordset)
        } catch (err) {
            console.log(err.message)
            res.send(err.message)
        }

    })()

})

//manager view products-price
router.post("/view-products-price", function(req, res) {

    (async() => {
        try {
            //console.log(req.body.MaSP)
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('MaSP', sql.Char(10), req.body.MaSP)
                .execute('sp_TruyVet_GiaSP')

            pool.close()
                //console.log(result)
            res.send(result.recordset)
        } catch (err) {
            console.log(err.message)
            res.send(err.message)
        }

    })();

})

//manager view warehouse-data
router.post("/view-warehouse-data", function(req, res) {

    (async() => {
        try {
            //console.log(req.body.MaSP)
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query(`select * from SanPham where TenSP like '%${req.body.nameSearch}%'`)
                // .input('tk', sql.VARCHAR(50), `${req.body.username}`)
                // .input('mk', sql.VarChar(20), `${req.body.password}`)
                // .output('ma', sql.Char(10))
                // .execute('sp_TK_Login')

            pool.close()
                //console.log(result)
            res.send(result.recordset)
        } catch (err) {
            console.log(err.message)
            res.send(err.message)
        }

    })();

})

//manager save edit products
router.post("/save-edit-products", function(req, res) {

    (async() => {
        try {
            console.log(req.body)
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('TenSP', sql.NVarChar(50), req.body.TenSP)
                .input('MauSac', sql.NVarChar(50), req.body.MauSac)
                .input('ChuDe', sql.NVarChar(50), req.body.ChuDe)
                .input('GiaBan', sql.Int, req.body.GiaBan)
                .input('MaSP', sql.Char(10), req.body.MaSP)
                .execute('sp_Update_SanPham')

            pool.close()
            console.log(result)
            res.send(req.body)
        } catch (err) {
            console.log(err.message)
            res.send(err.message)
        }

    })()

})


//manager insert product
router.post("/insert-product", function(req, res) {

    (async() => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('SoLuongTon', sql.Int, 0)
                .input('LoaiSP', sql.NVarChar(50), 'Hoa Tươi')
                .input('TenSP', sql.NVarChar(50), req.body.TenSP)
                .input('MauSac', sql.NVarChar(50), req.body.MauSac)
                .input('ChuDe', sql.NVarChar(50), req.body.ChuDe)
                .input('GiaBan', sql.Int, req.body.GiaBan)
                .output('MaSP', sql.Char(10))
                .execute('sp_QL_Insert_SanPham')

            pool.close()
            console.log(result)
            res.send(result.output.MaSP)
        } catch (err) {
            console.log(err.message)
            res.send(err.message)
        }

    })()

})

//manager /import-goods
router.post("/import-goods", function(req, res) {

    (async() => {

        try {
            var data = JSON.parse(req.body.data)
            let pool = await sql.connect(config);
            const transaction = new sql.Transaction(pool)
            transaction.begin(sql.ISOLATION_LEVEL.READ_UNCOMMITTED, err => {
                // ... error checks

                const request = new sql.Request(transaction)
                request.input('NgayNhap', sql.Date, req.body.date)
                    .output('MaDonNhap', sql.Char(10))
                    .execute('sp_Insert_DonNhapHang', (err, result) => {
                        if (err) {
                            transaction.rollback(err => {
                                // ... error checks

                                console.log("Transaction rollback")
                            })
                            console.log(err)
                            res.send(err)
                            return
                        } else {

                            console.log(result)
                            console.log(data)

                            function add_detail(elements, i) {
                                //console.log("de quy lan ", i)
                                if (i >= elements.length) {
                                    transaction.commit(err => {
                                        // ... error checks

                                        console.log("Transaction commit ket thuc de quy.")

                                    })
                                    res.send("Thanh cong")
                                    return
                                } else {
                                    let element = elements[i];
                                    //console.log(element.MaSP)
                                    //console.log(element.SoLuong)
                                    const request1 = new sql.Request(transaction)
                                    request1.input('MaDonNhap', sql.VarChar(10), result.output.MaDonNhap)
                                        .input('MaSP', sql.VarChar(10), element.MaSP)
                                        .input('SoLuong', sql.Int, element.SoLuong)
                                        .input('STT', sql.Int, i + 1)
                                        .execute('sp_Insert_CT_NhapHang', (err, result) => {
                                            // ... error checks
                                            if (err) {
                                                transaction.rollback(err => {
                                                    // ... error checks


                                                    console.log("Transaction rollback khi them san pham", element.MaSP)

                                                })
                                                console.log(err)
                                                res.send(err)
                                                return
                                            } else {

                                                return add_detail(data, i + 1);
                                            }

                                        })
                                }


                            }

                            add_detail(data, 0);
                        }
                        // ... error checks

                    })

            })
        } catch (error) {
            console.log(error.message);
            res.send(err)
            return error.message
        }

    })()

})


//manager view import-history-data
router.get("/import-history-data", function(req, res) {

    (async() => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query("select * from DonNhapHang")
                // .input('SoLuongTon', sql.Int, req.body.SLTon)
                // .input('TenSP', sql.NVarChar(50), req.body.TenSP)
                // .input('MauSac', sql.NVarChar(50), req.body.MauSac)
                // .input('ChuDe', sql.NVarChar(50), req.body.ChuDe)
                // .input('GiaBan', sql.Int, req.body.GiaBan)
                // .output('MaSP', sql.Char(10))
                // .execute('sp_Insert_SanPham')

            pool.close()
            console.log(result)
            res.send(result.recordset)
        } catch (err) {
            console.log(err.message)
            res.send(err.message)
        }

    })()

})


//manager view import-history-detail-data
router.post("/view-import-history-detail-data", function(req, res) {

    (async() => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query(`select * from CT_NhapHang where MaDonNhap = '${req.body.MaDonNhap}'`)
                // .input('SoLuongTon', sql.Int, req.body.SLTon)
                // .input('TenSP', sql.NVarChar(50), req.body.TenSP)
                // .input('MauSac', sql.NVarChar(50), req.body.MauSac)
                // .input('ChuDe', sql.NVarChar(50), req.body.ChuDe)
                // .input('GiaBan', sql.Int, req.body.GiaBan)
                // .output('MaSP', sql.Char(10))
                // .execute('sp_Insert_SanPham')

            pool.close()
            console.log(result)
            res.send(result.recordset)
        } catch (err) {
            console.log(err.message)
            res.send(err.message)
        }

    })()

})


module.exports = router