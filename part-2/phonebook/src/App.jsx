
import Number from './components/Number'

import { useState } from 'react'

const App = (props) => {
  const [persons, setPersons] = useState(props.phoneBook) 
  // console.log(persons)
  const [newName, setNewName] = useState('')

   

  const handleSubmit = (event) => {
    event.preventDefault();

    //filter same name
    const filterd = persons.filter((person)=>person.name === newName);
    if(filterd.length > 0){
      alert(`${newName} is already added to phonebook`);
      return; // this will prevent adding the name 
    }

    setPersons(persons.concat({
      name: newName
    }))
    setNewName("")
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit} >
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>
        {persons.map((value, index) => {
          return <Number key={index} value={value} />
        })}

    </div>
  )
}

export default App

