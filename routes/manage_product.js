const express = require("express");
var router = express.Router()





//admin page
router.get("/", function(req, res) {
    res.render("manage_product")
})


module.exports=router