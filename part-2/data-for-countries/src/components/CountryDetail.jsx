// for showing single country detail

//When only one country matches the search, your API result looks like an array containing one object.
//So to show the details of that one country, you need to access the first item in the array → that's at index 0.

const CountryDetail = ({ countries }) => {
    const country = countries[0];
    
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
      </div>
    );
  }
  
  export default CountryDetail;
  