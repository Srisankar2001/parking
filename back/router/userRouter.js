const express = require("express")
const router = express.Router()

const {userController} = require("../controller/userController")

router.post("/register",userController.register)
router.post("/",userController.get)


router.put("/update",userController.update)

module.exports = router