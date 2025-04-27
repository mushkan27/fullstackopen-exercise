import {useState, useEffect} from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  useEffect(()=>{
    if(searchItem.trim()===""){
      setCountries([]);
      return;
    }
    const fetchCountry = async() => {
      try {
        const url = `https://restcountries.com/v3.1/name/${searchItem}`;
        const response = await axios.get(url);
        console.log(response.data)
        setCountries(response.data);
        
      } catch (error) {
        console.log("Error fetching data:", error.data)
      }
    }
    fetchCountry();

  },[searchItem]);

  

  const handleSearch = (e) => {
    setSearchItem(e.target.value);
  }


  return (
    <>
  <SearchBar searchItem={searchItem} handleSearch={handleSearch}/>

  {countries.length > 10 && (
    <p>Too many matches, specify another filter</p>
  )}

  {countries.length <= 10 && countries.length >1 && (
    <CountryList countries={countries} />
  )}

  {countries.length === 1 && (
    <CountryDetail countries={countries} />
  )}
  </>
  )
};

export default App;
