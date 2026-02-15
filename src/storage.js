// STORAGE SERVICE (LOCAL STORAGE LOGIC)

const STORAGE_KEY = "recentCities";


// Get recent cities from localStorage
function getRecentCities() {
    const cities = localStorage.getItem(STORAGE_KEY);
    return cities ? JSON.parse(cities) : [];
}


// Save a new city to localStorage
function saveCity(city) {

    let cities = getRecentCities();

    // Remove duplicate if exists
    cities = cities.filter(item => item.toLowerCase() !== city.toLowerCase());

    // Add new city at beginning
    cities.unshift(city);

    // Limit to last 5 searches
    if (cities.length > 5) {
        cities.pop();
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
}


// Clear all recent cities (optional utility)
function clearRecentCities() {
    localStorage.removeItem(STORAGE_KEY);
}
