const LoginValidation = (input) => {
    const error = {
        email: "",
        password: ""
    }
    const email = input.email.trim()
    const password = input.password.trim()

    if (email === ""){
        error.email = "Email field is empty"
    }else if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))){
        error.email = "Invaid email"
    }else{
        error.email = ""
    }

    if(password === ""){
        error.password = "Password field is empty"
    }else{
        error.password = ""
    }

    return error
}

export default LoginValidation;