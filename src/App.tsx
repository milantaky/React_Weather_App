import './App.css';
import { useState, useEffect } from 'react';
import { cities } from './cities.tsx';

interface WeatherInfoProps {
  weatherInfo: {
    main: { temp: number };
    weather: { main: string; description: string; icon: string }[];
    wind: { speed: number };
    visibility: number;
  } | null;
}

function WeatherDetail({
  description,
  data,
  units = "",
}: {
  description: string;
  data: number | string;
  units?: string;
}){
  return (
    <div className="detail"> 
      <span>{description}</span>
      <span>{data + " " + units}</span>
    </div>
  );
}

function WeatherInfo({ weatherInfo }: WeatherInfoProps ){
  if(weatherInfo === null){
    return (
      <div className='select-city'>Please select a city</div>
    );
  }

  const imageUrl = `http://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png`;

  return (
    <div className='weather-info'>
      <img src={imageUrl} alt="weather-icon"/>

      <div className="weather-details">
        <WeatherDetail description="Current temperature:" data={weatherInfo.main.temp} units="&deg;C"/>
        <WeatherDetail description="Weather type:" data={weatherInfo.weather[0].main}/>
        <WeatherDetail description="Wind speed:" data={weatherInfo.wind.speed} units="m/s"/>
        <WeatherDetail description="Visibility:" data={weatherInfo.visibility} units="m"/>
      </div>
    </div>
  );
}


export default function App() {
  const [location, setLocation] = useState<{ name: string; long: string; lat: string } | undefined>(undefined);
  const [weatherData, setWeatherData] = useState(null);
  const url = location === undefined ? "" : `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&units=metric&appid=${import.meta.env.VITE_WEATHER_APP_API_KEY}`;

  useEffect(() => {
    if(location){
      fetch(url)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error('Error fetching weather data:', error));
    }

  }, [location, url]);

  return (
    <div className='weather-container'>
      <h1>Weather App</h1>
      <select onChange={e => {
        const selectedCity = cities.find(city => city.name === e.target.value);
        setLocation(selectedCity);
        }}>
        {cities.map(city => {
          return <option key={city.name} value={city.name}>{city.name}</option>
          })}
      </select>
      
      <WeatherInfo weatherInfo={weatherData}/>
    </div>
  )
}
