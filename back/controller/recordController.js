const mongoose = require("mongoose")
const { Record } = require("../model/recordModel")
const { User } = require("../model/UserModel")

const getTotal = async (req, res) => {
    const { _id } = req.body

    if (!_id) {
        return res.status(400).json({ success: false, message: "Input all nessary" })
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const id = new mongoose.Types.ObjectId(_id)

    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const records = await Record.find({ user: id });

        const date = new Date().toISOString().split("T")[0]
        const twoWheeler = user.twoWheeler.slots !== 0 ?  records.filter(record => record.type === "TwoWheeler" && record.date == date).length : null
        const threeWheeler = user.threeWheeler.slots!== 0 ? records.filter(record => record.type === "ThreeWheeler" && record.date == date).length : null
        const fourWheeler = user.fourWheeler.slots !== 0 ? records.filter(record => record.type === "FourWheeler" && record.date == date).length : null

        return res.status(200).json({ success: true, data: { twoWheeler, threeWheeler, fourWheeler } })

    } catch (error) {
        return res.status(400).json({ success: false, message: "Internal Server Error" })
    }
}

const getGraphData = async (req, res) => {
    const { _id } = req.body

    if (!_id) {
        return res.status(400).json({ success: false, message: "Input all nessary" })
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const id = new mongoose.Types.ObjectId(_id)

    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const records = await Record.find({ user: id });

        const data = []
        for (let i = 0; i < 5; i++) {
            let date = new Date()
            date.setDate(date.getDate() - i);
            let formattedDate = date.toISOString().split('T')[0];
            let twoWheeler = records.filter(record => record.type === "TwoWheeler" && record.date === formattedDate).length
            let threeWheeler = records.filter(record => record.type === "ThreeWheeler" && record.date === formattedDate).length
            let fourWheeler = records.filter(record => record.type === "FourWheeler" && record.date === formattedDate).length
            data.push({date:formattedDate, twoWheeler, threeWheeler, fourWheeler })
        }

        return res.status(200).json({ success: true, data: data ,twoWheeler: user.twoWheeler.slots, threeWheeler: user.threeWheeler.slots, fourWheeler: user.fourWheeler.slots})

    } catch (error) {
        return res.status(400).json({ success: false, message: "Internal Server Error" })
    }
}

const getRevenue = async (req, res) => {
    const { _id } = req.body

    if (!_id) {
        return res.status(400).json({ success: false, message: "Input all nessary" })
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const id = new mongoose.Types.ObjectId(_id)

    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const records = await Record.find({ user: id });

        const totalRevenue = records.reduce((total, record) => total + record.fee, 0);

        const twoWheelerRevenue = user.twoWheeler.slots !== 0 ? records.reduce((total, record) => {
            return record.type === "TwoWheeler" ? total + record.fee : total
        }, 0) : null

        const threeWheelerRevenue = user.threeWheeler.slots !== 0 ? records.reduce((total, record) => {
            return record.type === "ThreeWheeler" ? total + record.fee : total
        }, 0) : null

        const fourWheelerRevenue = user.fourWheeler.slots !== 0 ? records.reduce((total, record) => {
            return record.type === "FourWheeler" ? total + record.fee : total
        }, 0) : null
        
        return res.status(200).json({ success: true, data: {totalRevenue,twoWheelerRevenue,threeWheelerRevenue,fourWheelerRevenue} })

    } catch (error) {
        return res.status(400).json({ success: false, message: "Internal Server Error" })
    }
}

const recordController = {
    getTotal,
    getGraphData,
    getRevenue
}

module.exports = {recordController}