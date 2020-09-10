const router = require("express").Router()

// controllers
const adminShopCtl = require("../controllers/adminShopController")

router.get("/", adminShopCtl.list)

module.exports = router