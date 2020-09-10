const router = require("express").Router()

// controllers
const authCtl = require("../controllers/authController")

// middleware
const validator = require("../middleware/validator")

// lib
const {
    login,
    register
} = require("../lib/validationSchema")

router.post("/register", validator(register), authCtl.register)

router.post("/login", validator(login), authCtl.login)

module.exports = router