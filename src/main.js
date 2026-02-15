
// MAIN APPLICATION

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
//const recentDropdown = document.getElementById("recentDropdown");


// SEARCH BY CITY

async function handleCitySearch(city) {

    if (!city || city.trim() === "") {
        showError("Please enter a valid city name.");
        return;
    }

    try {
        const weatherData = await fetchWeatherByCity(city);
        const forecastData = await fetchForecastByCity(city);

        displayCurrentWeather(weatherData);
        displayForecast(forecastData);

        saveCity(city);
        updateRecentDropdown();

        cityInput.value = "";

    } catch (error) {
        showError(error.message);
    }
}


// Search button click
searchBtn.addEventListener("click", () => {
    handleCitySearch(cityInput.value.trim());
});


// Enter key support
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleCitySearch(cityInput.value.trim());
    }
});


// USE CURRENT LOCATION

locationBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {
        showError("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const { latitude, longitude } = position.coords;

                const weatherData =
                    await fetchWeatherByCoords(latitude, longitude);

                displayCurrentWeather(weatherData);

                const forecastData =
                    await fetchForecastByCity(weatherData.name);

                displayForecast(forecastData);

                saveCity(weatherData.name);
                updateRecentDropdown();

            } catch (error) {
                showError(error.message);
            }
        },
        () => {
            showError("Location permission denied.");
        }
    );
});



// RECENT DROPDOWN SELECTION

recentDropdown.addEventListener("change", (e) => {

    const selectedCity = e.target.value;

    if (selectedCity) {
        handleCitySearch(selectedCity);
    }
});


// INITIALIZE APP

updateRecentDropdown();
