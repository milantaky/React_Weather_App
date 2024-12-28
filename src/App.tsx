import './App.css';
import { useState, useEffect } from 'react';
import { cities } from './cities.tsx';

export default function App() {
  const [location, setLocation] = useState("");
  // useEffect(() => {
  //   let ignore = false;

  //   if(!ignore){
  //     const data = fetch()
  //   }

  //   return () => ignore = true;
  // }, [location]);

  return (
    <>
      <h1>Weather App</h1>
      <input 
        value={location}
        onChange={e => {
          setLocation(e.target.value);
        }}    
      />
      {cities.map(city => {
        return <div>{city.name}</div>
      })}
    </>
  )
}

