import {useState, useEffect} from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [apiError, setApiError] = useState(null);

  useEffect(()=>{
    if(searchItem.trim()===""){
      setCountries([]);
      return;
    }
    const fetchCountry = async() => {
      try {
        const url = `https://restcountries.com/v3.1/name/${searchItem}`;
        const response = await axios.get(url);
        // console.log("responseData",response.data)
        setCountries(response.data);
        setSelectedCountry(null);
        setWeather(null);
        if(response.data.length === 1){
         const capital = Array.isArray(response.data[0].capital) ? response.data[0].capital[0] : response.data[0].capital;
        //  console.log("capital:", capital)
        //  console.log("responseData at 0:",response.data[0])
         fetchWeatherData(capital)
        }
        
      } catch (error) {
        console.log("Error fetching data:", error)
      }
    }
    fetchCountry();

  },[searchItem]);


  const fetchWeatherData = async (capital) => {
    // console.log("capita inside api",capital)
    // console.log("inside the api key")
    try {
      const apiKey = import.meta.env.VITE_SOME_KEY;
      // console.log(apiKey, "apikey")
      const v2_5 = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;
      // console.log(v2_5,"api call")
      
      const weatherResponse = await axios.get(v2_5)
      // console.log("weatherResponse",weatherResponse)
      // console.log("weatherResponseData:", weatherResponse.data)
      setWeather(weatherResponse.data)
      setApiError(null);
      
    } catch (error) {
      console.error("Error fetching the weather data", error.data)
      setWeather(null)
      setApiError("failed to fetch weather data")
    }
  }
  

  const handleSearch = (e) => {
    setSearchItem(e.target.value);
    setSelectedCountry(null);
  }

  const handleShow = (country)=>{
    setSelectedCountry(country)
    const capital = Array.isArray(country.capital) ? country.capital[0] : country.capital;
    fetchWeatherData(capital)
  }


  return (
    <>
  <SearchBar searchItem={searchItem} handleSearch={handleSearch}/>
  {selectedCountry? (
    <CountryDetail country={selectedCountry} weather={weather} apiError={apiError}/>
  ): (
    <>
  {countries.length > 10 && (
    <p>Too many matches, specify another filter</p>
  )}

  {countries.length <= 10 && countries.length >1 && (
    <CountryList countries={countries} handleShow={handleShow} />
  )}

  {countries.length === 1 && (
    <CountryDetail country={countries[0]} weather={weather} apiError={apiError} />
  )}
  </>
)}
  </>
  )
};

export default App;
