const country = document.querySelector("#country");
const result = document.querySelector("#result");
const button = document.querySelector("button");

    fetch("https://disease.sh/v3/covid-19/countries")
    .then(res => res.json())
    .then(data => {

        country.innerHTML = "";

        data.forEach(c => {

        const option = document.createElement("option");

        option.value = c.country;
        option.textContent = c.country;

        country.appendChild(option);

        });

    });

// Button click par data show hoga

button.addEventListener("click", () => {

    result.innerHTML = "Loading data...";

    fetch(`https://disease.sh/v3/covid-19/countries/${country.value}`)

    .then(res => res.json())

    .then(data => {

    result.innerHTML = `
    <div class="country">
    <img src="${data.countryInfo.flag}" width="40">
    <h2>${data.country}</h2>
    </div>

    <p>🦠 Total Cases: ${data.cases.toLocaleString()}</p>
    <p>💀 Total Deaths: ${data.deaths.toLocaleString()}</p>
    <p>💚 Recovered: ${data.recovered.toLocaleString()}</p>
    <p>📅 Today Cases: ${data.todayCases.toLocaleString()}</p>
    `;

    })
        .catch(err => {
            result.innerHTML = "❌ Error fetching data";
            console.log(err);
        });

})