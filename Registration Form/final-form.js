let form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(validation()) {
        alert("Registration Successfull");
        form.reset();
    }

})

function validation() {
    let isValid = true;
    clearErrors();

    let fname = document.querySelector('#fname').value;
    let lname = document.querySelector('#lname').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let mobile = document.querySelector('#mobile').value;
    let gender = document.querySelector('input[name="gender"]:checked');

    if(fname == ""){
        setError('fnameErr', 'Firstname is empty')
        isValid = false;
    }else if(fname.length < 5){
        setError('fnameErr', 'Firstname have minimum 5 characters')
        isValid = false;
    }

     if(lname == ""){
        setError('lnameErr', 'Lastname is empty')
        isValid = false;
     }

     if(email == ""){
        setError('emailErr', 'Email is empty')
        isValid = false;
     }else{
        let pattern =  /^\S+@\S+\.\S+$/
        if(!pattern.test(email)) {
        setError('emailErr', 'Email Invalid Formate')
        isValid = false;
        }
     }

    if(password == ""){
        setError('passErr', 'Password is empty')
        isValid = false;
    }else if(password.length < 6){
        setError('passErr', 'Password minimum lenght is 6.')
        isValid = false;
    }
    else {
        let pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
        if(!pattern.test(password)) {
        setError('passErr', 'Password Invalid Formate')
        isValid = false;
        }
    }

    if(mobile == ""){
        setError('mobileErr', 'Mobile is empty')
        isValid = false;
    }else if(mobile.length != 10){
        setError('mobileErr', 'Mobile only 10 digits')
        isValid = false;
    }

    if(gender == null) {
        setError('genderErr', 'Select Any One')
        isValid = false;
    }

    return isValid;
}

function clearErrors() {
    let errors = document.querySelectorAll('.errors');
    errors.forEach(err => err.innerHTML = "");
}

function setError(id, text) {
    document.getElementById(`${id}`).innerHTML = text;
}