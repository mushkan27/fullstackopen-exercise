//for showing multiple countries

const CountryList = ({countries}) => {
    return <div>
      <h2>Matching Countries:</h2>
      <ul>
      {countries.map((country)=>(
          <li key={country.name.common}>{country.name.common}</li>
        ))}
      </ul>
    </div>
}
 export default CountryList;