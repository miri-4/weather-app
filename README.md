
# Weather App

A weather application that allows users to check the weather forecast for a selected city, including current weather conditions, hourly forecasts, and more. The app fetches weather data using an external weather API.


## Preview
![image](https://github.com/user-attachments/assets/10a0646a-8439-4448-9fa9-61533694d229)


## Features
- Search for weather by city name.
- Displays current weather conditions (temperature, humidity, precipitation, wind speed, etc.).
- Shows hourly weather forecasts for the upcoming hours.
- Presents metadata like coordinates and last update time.
- Error handling for invalid city input or API errors.
- Fully responsive design for mobile, tablet, and desktop views.

## Technologies Used
- **React**: For building the user interface.
- **Express.js**: For creating the backend API server.
- **Axios**: For making HTTP requests to fetch weather data.
- **Weather API**: For retrieving weather information.
- **CSS**: For styling the application (responsive design).
- **dotenv**: For managing environment variables securely.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/miri-4/weather-app.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd weather-app
   ```

3. **Install dependencies**:

   For the frontend (React):
   ```bash
   cd frontend
   npm install
   ```

   For the backend (Express):
   ```bash
   cd backend
   npm install
   ```

4. **Set up your environment variables**:

   Create a `.env` file in the `backend` folder and add your weather API key:
   ```
   WEATHER_API_KEY=your_api_key
   PORT=5000
   ```

5. **Run the application**:

   To run the backend :
   ```bash
   node server
   ```
   To run the frontend:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

   
## Project Structure
 ```bash
weather-app/
├── backend/
│   ├── node_modules/                  # Installed dependencies for Node.js
│   ├── routes/                        # Directory containing the API routes
│   │   └── weather.js                 # Weather forecast route file
│   ├── .env                           # Environment variables file (e.g., API key)
│   ├── package.json                   # Backend project's dependencies and settings
│   ├── server.js                      # Main server code (Express)
│   └── README.md                      # Backend documentation
│
├── frontend/
│   ├── node_modules/                  # Installed dependencies for React
│   ├── public/                        # Public files like logo, favicon, etc.
│   │   └── logo.svg                   # Logo of the application
│   ├── src/                           # Source code for the React app
│   │   ├── api/                       # API calls directory (communicating with the backend)
│   │   │   └── weatherService.js      # Weather API service
│   │   ├── components/                # React components directory
│   │   │   ├── Footer.jsx             # Footer component
│   │   │   ├── SearchCity.jsx         # City search component
│   │   │   ├── WeatherDisplay.jsx     # Weather display component
│   │   │   └── ...                    # Additional components
│   │   ├── styles/                    # Styles (CSS files)
│   │   │   ├── App.css                # Styles for the main React app
│   │   │   ├── Responsive.css         # Responsive styles for mobile, tablet, and desktop
│   │   │   └── WeatherDisplay.css     # Styles for weather display component
│   │   ├── App.jsx                    # Main React component for the app
│   │   ├── index.css                  # Global Styles
│   │   ├── main.jsx                   # App Entry
│   ├── .gitignore                     # Git Ignore File
│   ├── index.html                     # HTML Template
│   ├── package.json                   # Frontend Dependencies
│   ├── package-lock.json              # Frontend Lock File
├── .gitignore                         # Git ignore file for the root project
├── README.md                          # Main project documentation
└── package.json                       # General project dependencies and settings

```

## Usage

1. Open the app in your browser.
2. Enter the name of a city in the search box to get the weather forecast for that location.
3. The app will display the current weather conditions, hourly forecast, and additional details like humidity, precipitation, and wind speed.
4. The weather data is updated dynamically based on the city selected.

## Error Handling
- If the weather data cannot be retrieved for the specified city, an error message will be displayed.
- If no city is provided, a prompt will ask the user to enter a city name.



