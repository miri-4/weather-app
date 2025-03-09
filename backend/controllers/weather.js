import { fetchWeather } from "../utils/weather.js";

export const getWeather = async (req, res) => {
    let { city } = req.query;
    if (!city)
        return res.status(400).json({ title: "Missing data", message: `Please provide a city name in the URL as a query parameter,<br> for example /api/weather?city=Jerusalem` });
    try {
        let weatherRes = await fetchWeather(city);
            if (weatherRes.error) {
                return res.status(404).json({
                            title: "Weather API Error",
                            message: weatherRes.error.message
                        });
            }
        res.status(200).json(weatherRes);
    }
    catch (err) {
        if (err.response) {
            return res.status(err.response.status).json({
                title: "Weather API Error",
                message: err.response.data.error ? err.response.data.error.message : "An error occurred while fetching weather data."
            });
        }

        res.status(500).json({
            title: "Internal Server Error",
            message: "An unexpected error occurred on the server. Please try again later."
        });
    }
}