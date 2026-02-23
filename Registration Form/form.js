let form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validation()) {
        alert("Registration Successful!");
        form.reset();
    }

})

function validation() {
    let isValid = true;
    clearErrors();

    let fname = document.querySelector("#fname").value;
    let lname = document.querySelector("#lname").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let mobile = document.querySelector("#mobile").value;
    let gender = document.querySelector('input[name="gender"]:checked');

    if(fname == ""){
        document.getElementById('fnameErr').innerHTML = 'Firstname is empty'
        isValid = false;
    }else if(fname.length < 5){
        document.getElementById('fnameErr').innerHTML = 'Firstname have minimum 5 characters'
        isValid = false;
    }

    if(lname == ""){
        document.getElementById('lnameErr').innerHTML = 'Lastname is empty'
        isValid = false;
    }

    if(email == ""){
        document.getElementById('emailErr').innerHTML = 'Email is empty'
        isValid = false;
    }else{
        let pattern = /^\S+@\S+\.\S+$/
        if(!pattern.test(email)) {
            document.getElementById('emailErr').innerHTML = 'Email Invalid Formate'
            isValid = false;
        }
    }

    if(password == ""){
        document.getElementById('passErr').innerHTML = 'Password is empty'
        isValid = false;
    }else if(password.length < 6){
        document.getElementById('passErr').innerHTML = 'Password minimum lenght is 6.'
        isValid = false;
    }
    else {
        let pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
        if(!pattern.test(password)) {
        document.getElementById('passErr').innerHTML = 'Password Invalid Formate'
        isValid = false;
        }
    }

    if(mobile == ""){
        document.getElementById('mobileErr').innerHTML = 'Mobile is empty'
        isValid = false;
    }else if(mobile.length != 10){
        document.getElementById('mobileErr').innerHTML = 'Mobile only 10 digits'
        isValid = false;
    }

    if(gender == null){
        document.getElementById('genderErr').innerHTML = 'Select Any One'
        isValid = false;
    }

    return isValid;
}

function clearErrors() {
    let errors = document.querySelectorAll('.errors');
    errors.forEach(err => err.innerHTML = "");
}