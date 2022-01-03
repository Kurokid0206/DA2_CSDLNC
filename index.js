// use node express
const express = require("express");
const session = require("express-session")
const app = express();
const path = require("path")
    //set stactic folder
app.use(express.static('./publics/'))

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
    // parse application/json
app.use(express.json())

app.use(session({
        secret: "NoSecret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 600000
        }
    }))
app.set("view engine","ejs");

const sql = require('mssql');

//router
const customer=require('./routes/customer')
const manage_product=require('./routes/manage_product')
const emp=require('./routes/emp')
const manager=require('./routes/manager')
const emp_manager=require('./routes/emp_manager')

//use router
app.use("/customer",customer)
app.use("/manage_product",manage_product)
app.use("/emp",emp)
app.use("/manager",manager)
app.use("/emp_manager",emp_manager)



app.listen(3000, function() {
    console.log("server is listen on port 3000.");
});

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


//API

//home page
app.get("/", function(req, res) {
       res.render("index")
})









// app.get("/registration", function(req, res) {
//     res.sendFile(__dirname + "/html/registration.html")
// })

app.post("/log-in", function(req, res) {
    //console.log(req.body)
    Promise.resolve('success')
        .then(async function() {
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('tk', sql.VARCHAR(50), `${req.body.username}`)
                    .input('mk', sql.VarChar(20), `${req.body.password}`)
                    .output('ma', sql.Char(10))
                    .execute('sp_TK_Login')
                pool.close()
                    //console.log(result)
                req.session.user = result.output.ma
                    //console.log(result.output.ma)
                    //console.log(req.session.user)
                    let type = JSON.stringify(result.output)
                    if (type.indexOf("KH") > -1) {
                        res.redirect("/customer")
                    } else if (type.indexOf("NV") > -1) {
                        res.redirect("/emp")
                    } else if (type.indexOf("QL") > -1) {
                        res.redirect("/manager")
                    } else if (type.indexOf("NS") > -1) {
                        res.redirect("/emp_manager")
                    } else if (type.indexOf("QTV") > -1){
                        res.redirect("/manage_product")
                    } else{
                        res.redirect("/")
                    }
            } catch (error) {
                console.log(error.message);
                return error.message
            }
        })
})

app.get("/log-out", function(req, res) {
    req.session.destroy();
    //console.log(req.session)
    res.redirect("/")
})
