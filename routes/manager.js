const express = require('express')
var router = express.Router()
const sql = require('mssql')

//config mssql
config = {
  user: 'sa',
  password: '.',
  server: 'localhost',
  database: 'qlBanHoa',
  port: 1433,
  options: {
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
}

//manager page
router.get('/', function (req, res) {
  res.render('manager')
})

router.post('/get-revenue', (req, res) => {
 // res.send(data)
  (async () => {
    try {
      let pool = await sql.connect(config)
      let result = await pool.request()
          .input('Thang',sql.Int,parseInt(req.body.month))
          .execute('sp_XemDoanhThu_SP')
      pool.close()
      res.send(result.recordset)
    } catch (error) {
      //console.log(error.message);
      res.send(error.message)
      return error
    }
  })()
})

router.post('/get-eff', (req, res) => {
  ;(async () => {
    try {
      let pool = await sql.connect(config)
      let result = await pool.request()
        .input('thang',sql.Int,req.body.month)
        .execute('sp_Get_HieuSuat')
      pool.close()
      res.send(result.recordset)
      //console.log(req.body)
      //console.log(result)
    } catch (error) {
      console.log(error.message)
      return error
    }
  })()
})

router.get('/get-discount', (req, res) => {
  ;(async () => {
    try {
      let pool = await sql.connect(config)
      let result = await pool.query(`select* from GiamGia`)
      pool.close()
      res.send(result.recordset)
      //console.log(result)
    } catch (error) {
      console.log(error.message)
      return error
    }
  })()
})
router.post('/add-discount', (req, res) => {
  let data = req.body
  discount = data.discount
  number = 0
  type = false
  if (discount.indexOf('%') > 0) {
    number = parseInt(data.discount.toString().slice(0, discount.indexOf('%')))
    type = true
  } else {
    number = parseInt(data.discount)
    
  }

  ;(async () => {
    try {
      let pool = await sql.connect(config)
      let result = await pool
        .request()
        .input('MaGiamGia', sql.VarChar(10), data.code)
        .input('LoaiGiamGia', sql.Bit, type)
        .input('GiamGia', sql.Int, number)
        .input('NgayHetHan', sql.VarChar(10), data.date)
        .execute('sp_Insert_GiamGia')

      pool.close()
      res.send(result.recordset)
      //console.log(result)
    } catch (error) {
      //console.log(error.message);
      res.send(error.message)
      return error
    }
  })()
})

module.exports = router
