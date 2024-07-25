const mongoose = require("mongoose")

const parkingSlotSchema = new mongoose.Schema({
    slotNumber: {
        type: String,
        required: true
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vehicle',
        default: null
    },
    isFree: {
        type: Boolean,
        default: true
    },
    parkedAt:{
        type:String,
        default:null
    }
})

const ParkingSlot = mongoose.model("parkingslot",parkingSlotSchema)

module.exports = {ParkingSlot}