import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/weather.js';

dotenv.config();

let port = process.env.PORT || 5000;

const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Use the weather router for API endpoints under '/api'
app.use('/api', router);

// 404 error handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: "The requested resource was not found on this server. Please check the URL and try again."
    });
});

// Start the server and listen on the specified port
app.listen(port, "0.0.0.0", () => {
    console.log("app is running on port " + port);
});
