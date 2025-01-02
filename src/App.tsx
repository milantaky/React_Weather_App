import './App.css';
import { useState, useEffect } from 'react';
import { cities } from './cities.tsx';

// type LocationData = {
//   name: string;
//   lat: number;
//   long: number;
// };

export default function App() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const url = location === null ? "" : `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&appid=${import.meta.env.VITE_WEATHER_APP_API_KEY}`;

  useEffect(() => {
    if(location){
      fetch(url)
      .then(response => response.json())
      .then(data => setWeatherData(data))
    };

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
    </>
  )
}

