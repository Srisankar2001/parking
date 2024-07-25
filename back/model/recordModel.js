const mongoose = require("mongoose")

const recordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    bill:{
        type:Number,
        required:true
    },
    date: {
        type: String,
        required: true
    },
    arrivalAt: {
        type: String,
        required: true
    },
    departureAt: {
        type: String,
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
    registationNumber: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['TwoWheeler', 'ThreeWheeler', 'FourWheeler'],
        required: true
    }
})

const Record = mongoose.model("record", recordSchema)

module.exports = { Record }