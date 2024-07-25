const RegisterValidation = (input) => {
    const error = {
        name: "",
        email: "",
        password: "",
        twoWheeler: "",
        threeWheeler: "",
        fourWheeler: "",
    }

    const name = input.name.trim()
    const email = input.email.trim()
    const password = input.password.trim()
    const cpassword = input.cpassword.trim()
    const twoWheelerCount = input.twoWheelerCount
    const twoWheelerFee = input.twoWheelerFee
    const threeWheelerCount = input.threeWheelerCount
    const threeWheelerFee = input.threeWheelerFee
    const fourWheelerCount = input.fourWheelerCount
    const fourWheelerFee = input.fourWheelerFee

    if (name === "") {
        error.name = "Name field is empty"
    } else if (/\s/.test(name)) {
        error.name = "Invalid name"
    } else {
        error.name = ""
    }

    if (email === "") {
        error.email = "Email field is empty"
    } else if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) {
        error.email = "Invalid email"
    } else {
        error.email = ""
    }

    if (password === "" || cpassword === "") {
        if (password === "" && cpassword === "") {
            error.password = "Password and Confirm password fields are empty";
        } else if (password === "") {
            error.password = "Password field is empty";
        } else {
            error.password = "Confirm Password field is empty";
        }
    } else if (/\s/.test(password) || /\s/.test(cpassword)) {
        if (/\s/.test(password) && /\s/.test(cpassword)) {
            error.password = "Invalid passwords in Password and Confirm password";
        } else if (/\s/.test(password)) {
            error.password = "Invalid password in Password field";
        } else {
            error.password = "Invalid password in Confirm password field";
        }
    } else if (password !== cpassword) {
        error.password = "Password and Confirm password must be the same";
    } else {
        error.password = "";
    }
    
    if(twoWheelerCount === "" && threeWheelerCount === "" && fourWheelerCount === ""){
        error.twoWheeler = "No parking is added"
        error.threeWheeler = "No parking is added"
        error.fourWheeler = "No parking is added"
    }else{
        if (twoWheelerCount > 0) {
            if (twoWheelerFee <= 0) {
                error.twoWheeler = "Two Wheeler Fee must be greater than zero"
            } else {
                error.twoWheeler = ""
            }
        } else {
            error.twoWheeler = ""
        }
    
        if (threeWheelerCount > 0) {
            if (threeWheelerFee <= 0) {
                error.threeWheeler = "Three Wheeler Fee must be greater than zero"
            } else {
                error.threeWheeler = ""
            }
        } else {
            error.threeWheeler = ""
        }
    
        if (fourWheelerCount > 0) {
            if (fourWheelerFee <= 0) {
                error.fourWheeler = "Four Wheeler Fee must be greater than zero"
            } else {
                error.fourWheeler = ""
            }
        } else {
            error.fourWheeler = ""
        }
    
    }

   
    return error
}

export default RegisterValidation;
