const city = document.querySelector("#city");   
const result = document.querySelector("#result");
const button = document.querySelector('button');

function setBackground(weather) {
    const body = document.body;
    body.style.transition = "background 1s ease";

    switch(weather) {
        case "Clear":
            body.style.background = "linear-gradient(135deg, #f6d365, #fda085)"; // Sunny
            break;
        case "Clouds":
            body.style.background = "linear-gradient(135deg, #d7d2cc, #304352)"; // Cloudy
            break;
        case "Rain":
        case "Drizzle":
            body.style.background = "linear-gradient(135deg, #4e54c8, #8f94fb)"; // Rainy
            break;
        case "Thunderstorm":
            body.style.background = "linear-gradient(135deg, #373b44, #4286f4)"; // Storm
            break;
        case "Snow":
            body.style.background = "linear-gradient(135deg, #83a4d4, #b6fbff)"; // Snowy
            break;
        case "Mist":
        case "Haze":
        case "Fog":
            body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)"; // Misty
            break;
        default:
            body.style.background = "linear-gradient(135deg, #ff9a3c, #ff6a00)"; // Default
    }

    body.style.transition = "background 1s ease";
}

button.addEventListener("click", () => {
    
    const cityName = city.value.trim();
    const apiKey = "e464296fe40eb586a2f5f581501321ef"; 

    // Empty input check
    if (cityName === "") {
        result.innerHTML = "⚠ Please enter city name";
        return;
    }

    // Loading message
    result.innerHTML = `<div class="spinner"></div>`;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {

      if (data.cod === 200) {

        // Set dynamic background
        setBackground(data.weather[0].main);

        result.innerHTML = `
        <div class="weather-box">
            <h3>${data.name}</h3>

            <div class="weather-info">
                <p>🌡 Temperature: ${Math.round(data.main.temp)} °C</p>
                <p>☁ ${data.weather[0].description}</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
                <p>🌬 Wind Speed: ${(data.wind.speed * 3.6).toFixed(1)} km/h</p>
            </div>
        </div>
         `;

        } else {
            result.innerHTML = "❌ City not found!";
        }

    })

    .catch(err => {
        result.innerHTML = "⚠ Error fetching data";
        console.log(err);
    });

})

//  ENTER KEY SUPPORT
city.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        button.click();
    }
});