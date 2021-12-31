const express = require("express");
var router = express.Router();
const sql = require('mssql');

//config mssql
config = {
    user: 'sa',
    password: '.',
    server: 'localhost',
    database: 'qlBanHoa',
    port: 1433,
    options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}


//emp_manager page
router.get("/", function(req, res) {
    res.render("emp_manager")
})

router.post("/revenue",(req,res)=>{
    (async()=>{
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('Thang',sql.Int,req.body.month)
                .execute('sp_XemDoanhThu')
            pool.close()
            res.send(result.recordset)
            // console.log(result)
        }
        catch (error) {
            console.log(error.message);
            return error
        }
    })()
})

router.post("/revenue-detail",(req,res)=>{
    (async()=>{
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('MaNV',sql.Int,req.body.MaNV)
                .input('Thang',sql.Int,req.body.month)
                .execute('sp_XemCTDoanhThu')
            pool.close()
            res.send(result.recordset)
            // console.log(result)
        }
        catch (error) {
            console.log(error.message);
            return error
        }
    })()
})

router.get("/emp-salary",(req,res)=>{
    (async()=>{
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .execute('sp_XemBL')
            pool.close()
            res.send(result.recordset)
            // console.log(result)
        }
        catch (error) {
            console.log(error.message);
            return error
        }
    })()
})

router.post("/emp-salary-detail",(req,res)=>{
    (async()=>{
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('MaNV',sql.Char(10),req.body.MaNV)
                .execute('sp_XemCTBL')
            pool.close()
            res.send(result.recordset)
            // console.log(result)
        }
        catch (error) {
            console.log(error.message);
            return error
        }
    })()
})

module.exports=router