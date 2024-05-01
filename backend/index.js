const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { Web3 } = require('web3');

const app = express();
const port = 3002; // Change port to 3002

// Middleware
app.use(cors());
app.use(express.json());

// Initialize web3 with the provider (e.g., Infura)
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/0dd92ab74f8b41aeba68cd110cf86c16'));

// Route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Weather DApp!');
});

// Function to fetch weather data
app.get('/weather/:city', async (req, res) => {
    const { city } = req.params;
    const apiKey = 'b633cd2aed55ad4d263d587658326578';
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        // Fetch weather data from the OpenWeatherMap API
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Store weather data on Ethereum (off-chain)
        const account = web3.eth.accounts.create();
        const address = account.address;
        const privateKey = account.privateKey;

        // Simulate storing data on Ethereum by logging Ethereum address and private key
        console.log("Ethereum Address:", address);
        console.log("Private Key:", privateKey);

        // Respond with weather data
        res.json({
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            ethereum: {
                address: address,
                privateKey: privateKey
            }
        });
    } catch (error) {
        // Handle errors
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data. Please try again.' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
