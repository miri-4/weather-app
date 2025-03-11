/**
 * Footer - Displays weather metadata.
 * 
 * Props:
 * - weatherData: Location and update time.
 * - err: Error message if data is unavailable.
 * 
 * Features:
 * - Shows coordinates and last update time.
 * - Handles errors and loading state.
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



