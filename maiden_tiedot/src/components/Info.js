import React from 'react';
import Weather from './Weather';


const Info = ({ searchResults, filter, setFilter, weatherData }) => {
    const rows = () => searchResults.map(country => {
      return (
        <li key={country.name}>{country.name}
        <button onClick={() => setFilter(country.name)}>Show</button></li> 
      )
    })
  
    if (filter === '') {
      return <p>Search out of 250 countries</p>
    }
    if (rows().length > 10) {
      return <p>Too many matches, specify another filter</p>
    }
    if (rows().length > 1) {
      return (
        <div>
          {rows()}
        </div>
      )
    }
    if (rows().length < 1) {
      return <p>No matches</p>
    }
    if (rows().length === 1) {
      const country = searchResults.shift()
      const language = () => {
           return country.languages.map(lang => 
                <li key={lang.name}>{lang.name}</li>)
        }
  
      return (
        <div>
          <h1>{country.name}</h1>
          <p><b>Capital:</b> {country.capital}</p>
          <p><b>Population:</b> {country.population}</p>
          <h2>Languages</h2>
          {language()}
          <img src={country.flag} width="200" alt="National flag" />
          <Weather data={weatherData} />
        </div>
      )
  
    }
  }

export default Info