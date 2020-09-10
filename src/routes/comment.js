const router = require("express").Router()

// controllers
const commentCtl = require("../controllers/commentController")

// middleware
const validator = require("../middleware/validator")

// lib
const {
    comment
} = require("../lib/validationSchema")

router.post("/", validator(comment), commentCtl.create)

module.exports = router