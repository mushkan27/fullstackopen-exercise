
import Number from './components/Number'

import { useState } from 'react'

const App = (props) => {
  const [persons, setPersons] = useState(props.phoneBook) 
  // console.log(persons)
  const [newName, setNewName] = useState('')
  const [num, setNum] = useState('')
  const [search, setSearch] = useState('')

   

  const handleSubmit = (event) => {
    event.preventDefault();

    // check if the name already exists 
    const exists = persons.find(person => 
      person.name.toLowerCase()===newName.toLowerCase())
    if(exists){
      alert(`${newName} is already added to phonebook`);
      return; // this will prevent adding the name 
    }

    

    setPersons(persons.concat({
      name: newName,
      number: num,
      id: persons.length + 1
    }))
    setNewName("")
    setNum("")
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNum = (event)=> {
    setNum(event.target.value)
  }
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const filteredPerson = persons.filter(person => 
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit} >
        <div>filter shown with <input value={search} onChange={handleSearch} /></div>

        <h2>add a new</h2>
        <div>name: <input value={newName} onChange={handleChange} /></div>
        <div>number: <input value={num} onChange={handleNum} /></div>
        <div> <button type="submit">add</button> </div>
      </form>
      
      <h2>Numbers</h2>
        {filteredPerson.map((value) => {
          return <Number key={value.id} value={value} />
        })}

    </div>
  )
}

export default App

