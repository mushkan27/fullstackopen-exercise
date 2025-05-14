const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://muskan:${password}@cluster1.wbdartj.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster1`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(name && number){
    const person = new Person({
        name,
        number,
       })
       
       person.save().then(result => {
         console.log(`added ${name} number ${number} to phonebook`)
         mongoose.connection.close()
       })
       .catch((err)=>{
        console.error("Error saving the person:",err)
        mongoose.connection.close()
       })
       
      
} else{
    Person.find({}).then((result)=> {
        console.log("phonebook:")
        result.forEach((person)=>{
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    }).catch((err)=>{
        console.error("Error saving the person:",err)
        mongoose.connection.close()
       })
}
