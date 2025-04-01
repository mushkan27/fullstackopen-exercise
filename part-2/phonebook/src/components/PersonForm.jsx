
const PersonForm = ({newName, handleChange, num, handleNum}) => {
return (
    <>
    <div>name: <input value={newName} onChange={handleChange} /></div>
    <div>number: <input value={num} onChange={handleNum} /></div>
    <div> <button type="submit">add</button> </div>
    </>
)
}

export default PersonForm;