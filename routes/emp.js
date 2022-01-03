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




module.exports = router