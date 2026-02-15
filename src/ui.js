
// UI FUNCTIONS

let currentTempCelsius = null;
let isCelsius = true;


// DOM Elements
const currentWeatherDiv = document.getElementById("currentWeather");
const forecastContainer = document.getElementById("forecastContainer");
const errorBox = document.getElementById("errorBox");
const recentContainer = document.getElementById("recentContainer");
const recentDropdown = document.getElementById("recentDropdown");
const toggleContainer = document.getElementById("toggleContainer");
const toggleBtn = document.getElementById("toggleTemp");


// DISPLAY CURRENT WEATHER

function displayCurrentWeather(data) {


    const { name, main, weather, wind } = data;

    currentTempCelsius = main.temp;
    isCelsius = true;

    const icon = weather[0].icon;
    const condition = weather[0].main;

    currentWeatherDiv.innerHTML = `
        <h1 class="text-8xl  font-black font-extrabold tracking-tight">

        <h2 class="text-3xl font-bold mb-2">${name}</h2>
        <img class="mx-auto"
            src="https://openweathermap.org/img/wn/${icon}@2x.png" />
        <p id="temperature" class="text-4xl font-bold">
            ${main.temp.toFixed(1)} °C
        </p>
        <p class="mt-2">Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
    `;
    currentWeatherDiv.classList.add("fade-in");
    currentWeatherDiv.classList.remove("hidden");
    toggleContainer.classList.remove("hidden");
    


    updateBackground(condition);
    checkExtremeTemperature(main.temp);
}


// DISPLAY 5-DAY FORECAST

function displayForecast(data) {

    forecastContainer.innerHTML = "";

    const dailyData = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    dailyData.forEach(day => {

        const date = new Date(day.dt_txt).toLocaleDateString();
        const icon = day.weather[0].icon;

        const card = document.createElement("div");
        card.className =
            "bg-white/20 backdrop-blur-lg text-white p-4 rounded-xl min-w-[150px] text-center shadow";

        card.innerHTML = `
            <p class="font-bold mb-2">${date}</p>
            <img class="mx-auto"
                src="https://openweathermap.org/img/wn/${icon}@2x.png" />
            <p>Temp: ${day.main.temp.toFixed(1)} °C</p>
            <p>Wind: ${day.wind.speed} m/s</p>
            <p>Humidity: ${day.main.humidity}%</p>
        `;

        forecastContainer.appendChild(card);
        forecastContainer.classList.add("fade-in");

    });

    forecastContainer.classList.remove("hidden");
}


// ERROR HANDLING UI

function showError(message) {
    errorBox.textContent = message;
    errorBox.classList.remove("hidden");

    setTimeout(() => {
        errorBox.classList.add("hidden");
    }, 3000);
}


// UPDATE RECENT DROPDOWN

function updateRecentDropdown() {

    const cities = getRecentCities();

    if (cities.length === 0) {
        recentContainer.classList.add("hidden");
        return;
    }

    recentDropdown.innerHTML = `<option value="">Recent Searches</option>`;

    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        recentDropdown.appendChild(option);
    });

    recentContainer.classList.remove("hidden");
}


// TEMPERATURE TOGGLE

toggleBtn.addEventListener("click", () => {

    if (currentTempCelsius === null) return;

    const tempElement = document.getElementById("temperature");

    if (isCelsius) {
        const fahrenheit = (currentTempCelsius * 9 / 5) + 32;
        tempElement.textContent = `${fahrenheit.toFixed(1)} °F`;
        toggleBtn.textContent = "Switch to °C";
        isCelsius = false;
    } else {
        tempElement.textContent = `${currentTempCelsius.toFixed(1)} °C`;
        toggleBtn.textContent = "Switch to °F";
        isCelsius = true;
    }
});


// DYNAMIC BACKGROUND

function updateBackground(condition) {

    const body = document.body;

    body.className =
        "min-h-screen flex flex-col items-center p-6 transition-all duration-500";

    if (condition === "Rain") {
        body.classList.add("bg-blue-900");
    } else if (condition === "Clear") {
        body.classList.add("bg-yellow-400");
    } else if (condition === "Clouds") {
        body.classList.add("bg-gray-500");
    } else {
        body.classList.add("bg-indigo-600");
    }
}


// EXTREME TEMPERATURE ALERT//

function checkExtremeTemperature(temp) {
    if (temp > 40) {
        showError("⚠ Extreme Heat Warning!");
    }
}
