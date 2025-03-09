/**
 * Footer Component
 * 
 * This component displays metadata about the weather data, including coordinates and the last update time.
 * It also handles errors and loading states.
 * 
 * Props:
 * - weatherData: Object containing weather details, including location and time.
 * - err: String representing an error message if weather data cannot be retrieved.
 * 
 * Features:
 * - Displays latitude and longitude of the selected location.
 * - Shows the last accurate update time of the weather data.
 * - Handles error messages and loading state.
 */
import React from 'react'

const Footer = ({ weatherData,err }) => {
    if(err)
        return <div className='footer'>{err}</div>; 

    if (!weatherData) {
        return <div className='footer'>Loading weather data...</div>; 
    }
    
    const dateTime = weatherData?.location?.localtime;
    const [date, time] = dateTime?.split(" ");
    const dateFormatted = new Date(date).toLocaleDateString('en-GB');

    return (
        <>
            <div className="footer">
                <span className="lat">latitude {weatherData?.location?.lat} </span>
                <span className="lon">longitude {weatherData?.location?.lon}</span>
                <div className="accurate">{`accurate to ${dateFormatted} at ${time}`}</div>


            </div>
        </>
    )
}

export default Footer;



