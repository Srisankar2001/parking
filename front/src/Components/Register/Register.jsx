import React, { useState } from 'react'
import "./Register.css"
import axiosInstance from '../../Config/AxoisConfig'
import RegisterValidation from '../../Functions/RegistrationValidation'
import { Link } from 'react-router-dom'

export const Register = () => {
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
        twoWheelerCount: "",
        twoWheelerFee: "",
        threeWheelerCount: "",
        threeWheelerFee: "",
        fourWheelerCount: "",
        fourWheelerFee: "",
    })
    const [error, setError] = useState({
        name: "",
        email: "",
        password: "",
        twoWheeler: "",
        threeWheeler: "",
        fourWheeler: "",
    })
    const handleChange = (e) => {
        setInput(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleReset = () => {
        setInput({
            name: "",
            email: "",
            password: "",
            cpassword: "",
            twoWheelerCount: "",
            twoWheelerFee: "",
            threeWheelerCount: "",
            threeWheelerFee: "",
            fourWheelerCount: "",
            fourWheelerFee: "",
        })
        setError({
            name: "",
            email: "",
            password: "",
            twoWheeler: "",
            threeWheeler: "",
            fourWheeler: "",
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(input)
        const errors = RegisterValidation(input)
        setError(errors)
        if (Object.values(errors).every(item => item === "")) {
            const sendData = async () => {
                try {
                    const postData = {
                        name: input.name.trim().charAt(0).toUpperCase() + input.name.trim().substring(1).toLowerCase(),
                        email: input.email.toLowerCase().trim(),
                        password: input.password.trim(),
                        twoWheelerCount : input.twoWheelerCount !== "" ? input.twoWheelerCount : 0,
                        twoWheelerFee : input.twoWheelerCount !== "" ? input.twoWheelerFee : 0,
                        threeWheelerCount : input.threeWheelerCount !== "" ? input.threeWheelerCount : 0,
                        threeWheelerFee : input.threeWheelerCount !== "" ? input.threeWheelerFee : 0,
                        fourWheelerCount : input.fourWheelerCount !== "" ? input.fourWheelerCount : 0,
                        fourWheelerFee : input.fourWheelerCount !== "" ? input.fourWheelerFee : 0,
                    }
                    console.log(postData)
                    const response = await axiosInstance.post("/user/register", postData)
                    if (response.data.success) {
                        alert(response.data.message)
                    }
                    else {
                        alert(response.data.message)
                    }
                } catch (error) {
                    alert(error.response.data.message)
                }
            }
            sendData()
        }
    }
    return (
        <div className='register'>
            <div className='register-container'>
                <h1>Register</h1>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <div className='register-input-divs'>
                        <div className='register-input-div'>
                            <label>Name</label>
                            <input type='text' name='name' value={input.name} placeholder='Enter your name here' onChange={handleChange} />
                            {error.name && <h6>{error.name}</h6>}
                        </div>
                        <div className='register-input-div'>
                            <label>Email</label>
                            <input type='text' name='email' value={input.email} placeholder='Enter your email here' onChange={handleChange} />
                            {error.email && <h6>{error.email}</h6>}
                        </div>
                        <div className='register-input-div'>
                            <label>Password</label>
                            <input type='password' name='password' value={input.password} placeholder='Enter your password here' onChange={handleChange} />
                        </div>
                        <div className='register-input-div'>
                            <label>Confirm Password</label>
                            <input type='password' name='cpassword' value={input.cpassword} placeholder='Re-Enter your password here' onChange={handleChange} />
                        </div>
                        <div className='register-input-error'>
                            {error.password && <h6>{error.password}</h6>}
                        </div>
                        <div className='register-input-div'>
                            <label>Two Wheeler Count</label>
                            <input type='number' name='twoWheelerCount' value={input.twoWheelerCount} placeholder='Enter count here' onChange={handleChange} min="0" />
                        </div>
                        <div className='register-input-div'>
                            <label>Two Wheeler Fee</label>
                            <input type='number' name='twoWheelerFee' placeholder='Enter fee here' onChange={handleChange} min="0" />
                        </div>
                        <div className='register-input-error'>
                            {error.twoWheeler && <h6>{error.twoWheeler}</h6>}
                        </div>
                        <div className='register-input-div'>
                            <label>Three Wheeler Count</label>
                            <input type='number' name='threeWheelerCount' placeholder='Enter count here' onChange={handleChange} min="0" />
                        </div>
                        <div className='register-input-div'>
                            <label>Three Wheeler Fee</label>
                            <input type='number' name='threeWheelerFee' placeholder='Enter fee here' onChange={handleChange} min="0" />
                        </div>
                        <div className='register-input-error'>
                            {error.threeWheeler && <h6>{error.threeWheeler}</h6>}
                        </div>
                        <div className='register-input-div'>
                            <label>Four Wheeler Count</label>
                            <input type='number' name='fourWheelerCount' placeholder='Enter count here' onChange={handleChange} min="0" />
                        </div>
                        <div className='register-input-div'>
                            <label>Four Wheeler Fee</label>
                            <input type='number' name='fourWheelerFee' placeholder='Enter fee here' onChange={handleChange} min="0" />
                        </div>
                        <div className='register-input-error'>
                            {error.fourWheeler && <h6>{error.fourWheeler}</h6>}
                        </div>
                    </div>
                    <div className='register-button-div'>
                        <input type='submit' className='register-button-submit' value="Submit" />
                        <input type='reset' className='register-button-reset' value="Clear" />
                    </div>
                </form>
                <Link to="/"><h4>Don't have an accout. Click Here to register.</h4></Link>
            </div>
        </div>
    )
}
