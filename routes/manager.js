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
data = [{ MaSP: 'SP001', TenSP: 'Name001', DoanhThu: 10000, DoanhThu2: 15000 },
{ MaSP: 'SP002', TenSP: 'Name002', DoanhThu: 20000, DoanhThu2: 25000 },
{ MaSP: 'SP003', TenSP: 'Name003', DoanhThu: 30000, DoanhThu2: 35000 },
]
router.get('/get-revenue', (req, res) => {
    res.send(data)
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
  type = 0
  if (discount.indexOf('%') > 0) {
    percent = parseInt(data.discount.toString().slice(0, discount.indexOf('%')))
    number = null
    type = 1
  } else {
    percent = null
    number = parseInt(data.discount)
    type = 0
  }

  ;(async () => {
    try {
      let pool = await sql.connect(config)
      let result = await pool.query(`
                insert into GiamGia values(
                    '${data.code}','${type}',${number},${percent},'${data.date}')
            `)
      // .request()
      //     .input('MaGiamGia',sql.VarChar(10),data.code)
      //     .input('LoaiGiam',sql.VarChar(10),data.code)
      //     .input('SoTienGiam',sql.Int,number)
      //     .input('PhanTramGiam',sql.Int,percent)
      //     .input('NgayHetHan',sql.VarChar(10),data.date)
      //     .execute('sp_ThemMaGiam')
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
