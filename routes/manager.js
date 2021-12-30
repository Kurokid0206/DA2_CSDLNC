const express = require("express");
var router = express.Router()



//manager page
router.get("/", function(req, res) {
    res.render("manager")
    })




module.exports=router