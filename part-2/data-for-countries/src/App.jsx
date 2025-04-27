import {useState, useEffect} from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

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
        console.log("Error fetching data:", error)
      }
    }
    fetchCountry();

  },[searchItem]);

  

  const handleSearch = (e) => {
    setSearchItem(e.target.value);
    setSelectedCountry(null);
  }

  const handleShow = (country)=>{
    setSelectedCountry(country)
  }


  return (
    <>
  <SearchBar searchItem={searchItem} handleSearch={handleSearch}/>
  {selectedCountry? (
    <CountryDetail country={selectedCountry}/>
  ): (
    <>
  {countries.length > 10 && (
    <p>Too many matches, specify another filter</p>
  )}

  {countries.length <= 10 && countries.length >1 && (
    <CountryList countries={countries} handleShow={handleShow} />
  )}

  {countries.length === 1 && (
    <CountryDetail country={countries[0]}  />
  )}
  </>
)}
  </>
  )
};

export default App;
