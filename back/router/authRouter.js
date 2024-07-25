const express = require("express")
const router = express.Router()

const {authController} = require("../controller/authController")

router.get("/",authController.verify)
router.get("/logout",authController.logout)

router.post("/",authController.login)

module.exports = router