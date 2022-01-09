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


//customer page
router.get("/", function(req, res) {
    res.render("customer")
})


//customer view product by fitle
router.post("/search-products", function(req, res) {

    (async() => {
        try {
            //console.log(req.body.MaSP)
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('Ten', sql.NVarChar(50), req.body.TenSP)
                .input('Mau', sql.NVarChar(50), req.body.MauSac)
                .input('ChuDe', sql.NVarChar(50), req.body.ChuDe)
                .execute('sp_KH_TimSP')

            pool.close()
                //console.log(result)
            res.send(result.recordset)
        } catch (err) {
            console.log(err.message)
            res.send(err.message)
        }

    })();

})

//customer view order
router.get("/cus-view-order", function(req, res) {

    (async() => {
        try {
            //console.log(req.body.MaSP)
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query(`select * from HoaDon where MaKH = '${req.session.user}'`) //thay bằng section

            pool.close()
                //console.log(result)
            res.send(result.recordset)
        } catch (err) {
            console.log(err.message)
            res.send(err.message)
        }

    })();

})


//customer view order detail
router.post("/cus-view-order-detail", function(req, res) {

    (async() => {
        try {
            //console.log(req.body.MaSP)
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query(`select ct.*,sp.TenSP from CT_HoaDon ct join SanPham sp on ct.MaSP = sp.MaSP where MaHD = '${req.body.MaHD}'`)

            pool.close()
                //console.log(result)
            res.send(result.recordset)
        } catch (err) {
            console.log(err.message)
            res.send(err.message)
        }

    })();

})

//customer cancel order
router.post("/cancel-order", function(req, res) {

    (async() => {
        try {
            //console.log(req.body.MaSP)
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query(`delete from CT_HoaDon where MaHD = '${req.body.MaHD}'
                        delete from HoaDon where MaHD = '${req.body.MaHD}'`)

            pool.close()
                //console.log(result)
            res.send(result.recordset)
        } catch (err) {
            console.log(err.message)
            res.send(err.message)
        }

    })();

})


//customer view product by fitle
router.post("/insert-order", function(req, res) {

    (async() => {

        try {
            var data = JSON.parse(req.body.data)
            let pool = await sql.connect(config);
            const transaction = new sql.Transaction(pool)
            transaction.begin(sql.ISOLATION_LEVEL.READ_UNCOMMITTED, err => {
                // ... error checks

                const request = new sql.Request(transaction)
                request.input('MaKH', sql.Char(10), req.session.user)
                    .input('NguoiNhan', sql.NVarChar(50), req.body.NguoiNhan)
                    .input('DiaChi', sql.NVarChar(50), req.body.DiaChi)
                    .input('LoiNhan', sql.NVarChar(50), req.body.LoiNhan)
                    .input('MaGiamGia', sql.VarChar(10), req.body.MaGiamGia)
                    .output('MaHD', sql.Char(10))
                    .execute('sp_Insert_HD', (err, result) => {
                        if (err) {
                            transaction.rollback(err => {
                                // ... error checks

                                console.log("Transaction rollback")
                            })
                            console.log(err)
                            res.send(err)
                            return
                        } else {

                            // console.log(result)
                            // console.log(data)

                            function add_detail(elements, i) {
                                console.log("de quy lan ", i)
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
                                    request1.input('MaHD', sql.VarChar(10), result.output.MaHD)
                                        .input('MaSP', sql.VarChar(10), element.MaSP)
                                        .input('SoLuong', sql.Int, element.SoLuong)
                                        .input('STT', sql.Int, i + 1)
                                        .execute('sp_Insert_CTHD', (err, result) => {
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




module.exports = router