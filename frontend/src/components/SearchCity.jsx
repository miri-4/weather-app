/**
 * SearchCity - City search input.
 * 
 * Props:
 * - setCity: Updates the selected city.
 * 
 * Features:
 * - Validates and submits city name.
 * - Updates weather data.
 */

import { useForm } from "react-hook-form";
import '../styles/SearchCity.css'

const SearchCity = ({ setCity}) => {
    // Initialize the form with react-hook-form
    let { register, handleSubmit, formState: { errors } } = useForm();
    
    // Function to update the selected city
    function changeCity(e) {
        setCity(e.city);
    }

    return (
        <div className="taxt-search">
            {/* Application description */}
            Use our weather app<br />
            to see the weather<br />
            around the world
            
            {/* Search form with validation */}
            <form className="search-form" noValidate onSubmit={handleSubmit(changeCity)}>
                <p className="city-name">City name</p>

                <div className="input-container">
                    {/* Input field for city name with validation */}
                    <input
                        {...register("city", { required: { value: true, message: "No city entered" } })}
                        type="text"
                        className="search-input"
                    />
                    
                    {/* Submit button */}
                    <input className="search-submit" type="submit" value={"check"} style={{ fontFamily: 'Heebo' }} />
                </div>
                
                {/* Display error message if city is not entered */}
                {errors.city && <div className="error-message">{errors.city.message}</div>}
            </form>
        </div>
    )
}

export default SearchCity;