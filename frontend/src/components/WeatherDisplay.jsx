/**
 * WeatherDisplay Component
 * 
 * This component displays weather information based on provided weather data.
 * It handles errors, formats the date and time, and filters hourly forecast data across three days.
 * 
 * Props:
 * - weatherData: Object containing weather details including location, temperature, condition, and forecast.
 * - err: String representing an error message if weather data cannot be retrieved.
 * 
 * Features:
 * - Displays location name and country.
 * - Formats and shows current date and time.
 * - Shows current temperature and weather condition.
 * - Displays precipitation, humidity, and wind speed.
 * - Filters and displays the hourly forecast for a specific range across three days.
 */
import '../styles/WeatherDisplay.css'

const WeatherDisplay = ({ weatherData, err }) => {

    // If there's an error, display the error message
    if (err)
        return <div className="error-city">{err}</div>;

    // If no weather data is provided, don't render anything
    if (!weatherData) return null;

    // Extract the local time and split it into date and time
    const dateTime = weatherData?.location?.localtime;
    const [date, time] = dateTime.split(" ");
    const thisHour = Number(time.split(":")[0]);  // Get the current hour (in 24-hour format)
    const dateFormatted = new Date(date).toLocaleDateString('en-GB');  // Format the date to UK format

    let hoursRequired = [];

    // If the current hour is between 2 AM and 10 PM, show forecast data from the next day
    if (thisHour >= 2 && thisHour < 22)
        hoursRequired = weatherData.forecast.forecastday[1].hour.slice(thisHour - 2);
    else {
        // Handle edge cases for hours between 0 AM to 2 AM and 10 PM to midnight
        switch (thisHour) {
            case 0: hoursRequired = [
                ...weatherData.forecast.forecastday[0].hour.slice(22),
                ...weatherData.forecast.forecastday[1].hour.slice(0, 22)
            ];
                break;
            case 1: hoursRequired = [
                ...weatherData.forecast.forecastday[0].hour.slice(23),
                ...weatherData.forecast.forecastday[1].hour.slice(0, 23)
            ]
                break;
            case 23: hoursRequired = [
                ...weatherData.forecast.forecastday[1].hour.slice(1),
                ...weatherData.forecast.forecastday[2].hour.slice(0, 2)
            ]
                break;
            case 22: hoursRequired = [
                ...weatherData.forecast.forecastday[1].hour.slice(1),
                ...weatherData.forecast.forecastday[2].hour.slice(0, 1)
            ]
                break;
        }
    }

    // Format the current hour to a 2-digit string (e.g., "04" instead of "4")
    const formattedHour = String(thisHour).padStart(2, '0');

    // Find the index of the current hour in the filtered hours
    const currentHourIndex = hoursRequired.findIndex(hour => hour.time.endsWith(` ${formattedHour}:00`));

    let selectedHours = [];

    // If the current hour exists in the array, select the hours around it (2 before, the current hour, and 2 after)
    if (currentHourIndex !== -1) {
        for (let i = -2; i <= 2; i++) {
            const index = currentHourIndex + i;
            if (index >= 0 && index < hoursRequired.length) {
                selectedHours.push(hoursRequired[index]);
            }
        }
    }

    return (
        <div className='weather-card'>
            <div className='name'>{weatherData?.location?.name}</div>
            <div className='country'>{weatherData?.location?.country}</div>
            <div className='dateTime'>{`${dateFormatted} at ${time}`}</div>
            <div className='temperature'>{Math.round(weatherData?.current?.temp_c)}°</div>
            <div className="condition">{weatherData?.current?.condition?.text}</div>
            <div className='details'>
                <div className='precipitation-txt'>
                    precipitation
                    <div className="precipitation">{weatherData?.current?.precip_mm} mm</div>
                </div>

                <div className='humidity-txt'>
                    humidity
                    <div className="humidity">{weatherData?.current?.humidity}%</div>
                </div>

                <div className='wind_kph-txt'>
                    wind
                    <div className="wind_kph">{weatherData?.current?.wind_kph} km/h</div>
                </div>
            </div>

            {/* Display hourly forecast data */}
            <div className="hourly-forecast">
                {selectedHours.map((hourData, index) => (
                    <div key={index}>
                        <span className="hour">{hourData.time.split(' ')[1]}</span>
                        <span className="degrees">{Math.round(hourData.temp_c)}°</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeatherDisplay;
