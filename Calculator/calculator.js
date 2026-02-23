let display = document.getElementById("display");

function appendValue(value) {

    // Agar display me sirf 0 hai
    if (display.value === "0") {
        display.value = value;   // 0 ko replace karo
    } else {
        display.value += value;  // normal add karo
    }
}

function clearDisplay() {
    display.value = "0";   // clear karne par 0 dikhe
}

function deleteLast() {
    display.value = display.value.slice(0, -1);

    // Agar sab delete ho gaya to 0 dikhao
    if (display.value === "") {
        display.value = "0";
    }
}

function calculate() {
    try{
        display.value = eval(display.value);
    }
    catch{
        display.value = "Error";
    }
}