// Weather Dashboard JavaScript

const API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const app = document.getElementById('app');

// DOM Elements
let cityInput, searchBtn;

function createUI() {
    app.innerHTML = `
        <header>
            <h1>Weather Dashboard</h1>
            <p class="subtitle">Get current weather information for any city</p>
        </header>
        
        <div class="search-container">
            <input type="text" id="city-input" placeholder="Enter city name...">
            <button id="search-btn">Search Weather</button>
        </div>
        
        <div id="weather-display">
            <!-- Weather data will be displayed here -->
        </div>
    `;
    
    // Get DOM elements after they're created
    cityInput = document.getElementById('city-input');
    searchBtn = document.getElementById('search-btn');
    
    // Add event listeners
    searchBtn.addEventListener('click', getWeather);
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            getWeather();
        }
    });
}

function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    showLoading();
    
    // For demo purposes, we'll use mock data since we don't have a real API key
    // In a real application, you would uncomment the fetch call below
    
    /*
    fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            showError(error.message);
        });
    */
    
    // Mock data for demonstration
    const mockData = {
        name: city,
        sys: { country: 'US' },
        main: {
            temp: 22.5,
            feels_like: 21.8,
            humidity: 65,
            pressure: 1013
        },
        weather: [{ 
            description: 'partly cloudy',
            icon: '02d'
        }],
        wind: {
            speed: 3.5
        }
    };
    
    setTimeout(() => displayWeather(mockData), 1000);
}

function showLoading() {
    const weatherDisplay = document.getElementById('weather-display');
    weatherDisplay.innerHTML = '<p class="loading">Loading weather data...</p>';
}

function showError(message) {
    const weatherDisplay = document.getElementById('weather-display');
    weatherDisplay.innerHTML = `<p class="error">Error: ${message}</p>`;
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    
    const weatherHTML = `
        <div class="weather-card">
            <div class="weather-header">
                <div class="location">${data.name}, ${data.sys.country}</div>
                <div class="temperature">${Math.round(data.main.temp)}°C</div>
            </div>
            <div class="weather-description">${data.weather[0].description}</div>
            
            <div class="weather-details">
                <div class="detail-item">
                    <div class="detail-label">Feels Like</div>
                    <div class="detail-value">${Math.round(data.main.feels_like)}°C</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Humidity</div>
                    <div class="detail-value">${data.main.humidity}%</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Pressure</div>
                    <div class="detail-value">${data.main.pressure} hPa</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Wind Speed</div>
                    <div class="detail-value">${data.wind.speed} m/s</div>
                </div>
            </div>
        </div>
    `;
    
    weatherDisplay.innerHTML = weatherHTML;
}

// Initialize the app
createUI();