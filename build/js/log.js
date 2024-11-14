const log = document.getElementById("log")
const dataContainer = document.getElementById("data-container")
const phone = document.getElementById("phone");
const phoneError = document.getElementById("phone-error");
const password = document.getElementById("password");
const textlength = document.getElementById("length");
const passwordViewer = document.getElementById("password-view")




function ValidatePhoneNumber(phoneNumber) {
    if (phoneNumber.value.length === 10) {
        phone.classList.add("border-green-400")
        phone.classList.remove("border-red-400")
        phoneError.classList.add("hidden")
        phoneError.classList.remove("block")
    }
    else {
        phone.classList.remove("border-green-400")
        phone.classList.add("border-red-400")
        phoneError.classList.remove("hidden")
        phoneError.classList.add("block")
    }
}

phone.addEventListener("keyup", () => {
    ValidatePhoneNumber(phone)
})



function ValidatePassword(passwordValue, length, confirmChecker) {

    // Validate length
    if (passwordValue.value.length >= 8) {
        length.classList.remove("block");
        length.classList.add("hidden");
    } else {
        length.classList.remove("hidden");
        length.classList.add("block");
    }

    if (length.classList.contains("block")) {
        passwordValue.classList.add("border-red-400")
        passwordValue.classList.remove("border-green-400")
    }
    else {
        passwordValue.classList.remove("border-red-400")
        passwordValue.classList.add("border-green-400")
    }
}

password.addEventListener("keyup", () => {
    ValidatePassword(password, textlength)
  confirmPass()
})


passwordViewer.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    showPassword(password)
})

const showPassword = (value) => {
    if (value.type === "password") {
        value.type = "text"
    }
    else {
        value.type = "password"
    }
}