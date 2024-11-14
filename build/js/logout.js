function logout(){
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
    localStorage.clear()
}

const logoutButton = document.getElementById("logout-btn");

logoutButton.addEventListener("click",logout())