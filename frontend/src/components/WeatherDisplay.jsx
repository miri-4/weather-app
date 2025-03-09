/**
 * WeatherDisplay Component
 * 
 * This component displays weather information based on provided weather data.
 * It handles errors, formats the date and time, and filters hourly forecast data.
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
 * - Filters and displays the hourly forecast for a specific range.
 */
import '../styles/WeatherDisplay.css'

const WeatherDisplay = ({ weatherData, err }) => {

    if (err)
        return <div className="error-city">{err}</div>;

    if (!weatherData) return null;

    // const dateTime = weatherData?.location?.localtime;
    // const [date, time] = dateTime.split(" ");
    // const thisHour = Number(time.split(":")[0]);
    // const dateFormatted = new Date(date).toLocaleDateString('en-GB');
    // const hourlyForecast = weatherData?.forecast?.forecastday[0]?.hour || [];
    // const filteredHours = hourlyForecast.filter(hourData => {
    //     const hour = Number(hourData.time.split(" ")[1].split(":")[0]);
    //     return hour >= thisHour - 3 && hour <= thisHour + 1;
    // });



    const dateTime = weatherData?.location?.localtime;
    const [date, time] = dateTime.split(" ");
    const thisHour = Number(time.split(":")[0]);
    const dateFormatted = new Date(date).toLocaleDateString('en-GB');

    // לוקחים את כל השעות מכל שלושת הימים
    const allHours = weatherData?.forecast?.forecastday.flatMap(day => day.hour);

    // חישוב טווח השעות
    let lowerBound = thisHour - 2;
    let upperBound = thisHour + 2;

    if (lowerBound < 0) lowerBound += 24;
    if (upperBound >= 24) upperBound -= 24;

    // הגדרת תאריכים לשלושת הימים
    const today = date;
    const yesterday = weatherData.forecast.forecastday[0]?.date;
    const tomorrow = weatherData.forecast.forecastday[2]?.date;

    // סינון שעות רלוונטיות משלושת הימים
    const filteredHours = allHours.filter(hourData => {
        const [hourDate, hourTime] = hourData.time.split(" ");
        const hour = Number(hourTime.split(":")[0]);

        if (hourDate === today) {
            return (hour >= lowerBound && hour <= upperBound) || hour === thisHour;
        }

        if (hourDate === tomorrow && thisHour >= 22 && hour < 2) {
            return true;
        }

        if (hourDate === yesterday && thisHour < 2 && hour >= 22) {
            return true;
        }

        return false;
    });
    // מיון לפי תאריך ושעה
    filteredHours.sort((a, b) => new Date(a.time) - new Date(b.time));

    console.log("Sorted Hours:", filteredHours.map(h => h.time));

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

            <div className="hourly-forecast">
                {filteredHours.map((hourData, index) => (
                    <div key={index}>
                        <span className="hour">{hourData.time.split(' ')[1]}</span>
                        <span className="degrees">{Math.round(hourData.temp_c)}°</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeatherDisplay;


