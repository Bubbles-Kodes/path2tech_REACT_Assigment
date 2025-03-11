import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.svg'


const Weather = () => {

  const [weatherData, setWeatherData] = useState(false);

  const search = async (city)=>{
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name


      })
    } catch (error) {
      
    }
  }
useEffect(()=>{
  search("New York");
},[])
  return (
    <div className='weather'>
      <div className="search-bar">
        <input type="text" placeholder='Search'/>
        <img src={search_icon} alt=""/>
      </div>
      <p className='temperature'>{weatherData.temperature}°F</p>
      <p className='location'>{weatherData.location}</p>
      <div className='weather-data'>
        <div className='col'>
          <div>
            <p>{weatherData.humidity}%</p>
            <span>humidity</span>
          </div>
        </div>
        <div className='col'>
          <p>{weatherData.windSpeed}km/h</p>
          <span>Wind Speed</span>

        </div>
      </div>
    </div>
  )
}

export default Weather
