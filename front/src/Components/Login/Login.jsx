import React, { useState } from 'react'
import "./Login.css"
import  LoginValidation  from '../../Functions/LoginValidation'
import axiosInstance from '../../Config/AxoisConfig'
import { Link, useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setInput(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleReset = () => {
        setInput({
            email: "",
            password: ""
        })
        setError({
            email: "",
            password: ""
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = LoginValidation(input)
        setError(errors)
        if(Object.values(errors).every(item => item === "")){
            const sendData = async() => {
                try{
                    const postData = {
                        email : input.email.toLowerCase().trim(),
                        password : input.password.trim()
                    }
                    const response = await axiosInstance.post("/auth",postData)
                    if(response.data.success){
                        alert(response.data.message)
                        navigate("/")
                    }
                    else{
                        alert(response.data.message)
                    }
                }catch(error){
                    alert(error.response.data.message)
                }
            }
            sendData()
        }
    }
    return (
        <div className='login'>
            <div className='login-container'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <div className='login-input-divs'>
                        <div className='login-input-div'>
                            <label>Email</label>
                            <input type='text' name='email' value={input.email} placeholder='Enter your email here' onChange={handleChange}/>
                            {error.email && <h6>{error.email}</h6>}
                        </div>
                        <div className='login-input-div'>
                            <label>Password</label>
                            <input type='password' name='password' value={input.password} placeholder='Enter your password here' onChange={handleChange}/>
                            {error.password && <h6>{error.password}</h6>}
                        </div>
                    </div>
                    <div className='login-button-div'>
                        <input type='submit' className='login-button-submit' value="Submit" />
                        <input type='reset' className='login-button-reset' value="Clear" />
                    </div>
                </form>
                <Link to="/register"><h4>Don't have an accout. Click Here to register.</h4></Link>
            </div>
        </div>
    )
}
