import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from "axios"
import personServices from './services/personServices'



const App = (props) => {
  const [persons, setPersons] = useState([]) 
  // console.log(persons)
  const [newName, setNewName] = useState('')
  const [num, setNum] = useState('')
  const [search, setSearch] = useState('')

  useEffect(()=>{
    let myAxiosPromise = personServices.getAll()
    .then((myData)=>{
      setPersons(myData)
    })
  },[])

   

  const handleSubmit = (event) => {
    event.preventDefault();

    // check if the name already exists 
    const exists = persons.find(person => 
      person.name.toLowerCase()===newName.toLowerCase())
    if(exists){
      alert(`${newName} is already added to phonebook`);
      return; // this will prevent adding the name 
    }
    let newContact = {
      name: newName,
      number: num,
      id: persons.length + 1
    }

    //2.12: axios.post to update data in the server as well
    let postPromise = personServices.create(newContact)
    .then((result)=>{
      setPersons(persons.concat(result.data));
      setNewName("");
      setNum('');
    })
  } //handleSubmit ends here

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
      <Filter search={search} handleSearch={handleSearch} />

        <h2>Add a new</h2>
       <PersonForm newName={newName} handleChange={handleChange} 
       num={num} handleNum={handleNum} />
      </form>
      
      <h2>Numbers</h2>
        {filteredPerson.map((value) => {
          return <Persons key={value.id} value={value} />
        })}

    </div>
  )
}

export default App

