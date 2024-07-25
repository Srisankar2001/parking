const express = require("express")
const router = express.Router()

const {vehicleController} = require("../controller/vehicleController")

router.post("/park",vehicleController.park)

router.post("/leave",vehicleController.leave)

router.post("/count",vehicleController.getCount)

module.exports = router