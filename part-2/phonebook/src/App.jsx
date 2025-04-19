import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personServices from './services/personServices'
import Notification from './components/Notification'


const App = (props) => {
  const [persons, setPersons] = useState([]) 
  // console.log(persons)
  const [newName, setNewName] = useState('')
  const [num, setNum] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState("")

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
      // alert(`${newName} is already added to phonebook`);
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      // return; // this will prevent adding the name 
      if(confirm){
        const updatedPerson = {...exists, number: num};
        personServices.update(exists.id, updatedPerson).then(()=>{
          setPersons(persons.map(person=> person.id !== exists.id ? person:updatedPerson))
          setNewName('');
          setNum('');
          setNotification(`Updated ${updatedPerson.name}'s number`)
          setTimeout(() => setNotification(''), 5000)
        })
        .catch(error => {
          // console.error("Error updating the person:", error);
          if(error.response.status === 404){
            setNotification(`Information of ${newName} has already been removed from the server`)
            setTimeout(()=>setNotification(''),5000);
            setPersons(persons.filter(person=>person.id !== exists.id))
          }
        });
      }
    } else{
    let newContact = {
      name: newName,
      number: num,
      id: persons.length +1
    }

    //2.12: axios.post to update data in the server as well
    let postPromise = personServices.create(newContact)
    .then((newPerson)=>{
      setNewName("");
      setNum('');
      setPersons(persons.concat(newPerson));
      setNotification(`Added ${newPerson.name}`)
      setTimeout(() => setNotification(''), 5000)
    })
    .catch(error => {
      // console.error("Error adding the new person:", error);
      setNotification(`Error: Could not add ${newName}`);
      setTimeout(() => setNotification(''), 5000);
    });
  }
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

  //2.14 Delete entries from the phonebook using handleDelete
  const handleDelete = (id, name) => {
    const confirmation = window.confirm(`Delete ${name}?`)
    
    if (confirmation) {
      personServices.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification(`${name} was deleted successfully`)
          setTimeout(() => setNotification(''), 5000)
        })
        .catch(error => {
          console.error(error)
          setNotification(`${name} was removed from server`)
          setTimeout(() => setNotification(''), 5000)
          setPersons(persons.filter(person => person.id !== id)) // remove from UI even if server delete failed
        })
    }
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit} >
      <Notification message={notification} />
      <Filter search={search} handleSearch={handleSearch} />

        <h2>Add a new</h2>
       <PersonForm newName={newName} handleChange={handleChange} 
       num={num} handleNum={handleNum} />
      </form>
      
      <h2>Numbers</h2>
        {filteredPerson.map((value) => {
          return <Persons key={value.id} value={value} onDelete={handleDelete} />
        })}

    </div>
  )
}

export default App
