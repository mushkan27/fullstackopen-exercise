// for showing single country detail

//When only one country matches the search, your API result looks like an array containing one object.
//So to show the details of that one country, you need to access the first item in the array → that's at index 0.

const CountryDetail = ({ country,weather,apiError }) => {
    
    const languages = country.languages ? Object.values(country.languages) : [];
  
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Language(s):</h3>
        <ul>
          {languages.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>

        <h3>Flag:</h3>
        <img src={country.flags.png} alt={`${country.name.common}'s flag`} />

        <h3>Weather Map Data</h3>
        {
            weather ? (
                <div>
                    <h3>Weather in {country.capital[0]}</h3>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Humidity: {weather.main.humidity}</p>
                    <p>Wind {weather.wind.speed}</p>
                    <p>Weather Description: {weather.weather[0].description}</p>
                    <p>Weather Icon: </p>
                    {
                      weather.weather[0].icon ?(
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" />
                      ):(
                        <p>No icon available</p>
                      )
                    }
                </div>
            ):apiError ? (<p>{apiError}</p>):(
              <p>Loading weather data</p>
            )
        }
         
      </div>
    );
  }
  
  export default CountryDetail;
  