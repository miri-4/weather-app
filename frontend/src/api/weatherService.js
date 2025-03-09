import axios from "axios";

let baseURL="http://localhost:5000/api/weather";

export const getWeather = async (city) => {
    try {
        const response = await axios.get(`${baseURL}?city=${city}`);
        
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || "Error fetching weather data" };
    }
};