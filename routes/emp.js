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

//driver page
router.get("/", function(req, res) {
    res.render("emp")
})

//API

//driver view all available
router.get("/get-order", function(req, res) {
    (async() => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query(`Select * from HoaDon where MaNV = Null and TinhTrang = N'Chưa Giao'`)


            pool.close()
                //console.log(result)
            res.send(result.recordset)
        } catch (err) {
            console.log(err.message)
            res.send(err.message)
        }

    })()
})


//driver receive order
router.post("/recv-order", function(req, res) {
    (async() => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('MaNV', sql.Char(10), req.session.user) //Thay bằng session
                .input('MaHD', sql.Char(10), req.body.MaHD)
                .execute('sp_NV_NhanDon')


            pool.close()
                //console.log(result)
            res.send(result.recordset)
        } catch (err) {
            console.log(err.message)
            res.send(err.message)
        }

    })()
})


//driver view all received order
router.post("/get-received-order", function(req, res) {
    (async() => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query(`Select * from HoaDon where MaNV = '${req.session.user}' and TrangThai = N'Đang Giao'`) //thay bằng session


            pool.close()
                //console.log(result)
            res.send(result.recordset)
        } catch (err) {
            console.log(err.message)
            res.send(err.message)
        }

    })()
})


//driver view all order have been comfirmed
router.post("/get-comfirmed-order", function(req, res) {
    (async() => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query(`Select * from HoaDon where MaNV = '${req.session.user}' and TrangThai = N'Đã Giao'`) //thay bằng session


            pool.close()
                //console.log(result)
            res.send(result.recordset)
        } catch (err) {
            console.log(err.message)
            res.send(err.message)
        }

    })()
})



//driver view salary
router.get("/get-salary", function(req, res) {
    (async() => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query(`select * from BangLuong where MaNV='${req.session.user}'`)


            pool.close()
                //console.log(result.recordset[0])
            res.send(result.recordset)
        } catch (err) {
            console.log(err.message)
            res.send(err.message)
        }

    })()
})



module.exports = router