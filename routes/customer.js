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







module.exports = router