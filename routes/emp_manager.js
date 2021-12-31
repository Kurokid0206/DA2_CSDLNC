const express = require("express");
var router = express.Router()



//driver page
router.get("/", function(req, res) {
    res.render("emp_manager")
})





module.exports=router