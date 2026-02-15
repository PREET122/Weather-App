
// WEATHER SERVICE (API CALLS)
// Fetch current weather by city name
async function fetchWeatherByCity(city) {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        throw error;
    }
}


// Fetch current weather by coordinates (Geolocation)
async function fetchWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch location weather");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        throw error;
    }
}


// Fetch 5-day forecast by city
async function fetchForecastByCity(city) {
    try {
        const response = await fetch(
            `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("Forecast data not available");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        throw error;
    }
}
