const express = require("express");
const getBusinsessInfo = require("../../controllers/business");
const router = express.Router();





router.get("/",  getBusinsessInfo );




module.exports = router;
