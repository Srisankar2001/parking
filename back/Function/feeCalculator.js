const feeCalculator = (startTime,endTime,fee) => {
    
    let startHour = Number(startTime.split(":")[0])
    let startMin = Number(startTime.split(":")[1])

    let endHour = Number(endTime.split(":")[0])
    let endMin = Number(endTime.split(":")[1])

    if(endMin < startMin){
        endHour = endHour - 1
        endMin = endMin + 60
    }

    const fees = ((endHour - startHour) + (endMin - startMin)/60 ) * fee

    return fees.toFixed(2)
}

module.exports = {feeCalculator}