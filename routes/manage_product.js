const express = require("express");
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

//manager view products
router.post("/view-products", function(req, res) {

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

//manager save edit products
router.post("/save-edit-products", function(req, res) {

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
                .input('SoLuongTon', sql.Int, req.body.SLTon)
                .input('TenSP', sql.NVarChar(50), req.body.TenSP)
                .input('MauSac', sql.NVarChar(50), req.body.MauSac)
                .input('ChuDe', sql.NVarChar(50), req.body.ChuDe)
                .input('GiaBan', sql.Int, req.body.GiaBan)
                .output('MaSP', sql.Char(10))
                .execute('sp_Insert_SanPham')

            pool.close()
            console.log(result)
            res.send(result.output.MaSP)
        } catch (err) {
            console.log(err.message)
            res.send(err.message)
        }

    })()

})


module.exports = router