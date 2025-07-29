import { useState } from 'react';
import useResource from './hooks/useResource';

// Custom hook for form inputs
const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    reset
  };
};

const App = () => {
  const content = useField('text');
  const name = useField('text');
  const number = useField('text');

  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    content.reset();
  };
 
  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ 
      name: name.value, 
      number: number.value 
    });
    name.reset();
    number.reset();
  };

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button type="submit">Create Note</button>
      </form>
      {notes.map(note => (
        <p key={note.id}>{note.content}</p>
      ))}

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        Name: <input {...name} /> <br/>
        Number: <input {...number} /> <br/>
        <button type="submit">Create Person</button>
      </form>
      {persons.map(person => (
        <p key={person.id}>
          {person.name} - {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;