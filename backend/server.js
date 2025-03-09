import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/weather.js';

dotenv.config();

let port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', router);

//הןספתי האם צריך את זה???????
app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: "The requested resource was not found on this server. Please check the URL and try again."
    });
});

app.listen(port, "0.0.0.0", () => {
    console.log("app is running on port " + port);
})

