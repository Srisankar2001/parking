const express = require("express")
const router = express.Router()

const {recordController} = require("../controller/recordController")

router.post("/total",recordController.getTotal)
router.post("/revenue",recordController.getRevenue)
router.post("/graph",recordController.getGraphData)

module.exports = router