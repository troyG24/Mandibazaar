const form = document.getElementById('form');
const fname = document.getElementById('fname');
const mname = document.getElementById('mname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const phno = document.getElementById('phno');
const saddr = document.getElementById('saddr');
const pin = document.getElementById('pin');
const gst = document.getElementById('gst');
const pan = document.getElementById('pan');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const fnameError = document.getElementsByClassName("fnameError")[0];
const mnameError = document.getElementsByClassName("mnameError")[0];
const lnameError = document.getElementsByClassName("lnameError")[0];
const emailError = document.getElementsByClassName("emailError")[0];
const phnoError = document.getElementsByClassName("phnoError")[0];
const saddrError = document.getElementsByClassName("saddrError")[0];
const pinError = document.getElementsByClassName("pinError")[0];
const gstError = document.getElementsByClassName("gstError")[0];
const panError = document.getElementsByClassName("panError")[0];
const passwordError = document.getElementsByClassName("passwordError")[0];
const password2Error = document.getElementsByClassName("password2Error")[0];

let error = {};

form.addEventListener('submit', e => {
    e.preventDefault();

    checkEmpty();
});

function checkEmpty() {
    for (let key in error) {
      delete error[key];
    }

    fnameError.style.display = "none";
    mnameError.style.display = "none";
    lnameError.style.display = "none";
    emailError.style.display = "none";
    phnoError.style.display = "none";
    saddrError.style.display = "none";
    pinError.style.display = "none";
    gstError.style.display = "none";
    panError.style.display = "none";
    passwordError.style.display = "none";
    password2Error.style.display = "none";

    fname.classList.remove("border-red-500");
    mname.classList.remove("border-red-500");
    lname.classList.remove("border-red-500");
    email.classList.remove("border-red-500");
    phno.classList.remove("border-red-500");
    saddr.classList.remove("border-red-500");
    pin.classList.remove("border-red-500");
    gst.classList.remove("border-red-500");
    pan.classList.remove("border-red-500");
    password.classList.remove("border-red-500");
    password2.classList.remove("border-red-500");
    
    const fnameValue = fname.value.trim();
    const mnameValue = mname.value.trim();
    const lnameValue = lname.value.trim();
    const phnoValue = phno.value.trim();
    const emailValue = email.value.trim();
    const saddrValue = saddr.value.trim();
    const pinValue = pin.value.trim();
    const gstValue = gst.value.trim();
    const panValue = pan.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    //Empty fields are Checked
    if (fnameValue === "") {
        error.fname = "First Name is required";
    }else if (fnameValue !== "") {
        if (!fnameValue.match(/^[A-Za-z]+$/)) {
          error.fname = "First Name must be letters only";
        }else{
            fname.classList.add("border-green-500");
            fnameSuccess.style.display = "block";
            fnameSuccess.innerHTML = fname;
        }
    }

    if (mnameValue === "") {
        error.mname = "Middle Name is required";
    }else if (mnameValue !== "") {
        if (!mnameValue.match(/^[A-Za-z]+$/)) {
          error.nname = "Middle Name must be letters only";
        }else{
            mname.classList.add("border-green-500");
            mnameSuccess.style.display = "block";
            mnameSuccess.innerHTML = mname;
        }
    }

    if (lnameValue === "") {
        error.lname = "Last Name is required";
    }else if (lnameValue !== "") {
        if (!lnameValue.match(/^[A-Za-z]+$/)) {
          error.lname = "Last Name must be letters only";
        }
    }

    if (emailValue === "") {
        error.email = "Email is required";
    }else if (phnoValue !== "") {
        if (!phnoValue.match(/^\d{10}$/)) {
          error.phno = "Provide a numeric value";
        }else if(phnoValue !== 10){
            error.phno = "Enter valid 10 digit phone number";
        }
    }

    if (phnoValue === "") {
        error.phno = "Phone number is required";
    }else if (emailValue !== "") {
        if (!emailValue.match(/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/)) {
          error.phno = "Enter a valid email address";
        }
    }

    if (saddrValue === "") {
        error.saddr = "Shop address is required";
    }

    if (pinValue === "") {
        error.pin = "Pin code is required";
    }else if (pinValue !== "") {
        if (!pinValue.match(/^\d{6}$/)) {
          error.pin = "Enter a valid 6 digit pincode";
        }
    }

    if (gstValue === "") {
        error.gst = "GSTIN is required";
    }else if (gstValue !== "") {
        if (!gstValue.match(/^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([zZ]){1}([0-9a-zA-Z]){1}?$/)) {
          error.gst = "Enter a valid GST number";
        }
    }

    if (panValue === "") {
        error.pan = "Pan number is required";
    }else if (panValue !== "") {
        if (!panValue.match(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/)) {
          error.pan = "Enter a valid pan number";
        }
    }

    if (passwordValue === "") {
        error.password = "Password is required";
    }else if (passwordValue !== "") {
        if (passwordValue.length <= 8) {
          error.password = "Password must have atleast 8 character";
        }else if(!passwordValue.match(/^[A-Z]$/)){
            error.password = "Password must contain at least one uppercase Letter";
        }else if(!passwordValue.match(/^[a-z]$/)){
            error.password = "Password must contain at least one lowercase Letter";
        }else if(!passwordValue.match(/^[0-9]$/)){
            error.password = "Password must contain at least one numeric value";
        }
    }

    if (password2Value === "") {
        error.password2 = "Password is required";
    }else if (password2Value !== ""){
        if(password2Value !== passwordValue){
            error.password2 = "Enter valid password";
        }
    }

    if (Object.keys(error).length > 0) {
        displayError();
      } else {
        //submit the form with a delay of 2 seconds
        //change the button innerText to submitting and add no-cursor class and disabled attribute to it
        buttonSubmit.value = "Submitting...";
        buttonSubmit.setAttribute("disabled", "disabled");
    
    //set a delay of 2 seconds since we dont have an api endpoint to send the data to just mimic the process
        new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve(submitForm());
          }, 2000);
        });
    }
}

function displayError() {
    //set all errors to their respectivey and also changing hidden 
    if (error.fname) {
      fname.classList.add("border-red-500");
      fnameError.style.display = "block";
      fnameError.innerHTML = error.fname;
    }
    if (error.mname) {
      mname.classList.add("border-red-500");
      mnameError.style.display = "block";
      mnameError.innerHTML = error.mname;
    }
    if (error.lname) {
      lname.classList.add("border-red-500");
      lnameError.style.display = "block";
      lnameError.innerHTML = error.lname;
    }
    if (error.email) {
      email.classList.add("border-red-500");
      emailError.style.display = "block";
      emailError.innerHTML = error.email;
    }
    if (error.phno) {
        phno.classList.add("border-red-500");
        phno.style.display = "block";
        phno.innerHTML = error.phno;
    }
    if (error.saddr) {
      saddr.classList.add("border-red-500");
      saddrError.style.display = "block";
      saddrError.innerHTML = error.saddr;
    }
    if (error.pin) {
      pin.classList.add("border-red-500");
      pinError.style.display = "block";
      pinError.innerHTML = error.pin;
    }
    if (error.gst) {
      gst.classList.add("border-red-500");
      gstError.style.display = "block";
      gstError.innerHTML = error.gst;
    }
    if (error.pan) {
      pan.classList.add("border-red-500");
      panError.style.display = "block";
      panError.innerHTML = error.pan;
    }
    if (error.password) {
      password.classList.add("border-red-500");
      passwordError.style.display = "block";
      passwordError.innerHTML = error.password;
    }
    if (error.password2) {
      password2.classList.add("border-red-500");
      password2Error.style.display = "block";
      password2Error.innerHTML = error.password2;
    }
}