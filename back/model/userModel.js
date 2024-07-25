const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    bill: {
        type: Number,
        default: 1
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    twoWheeler: {
        fee: {
            type: Number,
            default: 0
        },
        slots: {
            type: Number,
            default: 0
        }
    },
    threeWheeler: {
        fee: {
            type: Number,
            default: 0
        },
        slots: {
            type: Number,
            default: 0
        }
    },
    fourWheeler: {
        fee: {
            type: Number,
            default: 0
        },
        slots: {
            type: Number,
            default: 0
        }
    },
    twoWheelerParkingSlots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parkingslot'
    }],
    threeWheelerParkingSlots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parkingslot'
    }],
    fourWheelerParkingSlots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parkingslot'
    }]
})

const User = mongoose.model("user", userSchema)

module.exports = { User }