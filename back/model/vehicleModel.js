const mongoose = require("mongoose")

const vehicleSchema = new mongoose.Schema({
    registrationNumber : {
        type:String,
        required:true
    },
    type: {
        type:String,
        enum:['TwoWheeler','ThreeWheeler','FourWheeler'],
        required:true

    }
})

const Vehicle = mongoose.model("vehicle",vehicleSchema)

module.exports = {Vehicle}