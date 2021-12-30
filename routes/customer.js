const express = require("express");
var router = express.Router()




//customer page
router.get("/", function(req, res) {
    res.render("customer")
})






module.exports=router