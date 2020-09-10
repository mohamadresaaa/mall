const router = require("express").Router()
const auth = require("./auth")
const shop = require("./shop")
const comment = require("./comment")
const admin = require("./admin")

// middleware
const authorization = require("../middleware/authorization")

router.use("/auth", auth)
router.use("/shop", authorization, shop)
router.use("/comment", authorization, comment)
router.use("/admin", authorization, admin)

module.exports = router