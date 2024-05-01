import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('Enter a city and press "Get Weather"');

const fetchWeather = () => {
  if (!city) {
    alert('Please enter a city name');
    return;
  }

  const projectId = "0dd92ab74f8b41aeba68cd110cf86c16";
  const endpointUrl = `https://mainnet.infura.io/v3/${projectId}`;

  fetch(endpointUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log("Weather data:", data); // Log the fetched weather data
      setWeather(`Weather in ${city}: ${data.temperature}°C, ${data.description}`);
    })
    .catch(error => {
      console.error('Error fetching data from Ethereum:', error);
      setWeather('Failed to fetch weather data. Please try again.');
    });
};



  return (
    <div className="container">
      <header>
        <h1>Weather Application</h1>
      </header>
      <main>
        <div className="input-container">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button onClick={fetchWeather}>Get Weather</button>
        </div>
        <div className="weather-info">
          <p>{weather}</p>
        </div>
      </main>
      <footer>
        <p>Student id: 1915233</p>
      </footer>
    </div>
  );
}

export default App;
