const express = require("express");
const router = express.Router();

const productcontroller = require("../controllers/productcontroller");

router.get("/allProduct", productcontroller.allProduct);

router.get("/generateToken", productcontroller.generateToken);

router.get("/authenticate", productcontroller.authenticate);

module.exports = router;
