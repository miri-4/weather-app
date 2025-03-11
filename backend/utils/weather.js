import axios from 'axios';
/**
 * fetchWeather - Fetches weather data for a city.
 * 
 * Retrieves weather data for today, tomorrow, and yesterday using WeatherAPI.
 * 
 * Returns:
 * - Weather data for three days.
 * - Error message if the location is not found or another issue occurs.
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
