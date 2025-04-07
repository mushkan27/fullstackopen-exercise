

const Persons = ({value, onDelete}) => {
    return (
    
       
       <p>{value.name} {value.number} 
       <button onClick={()=>onDelete(value.id,value.name)}>Delete</button></p>
        
    )
}

export default Persons;