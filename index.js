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
    //console.log(req.session.user)
    // if (req.session.user) {
    //     //console.log(req.session.user)
    //     let type = req.session.user
    //     if (type.indexOf("KH") > -1) {
    //         res.sendFile(__dirname + "/html/customer.html")
    //     } else if (type.indexOf("TX") > -1) {
    //         //res.redirect("/driver")
    //         res.sendFile(__dirname + "/html/driver.html")
    //     } else if (type.indexOf("DT") > -1) {
    //         //res.redirect("/supplier")
    //         res.sendFile(__dirname + "/html/supplier.html")
    //     } else if (type.indexOf("NV") > -1) {
    //         //res.redirect("/employee")
    //         res.sendFile(__dirname + "/html/employee.html")
    //     } else if (type.indexOf("QTV") > -1) {
    //         //res.redirect("/admin")
    //         res.sendFile(__dirname + "/html/admin.html")
    //     } else {
    //         res.sendFile(__dirname + "/html/index.html")
    //     }
    // } else { 
        res.sendFile(__dirname + "/html/index.html") //}
})


//customer page
app.get("/customer", function(req, res) {
        res.sendFile(__dirname + "/html/customer.html")
})

//manager page
app.get("/manager", function(req, res) {
        res.sendFile(__dirname + "/html/manager.html")
    })
//driver page
app.get("/driver", function(req, res) {
        res.sendFile(__dirname + "/html/driver.html")
    })

//admin page
app.get("/admin", function(req, res) {
    res.sendFile(__dirname + "/html/admin.html")
})

// app.get("/registration", function(req, res) {
//     res.sendFile(__dirname + "/html/registration.html")
// })

// app.post("/log-in", function(req, res) {
//     //console.log(req.body)
//     Promise.resolve('success')
//         .then(async function() {
//             try {
//                 let pool = await sql.connect(config);
//                 let result = await pool.request()
//                     .input('tk', sql.VARCHAR(50), `${req.body.username}`)
//                     .input('mk', sql.VarChar(20), `${req.body.password}`)
//                     .output('ma', sql.Char(10))
//                     .execute('sp_TK_Login')
//                 pool.close()
//                     //console.log(result)
//                 req.session.user = result.output.ma
//                 res.redirect("/")
//                     //console.log(result.output.ma)
//                     //console.log(req.session.user)
//                     // let type = JSON.stringify(result.output)
//                     // if (type.indexOf("KH") > -1) {
//                     //     res.redirect("/customer")
//                     // } else if (type.indexOf("TX") > -1) {
//                     //     res.redirect("/driver")
//                     // } else if (type.indexOf("DT") > -1) {
//                     //     res.redirect("/supplier")
//                     // } else if (type.indexOf("NV") > -1) {
//                     //     res.redirect("/employee")
//                     // } else if (type.indexOf("QTV") > -1){
//                     //     res.redirect("/admin")
//                     // } else{
//                     //     res.redirect("/")
//                     // }
//             } catch (error) {
//                 console.log(error.message);
//                 return error.message
//             }
//         })
// })

// app.get("/log-out", function(req, res) {
//     req.session.destroy();
//     //console.log(req.session)
//     res.redirect("/")
// })
