import React from 'react'
import "./PrintBill.css"

export const PrintBill = (props) => {
  return (
    <div className='printBill'>
        <div className='printBill-heading'>
            <hr/>
            <h3>Parking Receipt</h3>
            <hr/>
        </div>
        <div className='printBill-body'>
            <h4>Date : {props.date}</h4>
            <h4>Arrival : {props.arrivalAt}</h4>
            <h4>Departure : {props.departureAt}</h4>
            <h3>Paid : {props.fee} LKR</h3>
            <h5>Bill No : {props.bill}</h5>
        </div>
        <div className='printBill-footer'>
            <hr/>
            <h4>Thank You And Drive Safely!</h4>
        </div>
    </div>
  )
}
