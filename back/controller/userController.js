const { default: mongoose } = require("mongoose")
const { ParkingSlot } = require("../model/parkingSlotModel")
const { User } = require("../model/UserModel")
const bcrypt = require("bcrypt")

const register = async (req, res) => {
    const { name, email, password, twoWheelerFee, twoWheelerCount, threeWheelerFee, threeWheelerCount, fourWheelerFee, fourWheelerCount } = req.body

    if (!name || !email || !password || !twoWheelerFee || !twoWheelerCount || !threeWheelerFee || !threeWheelerCount || !fourWheelerFee || !fourWheelerCount) {
        return res.status(400).json({ success: false, message: "Input all nessary" })
    }

    if (Number(twoWheelerCount) === 0 && Number(threeWheelerCount) === 0 && Number(fourWheelerCount) === 0) {
        return res.status(400).json({ success: false, message: "Input data correctly" })
    }

    try {

        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already in use" })
        }

        const hash = await bcrypt.hash(password, 10)

        if (!hash) {
            return res.status(500).json({ success: false, message: "Internal Error. Can't hash the password" })
        }

        const twoWheelerSlots = []
        const threeWheelerSlots = []
        const fourWheelerSlots = []

        if (Number(twoWheelerCount) !== 0) {

            for (let i = 1; i <= twoWheelerCount; i++) {
                const slot = new ParkingSlot({
                    slotNumber: `B-${i}`
                })
                await slot.save()
                twoWheelerSlots.push(slot)
            }

        }

        if (Number(threeWheelerCount) !== 0) {

            for (let i = 1; i <= threeWheelerCount; i++) {
                const slot = new ParkingSlot({
                    slotNumber: `A-${i}`
                })
                await slot.save()
                threeWheelerSlots.push(slot)
            }

        }

        if (Number(fourWheelerCount) !== 0) {

            for (let i = 1; i <= fourWheelerCount; i++) {
                const slot = new ParkingSlot({
                    slotNumber: `C-${i}`
                })
                await slot.save()
                fourWheelerSlots.push(slot)
            }

        }
        const user = new User({
            name: name,
            email: email,
            password: hash,
            twoWheeler: {
                fee: twoWheelerFee || 0,
                slots: twoWheelerCount || 0
            },
            threeWheeler: {
                fee: threeWheelerFee || 0,
                slots: threeWheelerCount || 0
            },
            fourWheeler: {
                fee: fourWheelerFee || 0,
                slots: fourWheelerCount || 0
            },
            twoWheelerParkingSlots: twoWheelerSlots.map(slot => slot._id),
            threeWheelerParkingSlots: threeWheelerSlots.map(slot => slot._id),
            fourWheelerParkingSlots: fourWheelerSlots.map(slot => slot._id)
        })

        const savedUser = await user.save()

        if (!savedUser) {
            return res.status(400).json({ success: false, message: "User save fail" })
        }

        return res.status(200).json({ success: true, message: "User saved successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error"})
    }
}

const update = async (req, res) => {
    const { _id, twoWheelerFee, twoWheelerCount, threeWheelerFee, threeWheelerCount, fourWheelerFee, fourWheelerCount } = req.body

    if (!_id || !twoWheelerFee || !twoWheelerCount || !threeWheelerFee || !threeWheelerCount || !fourWheelerFee || !fourWheelerCount) {
        return res.status(400).json({ success: false, message: "Input all nessary" })
    }

    if (Number(twoWheelerCount) === 0 && Number(threeWheelerCount) === 0 && Number(fourWheelerCount) === 0) {
        return res.status(400).json({ success: false, message: "Input data correctly" })
    }


    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const id = new mongoose.Types.ObjectId(_id)

    try {

        const existingUser = await User.findById(id)
        if (!existingUser) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        existingUser.twoWheeler.fee !== twoWheelerFee ? existingUser.twoWheeler.fee = twoWheelerFee : null
        existingUser.threeWheeler.fee !== threeWheelerFee ? existingUser.threeWheeler.fee = threeWheelerFee : null
        existingUser.fourWheeler.fee !== fourWheelerFee ? existingUser.fourWheeler.fee = fourWheelerFee : null

        if (existingUser.twoWheeler.count !== twoWheelerCount) {
            if (Number(twoWheelerCount) === 0) {
                await Promise.all(existingUser.twoWheelerParkingSlots.map(async (slotId) => {
                    await ParkingSlot.findByIdAndDelete(slotId)
                }))
                existingUser.twoWheelerParkingSlots = []
                existingUser.twoWheeler.count = 0
            } else {
                await Promise.all(existingUser.twoWheelerParkingSlots.map(async (slotId) => {
                    await ParkingSlot.findByIdAndDelete(slotId)
                }))

                const twoWheelerSlots = []
                for (let i = 1; i <= twoWheelerCount; i++) {
                    const slot = new ParkingSlot({
                        slotNumber: `B-${i}`
                    })
                    await slot.save()
                    twoWheelerSlots.push(slot)
                }
                existingUser.twoWheelerParkingSlots = twoWheelerSlots.map(slot => slot._id)
                existingUser.twoWheeler.count = twoWheelerCount
            }
        }

        if (existingUser.threeWheeler.count !== threeWheelerCount) {
            if (Number(threeWheelerCount) === 0) {
                await Promise.all(existingUser.threeWheelerParkingSlots.map(async (slotId) => {
                    await ParkingSlot.findByIdAndDelete(slotId)
                }))
                existingUser.threeWheelerParkingSlots = []
                existingUser.threeWheeler.count = 0
            } else {
                await Promise.all(existingUser.threeWheelerParkingSlots.map(async (slotId) => {
                    await ParkingSlot.findByIdAndDelete(slotId)
                }))

                const threeWheelerSlots = []
                for (let i = 1; i <= threeWheelerCount; i++) {
                    const slot = new ParkingSlot({
                        slotNumber: `A-${i}`
                    })
                    await slot.save()
                    threeWheelerSlots.push(slot)
                }
                existingUser.threeWheelerParkingSlots = threeWheelerSlots.map(slot => slot._id)
                existingUser.threeWheeler.count = threeWheelerCount
            }
        }

        if (existingUser.fourWheeler.count !== fourWheelerCount) {
            if (Number(fourWheelerCount) === 0) {
                await Promise.all(existingUser.fourWheelerParkingSlots.map(async (slotId) => {
                    await ParkingSlot.findByIdAndDelete(slotId)
                }))
                existingUser.fourWheelerParkingSlots = []
                existingUser.fourWheeler.count = 0
            } else {
                await Promise.all(existingUser.fourWheelerParkingSlots.map(async (slotId) => {
                    await ParkingSlot.findByIdAndDelete(slotId)
                }))

                const fourWheelerSlots = []
                for (let i = 1; i <= fourWheelerCount; i++) {
                    const slot = new ParkingSlot({
                        slotNumber: `C-${i}`
                    })
                    await slot.save()
                    fourWheelerSlots.push(slot)
                }
                existingUser.fourWheelerParkingSlots = fourWheelerSlots.map(slot => slot._id)
                existingUser.fourWheeler.count = fourWheelerCount
            }
        }

        const savedUser = await existingUser.save()

        if (!savedUser) {
            return res.status(400).json({ success: false, message: "User update fail" })
        }

        return res.status(200).json({ success: true, message: "User updated successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error })
    }
}

const get = async (req, res) => {
    const { _id} = req.body

    if (!_id) {
        return res.status(400).json({ success: false, message: "Input all nessary" })
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const id = new mongoose.Types.ObjectId(_id)

    try {

        const existingUser = await User.findById(id)
        if (!existingUser) {
            return res.status(400).json({ success: false, message: "User not found" })
        }
        const data = {
            twoWheelerCount:existingUser.twoWheeler.slots,
            twoWheelerFee:existingUser.twoWheeler.fee,
            threeWheelerCount:existingUser.threeWheeler.slots,
            threeWheelerFee:existingUser.threeWheeler.fee,
            fourWheelerCount:existingUser.fourWheeler.slots,
            fourWheelerFee:existingUser.fourWheeler.fee,
        }

        return res.status(200).json({ success: true, data:data })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error })
    }
}

const userController = {
    register,
    update,
    get
}

module.exports = { userController }