const router = require("express").Router()

// controllers
const shopCtl = require("../controllers/shopController")

// middleware
const validator = require("../middleware/validator")

// lib
const {
    shop
} = require("../lib/validationSchema")

router.post("/", validator(shop), shopCtl.create)

module.exports = router