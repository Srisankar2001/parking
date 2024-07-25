import React, { useContext, useEffect, useState } from 'react'
import "./Table.css"
import { AppContext } from '../../Context/AppContext'
import axiosInstance from '../../Config/AxoisConfig'
import { useNavigate } from 'react-router-dom'

export const Table = () => {
    const navigate = useNavigate()
    const _id = useContext(AppContext)
    const [input, setInput] = useState({
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
                console.log(response.data)
                if (response.data.success) {
                    setInput({
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
    const handleChange = (e) => {
        setInput(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleReset = () => {
        navigate("/table")
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const sendData = async() => {
            try{
                const postData = {
                    _id : _id,
                    twoWheelerCount: input.twoWheelerCount || 0,
                    twoWheelerFee: input.twoWheelerFee || 0,
                    threeWheelerCount: input.threeWheelerCount || 0,
                    threeWheelerFee: input.threeWheelerFee || 0,
                    fourWheelerCount: input.fourWheelerCount || 0,
                    fourWheelerFee: input.fourWheelerFee || 0,
                }
                const response = await axiosInstance.put("/user/update",postData)
                if(response.data.success){
                    alert(response.data.message)
                }else{
                    alert(response.data.message)
                }
            }catch(error){
                alert(error.response?.data?.message || "Internal Server Error")
            }
        }
        sendData()
    }
    return (
        <div className='table'>
            <div className='table-container'>
                <h1>Parking Slots & Fee</h1>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <table>
                        <tr>
                            <th>Vechicle</th>
                            <th>Slots Count</th>
                            <th>Fee</th>
                        </tr>
                        <tr>
                            <td>Bike</td>
                            <td><input type='number' name='twoWheelerCount' value={input.twoWheelerCount} onChange={handleChange} /></td>
                            <td><input type='number' name='twoWheelerFee' value={input.twoWheelerFee} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Auto</td>
                            <td><input type='number' name='threeWheelerCount' value={input.threeWheelerCount} onChange={handleChange} /></td>
                            <td><input type='number' name='threeWheelerFee' value={input.threeWheelerFee} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Car</td>
                            <td><input type='number' name='fourWheelerCount' value={input.fourWheelerCount} onChange={handleChange} /></td>
                            <td><input type='number' name='fourWheelerFee' value={input.fourWheelerFee} onChange={handleChange} /></td>
                        </tr>
                    </table>
                    <div className='table-button-div'>
                        <input type='submit' className='table-button-submit' value="Update" />
                        <input type='reset' className='table-button-reset' value="Clear" />
                    </div>
                </form>
            </div>
        </div>
    )
}
