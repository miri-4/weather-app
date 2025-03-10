import { fetchWeather } from "../utils/weather.js";

/**
 * getWeather - API handler for fetching weather data for a given city.
 * 
 * This function handles a GET request to retrieve weather data for a specified city.
 * It expects a city name as a query parameter. If the city is missing or the API 
 * returns an error, appropriate error messages are sent in the response.
 * 
 * Query Parameters:
 * - city: The name of the city to fetch weather data for.
 * 
 * Responses:
 * - 200 OK: Returns weather data for the requested city.
 * - 400 Bad Request: If the city query parameter is missing.
 * - 404 Not Found: If the weather API returns an error.
 * - 500 Internal Server Error: If an unexpected error occurs during the process.
 */
export const getWeather = async (req, res) => {
    let { city } = req.query;
    
    // If no city is provided, return a 400 error with a message
    if (!city)
        return res.status(400).json({ title: "Missing data", message: `Please provide a city name in the URL as a query parameter,<br> for example /api/weather?city=Jerusalem` });
    
    try {
        // Fetch weather data for the specified city
        let weatherRes = await fetchWeather(city);
        
        // If there's an error in the weather response, return a 404 error
        if (weatherRes.error) {
            return res.status(404).json({
                title: "Weather API Error",
                message: weatherRes.error.message
            });
        }
        
        // Return the fetched weather data with a 200 status
        res.status(200).json(weatherRes);
    }
    catch (err) {
        // If the error contains a response, return the error's status and message
        if (err.response) {
            return res.status(err.response.status).json({
                title: "Weather API Error",
                message: err.response.data.error ? err.response.data.error.message : "An error occurred while fetching weather data."
            });
        }

        // If an unexpected error occurs, return a 500 status with a generic error message
        res.status(500).json({
            title: "Internal Server Error",
            message: "An unexpected error occurred on the server. Please try again later."
        });
    }
}
