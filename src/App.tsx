import './App.css';
import { useState, useEffect } from 'react';
import { cities } from './cities.tsx';

// type LocationData = {
//   name: string;
//   lat: number;
//   long: number;
// };

function WeatherInfo({ weatherInfo }){
  if(weatherInfo === null){
    return (
      <div>Please select a city</div>
    );
  }

  const imageUrl = `http://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png`;

  return (
    <div className='weather-info'>
      <div className="temperature">Current temperature: {weatherInfo.main.temp}&deg;C</div>
      <div className="weather-type">Weather type: {weatherInfo.weather[0].main}</div>
      <div className="weather-description">Weather description: {weatherInfo.weather[0].description}</div>
      <div className="wind-speed">Wind speed: {weatherInfo.wind.speed} m/s</div>
      <img src={imageUrl} alt="weather-icon"/>
    </div>
  );
}

export default function App() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const url = location === null ? "" : `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&units=metric&appid=${import.meta.env.VITE_WEATHER_APP_API_KEY}`;

  useEffect(() => {
    if(location){
      fetch(url)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error('Error fetching weather data:', error));
    }

  }, [location]);

  return (
    <>
      <h1>Weather App</h1>
      <select onChange={e => {
        const selectedCity = cities.find(city => city.name === e.target.value);
        setLocation(selectedCity);
        }}>
        {cities.map(city => {
          return <option key={city.name} value={city.name}>{city.name}</option>
          })}
      </select>
      {console.log(weatherData)}
      
      <WeatherInfo weatherInfo={weatherData}/>
    </>
  )
}
