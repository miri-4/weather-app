import axios from 'axios';

/**
 * fetchWeather - Fetches weather data for a given city.
 * 
 * This function fetches weather data for the specified city, including the current weather,
 * as well as the weather data for yesterday, today, and tomorrow. It uses the WeatherAPI 
 * service to get the forecast.
 * 
 * Parameters:
 * - city: The name of the city to fetch weather data for.
 * 
 * Returns:
 * - The combined weather data including today, tomorrow's forecast, and yesterday's weather data.
 * - If an error occurs, it returns an error message.
 * 
 * Errors:
 * - If the location is not found, a 400 error message is returned with the message: "No matching location found."
 * - If there is any other issue, a generic error message is returned.
 */
export const fetchWeather = async (city) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const baseURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`;
    
    try {
        // Fetching today's and tomorrow's weather data
        const response = await axios.get(`${baseURL}&days=2`);

        // Calculate yesterday's date
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const formattedYesterday = yesterday.toISOString().split("T")[0];

        // Retrieving yesterday's weather data
        const yesterdayResponse = await axios.get(`${baseURL}&date=${formattedYesterday}`);

        // Combining yesterday, today, and tomorrow's data
        return {
            ...response.data,
            forecast: {
                forecastday: [yesterdayResponse.data.forecast.forecastday[0], ...response.data.forecast.forecastday]
            }
        }

    }
    catch (err) {
        // Handling errors based on the response status
        if (err.response && err.response.status === 400) {
            return { error: { message: "No matching location found." } };
        }
        // Handling generic errors
        return { error: { message: "An unexpected error occurred while fetching weather data." } };
    }
};
