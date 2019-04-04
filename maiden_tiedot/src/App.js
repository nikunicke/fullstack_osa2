import React, { useState, useEffect } from 'react';
import allCountries from './services/countries';
import weatherService from './services/weather';
import Info from './components/Info';
import Filter from './components/Filter';


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ showAll, setShowAll ] = useState('')
  const [ weather, setWeather ] = useState([])

  useEffect(() => {
    allCountries
      .getAll()
      .then(countries => setCountries(countries))
  }, [])

  const searchResults = countries.filter(country => country.name.toLowerCase().includes(showAll.toLowerCase()))
  const city = searchResults.length === 1
    ? searchResults.map(country => country.capital)
    : null

  useEffect(() => {
    weatherService
      .getWeather(city)
      .then(weather => {
        if (city !== null) {
          setWeather([weather])
        }
      })
  }, [city !== null])

  const handleFilterChange = (event) => {
    setShowAll(event.target.value)
  }

  return (
    <div>
      <Filter value={showAll} onChange={handleFilterChange} />
      <Info weatherData={weather} searchResults={searchResults} filter={showAll} setFilter={setShowAll} />
    </div>
  )
}

export default App;
