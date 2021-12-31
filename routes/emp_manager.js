const express = require("express");
var router = express.Router();
const sql = require('mssql');


//driver page
router.get("/", function(req, res) {
    res.render("emp_manager")
})
let data=[
    {
    NgayNhanLuong:'01/01/2021',
    MaNV: 'NV01',
    TenNV: 'Nguyễn Văn A',
    Luong: 1000,
    Thuong: 100,
    DoanhThu: 1100,
    MaHD: 'HD001',
    NgayLap: '01/02/2021',
    TongTien: 1200},
]

router.post("/revenue",(req,res)=>{
    res.send(data)
    // (async()=>{
    //     try{
    //         let pool = await sql.connect(config);
    //         let result = await pool.request()
    //             .input('Thang',sql.Int,req.body.month)
    //             .execute('sp_XemDoanhThu')
    //         pool.close()
    //         res.send(result)
    //     }
    //     catch (error) {
    //         console.log(error.message);
    //         return error
    //     }
    // })
})

router.post("/revenue-detail",(req,res)=>{
    res.send(data)
    // (async()=>{
    //     try{
    //         let pool = await sql.connect(config);
    //         let result = await pool.request()
    //             .input('MaNV',sql.Int,req.body.MaNV)
    //             .input('Thang',sql.Int,req.body.month)
    //             .execute('sp_XemCTDoanhThu')
    //         pool.close()
    //         res.send(result)
    //     }
    //     catch (error) {
    //         console.log(error.message);
    //         return error
    //     }
    // })
})

router.get("/emp-salary",(req,res)=>{
    res.send(data)
    // (async()=>{
    //     try{
    //         let pool = await sql.connect(config);
    //         let result = await pool.request()
    //             .execute('sp_XemBL')
    //         pool.close()
    //         res.send(result)
    //     }
    //     catch (error) {
    //         console.log(error.message);
    //         return error
    //     }
    // })
})

router.post("/emp-salary-detail",(req,res)=>{
    res.send(data)
    // (async()=>{
    //     try{
    //         let pool = await sql.connect(config);
    //         let result = await pool.request()
    //             .input('MaNV',sql.Char(10),req.body.MaNV)
    //             .execute('sp_XemCTBL')
    //         pool.close()
    //         res.send(result)
    //     }
    //     catch (error) {
    //         console.log(error.message);
    //         return error
    //     }
    // })
})

module.exports=router