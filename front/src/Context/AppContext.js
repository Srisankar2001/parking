import React, { createContext, useEffect, useState } from 'react'
import axiosInstance from '../Config/AxoisConfig'

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const [id, setId] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/auth")
                if (response.data.success) {
                    setId(response.data.data._id)
                }else{
                    setId(null)
                }
            } catch (error) {
               setId(null)
            }
        }
        fetchData()
    },[])
    return (
        <AppContext.Provider value={id}>
            {children}
        </AppContext.Provider>
    )
}
