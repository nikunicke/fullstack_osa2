import React from 'react';

const Weather = ({ data }) => {
    const weatherData = data.map(weather => {
      return (
        <div key={weather.location.name}>
          <h2>Weather in {weather.location.name}</h2>
          <p><b>Temperature:</b> {weather.current.temp_c} Celsius</p>
          <img src={weather.current.condition.icon} alt="weather-icon" />
          <p><b>Wind:</b> {weather.current.wind_kph} kph {weather.current.wind_dir}</p>
        </div>
      )
    })
    return (
      <div>
        {weatherData}
      </div>
    )
  }

  export default Weather