function calculateAge(){

    let dobInput = document.getElementById("dob").value;

    if(dobInput === ""){
        alert("Please select your birth date");
        return;
    }

    let dob = new Date(dobInput);
    let today = new Date();

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if(days < 0){
        months--;
        let lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if(months < 0){
        years--;
        months += 12;
    }

    document.getElementById("years").innerText = years;
    document.getElementById("months").innerText = months;
    document.getElementById("days").innerText = days;

}