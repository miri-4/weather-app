import axios from 'axios';

export const fetchWeather = async (city) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const baseURL=`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`
    try {
        const response = await axios.get(`${baseURL}&days=2`);

        // חישוב התאריך של אתמול
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const formattedYesterday = yesterday.toISOString().split("T")[0]; // yyyy-mm-dd

        // שליפת האתמול
        const yesterdayResponse = await axios.get(`${baseURL}&date=${formattedYesterday}`);

        // שילוב הנתונים של אתמול + היום + מחר
        return {
            ...response.data,
            forecast: {
                forecastday: [yesterdayResponse.data.forecast.forecastday[0], ...response.data.forecast.forecastday]
            }
        }

    }
    catch (err) {
        if (err.response && err.response.status === 400) {
            return { error: { message: "No matching location found." } };
        }
        return { error: { message: "An unexpected error occurred while fetching weather data." } };

    }
};


    //  catch (error) {
    //     return { error: error.response?.data?.message || "Error fetching weather data" };
    // }



