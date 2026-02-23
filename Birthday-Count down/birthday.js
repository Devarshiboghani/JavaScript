function birthdayCountdown() {

    let today = new Date();    // saj ki date
    let currentYear = today.getFullYear();

    // Apna birthday yahan set karo (Month - 1 hota hai)
    let birthday = new Date(currentYear, 1, 21);

    // 🎉 Check: Agar aaj birthday hai
    if (today.getDate() === 21 && today.getMonth() === 1) {
        document.querySelector(".countdown-box").innerHTML = "<h2 style='color:green;'>🎉 It's My Birthday! 🎂</h2>";
        return;  // Countdown stop
    }

    // Agar birthday iss saal nikal chuka hai
    if(today > birthday) {
        birthday = new Date(currentYear + 1, 1 ,21);
    }

    let diff = birthday - today;

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((diff / (1000 * 60)) % 60);
    let seconds = Math.floor((diff / (1000)) % 60);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

// Page load hote hi run ho
birthdayCountdown();

// Har second update ho
setInterval(birthdayCountdown, 1000);