const { default: axiosInstance } = require("../Config/AxoisConfig")

export const Logout = async() => {
    try{
        const response = await axiosInstance.get("/auth/logout")
        if(response.data.success){
            alert(response.data.message)
        }
    }catch(error){
        alert("Internal Server Error")
    }
}