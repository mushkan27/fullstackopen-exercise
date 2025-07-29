export const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  const { name, capital, population, flags } = country.data

  return (
    <div>
      <h3>{name.common}</h3>
      <div>capital {capital}</div>
      <div>population {population}</div>
      <img src={flags.png} height='100' alt={`flag of ${name.common}`} />  
    </div>
  )
}