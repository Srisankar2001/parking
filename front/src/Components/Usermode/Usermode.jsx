import React, { useContext, useEffect, useState } from 'react'
import "./Usermode.css"
import { Link } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'

import bike from "../../Assets/bike.png"
import auto from "../../Assets/auto.png"
import car from "../../Assets/car.png"
import axiosInstance from '../../Config/AxoisConfig'

export const Usermode = () => {
    const _id = useContext(AppContext)
    const [input, setInput] = useState({
        type: "",
        registrationNumber: ""
    })
    const [error, setError] = useState("")
    const [state, setState] = useState({
        twoWheelerCount: "",
        twoWheelerFee: "",
        threeWheelerCount: "",
        threeWheelerFee: "",
        fourWheelerCount: "",
        fourWheelerFee: "",
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const postData = {
                    _id: _id
                }
                const response = await axiosInstance.post("/user", postData)
                if (response.data.success) {
                    setState({
                        twoWheelerCount: response.data.data.twoWheelerCount,
                        twoWheelerFee: response.data.data.twoWheelerFee,
                        threeWheelerCount: response.data.data.threeWheelerCount,
                        threeWheelerFee: response.data.data.threeWheelerFee,
                        fourWheelerCount: response.data.data.fourWheelerCount,
                        fourWheelerFee: response.data.data.fourWheelerFee,
                    })
                } else {
                    alert(response.data.message)
                }
            } catch (error) {
                alert(error.response?.data?.message || "Internal Server Error")
            }
        }
        fetchData()
    }, [_id])
    const handleSubmit = (e) => {
        e.preventDefault()
        if (input.registrationNumber.trim() !== "") {
            const sendData = async () => {
                try {
                    const postData = {
                        _id: _id,
                        type: input.type,
                        registrationNumber: input.registrationNumber.trim()
                    }
                    const response = await axiosInstance.post("/vehicle/park", postData)
                    if (response.data.success) {
                        alert(response.data.message)
                        setInput({
                            type: "",
                            registrationNumber: ""
                        })
                        setError("")
                    } else {
                        alert(response.data.message)
                    }
                } catch (error) {
                    alert(error.response?.data?.message || "Internal Server Error")
                }
            }
            sendData()
        } else {
            setError("Registration Number field empty")
        }
    }
    return (
        <div className='usermode'>
            <div className='usermode-container'>
                {!input.type && <div className='park'>
                    {state.twoWheelerCount && <div onClick={() => { setInput(prev => ({ ...prev, type: 'TwoWheeler' })) }}>
                        <img src={bike} alt="" />
                        <span>Bike - {Number(state.twoWheelerFee).toFixed(2)} LKR</span>
                    </div>}
                    {state.threeWheelerCount && <div onClick={() => { setInput(prev => ({ ...prev, type: 'ThreeWheeler' })) }}>
                        <img src={auto} alt="" />
                        <span>Auto - {Number(state.threeWheelerFee).toFixed(2)} LKR</span>
                    </div>}
                    {state.fourWheelerCount && <div onClick={() => { setInput(prev => ({ ...prev, type: 'FourWheeler' })) }}>
                        <img src={car} alt="" />
                        <span>Car - {Number(state.fourWheelerFee).toFixed(2)} LKR</span>
                    </div>}
                </div>}
                {input.type && <form>
                    <div className='usermode-form'>
                        <label>Registration Number</label>
                        <input type='text' name='registrationNumber' value={input.registrationNumber} placeholder="Enter Registration Number" onChange={(e) => { setInput(prev => ({ ...prev, [e.target.name]: e.target.value })) }} />
                        {error && <h6>{error}</h6>}
                    </div>
                    <div className='usermode-button'>
                        <input type='submit' value="Submit" className='usermode-button-submit' onClick={handleSubmit} />
                        <input type='button' value="Cancel" onClick={() => {
                            setInput({ type: "", registrationNumber: "" })
                            setError("")
                        }} className='usermode-button-cancel' />
                    </div>
                </form>}
            </div>
        </div>
    )
}
