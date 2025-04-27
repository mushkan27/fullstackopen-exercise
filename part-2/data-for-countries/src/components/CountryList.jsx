//for showing multiple countries

const CountryList = ({countries, handleShow}) => {
    return <div>
      <h2>Matching Countries:</h2>
      <ul>
      {countries.map((country)=>(
          <li key={country.name.common}>
            {country.name.common}
          <button onClick={() => handleShow(country)}>Show Country's Detail</button>
          </li>
        ))}
      </ul>
    </div>
}
 export default CountryList;