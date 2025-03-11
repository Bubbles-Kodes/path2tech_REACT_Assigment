import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.svg'


const Weather = () => {

  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false);

  

  const search = async (city)=>{
    if(city === ""){
      return alert('Please enter a city name')};
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        feelsLike: Math.floor(data.main.feels_like),
        windSpeed: Math.floor(data.wind.speed * 2.237), // Convert m/s to mph and round down
        description: data.weather[0].description,
        temperature: Math.floor(data.main.temp),
        weatherIcon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`, // Construct the icon URL
        location: data.name
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
  search("New York");
}, []);

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    search(inputRef.current.value);
  }
};

  return (
    <div className='weather'>
      <div className="search-bar">
      <input ref={inputRef} type="text" placeholder='Enter city name' onKeyPress={handleKeyPress} />
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
      </div>
      {weatherData?<>
        <img src={weatherData.weatherIcon} alt="weather icon" /> {/* Display the weather icon */}
      <p className='temperature'>{weatherData.temperature}°F</p>
      <p className='location'>{weatherData.location}</p>
      <div className='weather-data'>
        <div className='col'>
          <div>
          <span>humidity:
            <p>{weatherData.humidity} %</p>
            wind speed:
          <p>{weatherData.windSpeed} m/h</p>
            </span>
          </div>
        </div>
        <div className='col'>
          <span>feels like:
          <p>{weatherData.feelsLike} °F</p>
          sky:
          <p>{weatherData.description}</p>
          </span>
        </div>
      </div>
      </>:<p className='error'>City not found</p>}
    </div>
  );
};

export default Weather;
