const mongoose = require("mongoose")
const { ParkingSlot } = require("../model/parkingSlotModel")
const { User } = require("../model/UserModel")
const { Vehicle } = require("../model/vehicleModel")
const { Record } = require("../model/recordModel")
const { feeCalculator } = require("../Function/feeCalculator")

const park = async (req, res) => {
    const { _id, registrationNumber, type } = req.body

    if (!_id || !registrationNumber || !type) {
        return res.status(400).json({ success: false, message: "Input all nessary" })
    }

    if (type !== "TwoWheeler" && type !== "ThreeWheeler" && type !== "FourWheeler") {
        return res.status(400).json({ success: false, message: "Input correct type" })
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

        if (type === "TwoWheeler") {
            if (existingUser.twoWheeler.count !== 0) {
                const slots = await existingUser.populate("twoWheelerParkingSlots")
                const isAlreadySaved = await ParkingSlot.findOne()
                .populate({
                    path: 'vehicle',
                    match: { registrationNumber }
                })
                if(isAlreadySaved.vehicle){
                    return res.status(200).json({ success: true, message: "Vechile already parked" })
                }
                for (const item of slots.twoWheelerParkingSlots) {
                    if (item.isFree) {
                        const vehicle = new Vehicle({
                            registrationNumber: registrationNumber,
                            type: "TwoWheeler",
                        })
                        const savedVehicle = await vehicle.save()
                        if (!savedVehicle) {
                            return res.status(500).json({ success: false, message: "Internal Server Error. Can't save the vehicle" })
                        }
                        const slot = await ParkingSlot.findById(item._id)
                        if (!slot) {
                            return res.status(500).json({ success: false, message: "Internal Server Error. Can't find the slot" })
                        }
                        slot.vehicle = savedVehicle._id
                        slot.isFree = false
                        slot.parkedAt = new Date().toISOString().split("T")[1].substring(0, 5)
                        const savedSlot = await slot.save()
                        if (!savedSlot) {
                            return res.status(500).json({ success: false, message: "Internal Server Error. Can't update the slot" })
                        }
                        return res.status(200).json({ success: true, message: `Bike Parked in ${savedSlot.slotNumber}` })
                    }
                }
                return res.status(200).json({ success: true, message: `Bike Parking is Full at the moment` })
            } else {
                return res.status(400).json({ success: false, message: "There is no two wheeler parking" })
            }
        } else if (type === "ThreeWheeler") {
            if (existingUser.threeWheeler.count !== 0) {
                const slots = await existingUser.populate("threeWheelerParkingSlots")
                const isAlreadySaved = await ParkingSlot.findOne()
                .populate({
                    path: 'vehicle',
                    match: { registrationNumber: registrationNumber }
                });
                if(isAlreadySaved.vehicle){
                    return res.status(200).json({ success: true, message: "Vechile already parked" })
                }
                for (const item of slots.threeWheelerParkingSlots) {
                    if (item.isFree) {
                        const vehicle = new Vehicle({
                            registrationNumber: registrationNumber,
                            type: "ThreeWheeler",
                        })
                        const savedVehicle = await vehicle.save()
                        if (!savedVehicle) {
                            return res.status(500).json({ success: false, message: "Internal Server Error. Can't save the vehicle" })
                        }
                        const slot = await ParkingSlot.findById(item._id)
                        if (!slot) {
                            return res.status(500).json({ success: false, message: "Internal Server Error. Can't find the slot" })
                        }
                        slot.vehicle = savedVehicle._id
                        slot.isFree = false
                        slot.parkedAt = new Date().toISOString().split("T")[1].substring(0, 5)
                        const savedSlot = await slot.save()
                        if (!savedSlot) {
                            return res.status(500).json({ success: false, message: "Internal Server Error. Can't update the slot" })
                        }
                        return res.status(200).json({ success: true, message: `Auto Parked in ${savedSlot.slotNumber}` })
                    }
                }
                return res.status(200).json({ success: true, message: `Auto Parking is Full at the moment` })
            } else {
                return res.status(400).json({ success: false, message: "There is no three wheeler parking" })
            }
        } else {
            if (existingUser.fourWheeler.count !== 0) {
                const slots = await existingUser.populate("fourWheelerParkingSlots")
                const isAlreadySaved = await ParkingSlot.findOne()
                .populate({
                    path: 'vehicle',
                    match: { registrationNumber: registrationNumber }
                });
                if(isAlreadySaved.vehicle){
                    return res.status(200).json({ success: true, message: "Vechile already parked" })
                }
                for (const item of slots.fourWheelerParkingSlots) {
                    if (item.isFree) {
                        const vehicle = new Vehicle({
                            registrationNumber: registrationNumber,
                            type: "FourWheeler",
                        })
                        const savedVehicle = await vehicle.save()
                        if (!savedVehicle) {
                            return res.status(500).json({ success: false, message: "Internal Server Error. Can't save the vehicle" })
                        }
                        const slot = await ParkingSlot.findById(item._id)
                        if (!slot) {
                            return res.status(500).json({ success: false, message: "Internal Server Error. Can't find the slot" })
                        }
                        slot.vehicle = savedVehicle._id
                        slot.isFree = false
                        slot.parkedAt = new Date().toISOString().split("T")[1].substring(0, 5)
                        const savedSlot = await slot.save()
                        if (!savedSlot) {
                            return res.status(500).json({ success: false, message: "Internal Server Error. Can't update the slot" })
                        }
                        return res.status(200).json({ success: true, message: `Car Parked in ${savedSlot.slotNumber}` })
                    }
                }
                return res.status(200).json({ success: true, message: `Car Parking is Full at the moment` })
            } else {
                return res.status(400).json({ success: false, message: "There is no four wheeler parking" })
            }
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error })
    }
}

const leave = async (req, res) => {
    const { _id, slotNumber } = req.body

    if (!_id || !slotNumber) {
        return res.status(400).json({ success: false, message: "Input all nessary" })
    }

    if (!/^[ABC]/.test(slotNumber)) {
        return res.status(400).json({ success: false, message: "Invalid slot number" })
    }

    const type = slotNumber.split("-")[0]
    const slotId = slotNumber.split("-")[1]

    if (isNaN(slotId) || Number(slotId) <= 0) {
        return res.status(400).json({ success: false, message: "Invalid slot number" })
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

        if (type === "B") {
            if (Number(slotId) > existingUser.twoWheeler.count) {
                return res.status(400).json({ success: false, message: "Invalid slot number" })
            }
            const slots = await existingUser.populate("twoWheelerParkingSlots")
            for (const item of slots.twoWheelerParkingSlots) {
                if (item.slotNumber === slotNumber) {
                    if (item.isFree) {
                        return res.status(400).json({ success: false, message: "Invalid slot number" })
                    }

                    const vehicle = await Vehicle.findById(item.vehicle)
                    if (!vehicle) {
                        return res.status(500).json({ success: false, message: "Internal Server Error" })
                    }
                    const arrivalAt = item.parkedAt
                    const departureAt = new Date().toISOString().split("T")[1].substring(0, 5)
                    const fee = existingUser.twoWheeler.fee
                    const fees = feeCalculator(arrivalAt, departureAt, fee)
                    const record = new Record({
                        user: existingUser._id,
                        bill: existingUser.bill,
                        date: new Date().toISOString().split("T")[0],
                        arrivalAt: arrivalAt,
                        departureAt: departureAt,
                        fee: fees,
                        registationNumber: vehicle.registrationNumber,
                        type: vehicle.type
                    })

                    const savedRecord = await record.save()
                    if (!savedRecord) {
                        return res.status(500).json({ success: false, message: "Internal Server Error" })
                    }

                    existingUser.bill = Number(existingUser.bill) + 1
                    await existingUser.save()

                    const slot = await ParkingSlot.findByIdAndUpdate(item.id, { vehicle: null, isFree: true, parkedAt: null })
                    if (!slot) {
                        return res.status(500).json({ success: false, message: "Internal Server Error" })
                    }
                    return res.status(200).json({ success: true, data: savedRecord })
                }
            }
            return res.status(400).json({ success: false, message: "Invalid slot number" })
        } else if (type === "A") {
            if (Number(slotId) > existingUser.threeWheeler.count) {
                return res.status(400).json({ success: false, message: "Invalid slot number" })
            }
            const slots = await existingUser.populate("threeWheelerParkingSlots")
            for (const item of slots.threeWheelerParkingSlots) {
                if (item.slotNumber === slotNumber) {
                    if (item.isFree) {
                        return res.status(400).json({ success: false, message: "Invalid slot number" })
                    }

                    const vehicle = await Vehicle.findById(item.vehicle)
                    if (!vehicle) {
                        return res.status(500).json({ success: false, message: "Internal Server Error" })
                    }
                    const arrivalAt = item.parkedAt
                    const departureAt = new Date().toISOString().split("T")[1].substring(0, 5)
                    const fee = existingUser.threeWheeler.fee
                    const fees = feeCalculator(arrivalAt, departureAt, fee)
                    const record = new Record({
                        user: existingUser._id,
                        bill: existingUser.bill,
                        date: new Date().toISOString().split("T")[0],
                        arrivalAt: arrivalAt,
                        departureAt: departureAt,
                        fee: fees,
                        registationNumber: vehicle.registrationNumber,
                        type: vehicle.type
                    })

                    const savedRecord = await record.save()
                    if (!savedRecord) {
                        return res.status(500).json({ success: false, message: "Internal Server Error" })
                    }

                    existingUser.bill = Number(existingUser.bill) + 1
                    await existingUser.save()

                    const slot = await ParkingSlot.findByIdAndUpdate(item.id, { vehicle: null, isFree: true, parkedAt: null })
                    if (!slot) {
                        return res.status(500).json({ success: false, message: "Internal Server Error" })
                    }
                    return res.status(200).json({ success: true, data: savedRecord })
                }
            }
            return res.status(400).json({ success: false, message: "Invalid slot number" })
        } else {
            if (Number(slotId) > existingUser.fourWheeler.count) {
                return res.status(400).json({ success: false, message: "Invalid slot number" })
            }
            const slots = await existingUser.populate("fourWheelerParkingSlots")
            for (const item of slots.fourWheelerParkingSlots) {
                if (item.slotNumber === slotNumber) {
                    if (item.isFree) {
                        return res.status(400).json({ success: false, message: "Invalid slot number" })
                    }

                    const vehicle = await Vehicle.findById(item.vehicle)
                    if (!vehicle) {
                        return res.status(500).json({ success: false, message: "Internal Server Error" })
                    }
                    const arrivalAt = item.parkedAt
                    const departureAt = new Date().toISOString().split("T")[1].substring(0, 5)
                    const fee = existingUser.fourWheeler.fee
                    const fees = feeCalculator(arrivalAt, departureAt, fee)
                    const record = new Record({
                        user: existingUser._id,
                        bill: existingUser.bill,
                        date: new Date().toISOString().split("T")[0],
                        arrivalAt: arrivalAt,
                        departureAt: departureAt,
                        fee: fees,
                        registationNumber: vehicle.registrationNumber,
                        type: vehicle.type
                    })

                    const savedRecord = await record.save()
                    if (!savedRecord) {
                        return res.status(500).json({ success: false, message: "Internal Server Error" })
                    }

                    existingUser.bill = Number(existingUser.bill) + 1
                    await existingUser.save()

                    const slot = await ParkingSlot.findByIdAndUpdate(item.id, { vehicle: null, isFree: true, parkedAt: null })
                    if (!slot) {
                        return res.status(500).json({ success: false, message: "Internal Server Error" })
                    }
                   return  res.status(200).json({ success: true, data: savedRecord })
                }
            }
            return res.status(400).json({ success: false, message: "Invalid slot number" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error"})
    }
}

const getCount = async(req,res) => {
    const { _id} = req.body

    if (!_id) {
        return res.status(400).json({ success: false, message: "Input all nessary" })
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const id = new mongoose.Types.ObjectId(_id)

    try{
        const user = await User.findById(id).populate('twoWheelerParkingSlots').populate('threeWheelerParkingSlots').populate('fourWheelerParkingSlots')

        if(!user){
            return res.status(400).json({ success: false, message: "User not found" });
        }


        const totalTwoWheeler = user.twoWheeler.slots
        const totalThreeWheeler = user.threeWheeler.slots
        const totalFourWheeler = user.fourWheeler.slots
        let twoWheeler = 0
        let threeWheeler = 0
        let fourWheeler = 0

        if(user.twoWheeler.slots){
            for (const item of user.twoWheelerParkingSlots) {
                if(!item.isFree){
                    twoWheeler++
                }
            }
        }else{
            twoWheeler = null
        }

        if(user.threeWheeler.slots){
            for (const item of user.threeWheelerParkingSlots) {
                if(!item.isFree){
                    threeWheeler++
                }
            }
        }else{
            threeWheeler = null
        }

        if(user.fourWheeler.slots){
            for (const item of user.fourWheelerParkingSlots) {
                if(!item.isFree){
                    fourWheeler++
                }
            }
        }else{
            fourWheeler = null
        }

        return res.status(200).json({ success: true, data: {totalTwoWheeler, totalThreeWheeler, totalFourWheeler, twoWheeler,threeWheeler,fourWheeler}})
    }catch(error){
        return res.status(400).json({ success: false, message: "Internal Server Error" });
    }

}
const vehicleController = {
    park,
    leave,
    getCount
}

module.exports = { vehicleController }