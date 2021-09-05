import React, { useState , useEffect } from 'react'
import Persons from './components/Persons'
import FormPerson from './components/FormPerson'
import FilterPersons from './components/FilterPersons'
import personServices from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  
  useEffect(() => {
    personServices.getAll().then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  console.log('render', persons.length, 'persons')
  
  const setNewNameTel=(e)=>{
    setNewName(e.target.value)
  }

  const setNewNumberTel=(e)=>{
    setNewNumber(e.target.value)
  }

  const setFindFilterName=(e)=>{
    setFilterName(e.target.value)
  }

  const addPerson=(e)=>{
    e.preventDefault()
    
    const newPerson={
      name:newName,
      number:newNumber
    }
    const findP=persons.find(element=> element.name.trim().toUpperCase()===newName.trim().toUpperCase())
    console.log('filtrado',findP)
    if(findP){
        if(window.confirm(`${e.target.name} is already added to phonebook, replace the old number with a new number`)){
          personServices.update(findP.id,newPerson)
          .then(personObject=>{
            console.log('new',personObject)
            const updatedPersons=persons.map(p=>{
              if(parseInt(findP.id)===p.id){ return newPerson }
              else return p
            })
            setPersons(updatedPersons)
            setNewName('')
            setNewNumber('')  
          })  
        }
        else {
          setNewName('')
          setNewNumber('')
          return
        }     
    }
    else {
      personServices.create(newPerson)
      .then(personObject=>{
        console.log('new',personObject)
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')  
      })
    }    
  } //2.6 paso 1

  const handleNewName=(e)=>{
    setNewNameTel(e)
  }
  const handleNewNumber=(e)=>{
    setNewNumberTel(e)
  }

  const handlerDelete=(e)=>{
    e.preventDefault()
    personServices.remove(e.target.id)
    .then((response)=>{
      if(window.confirm(`Delete ${e.target.name}`)){
        const rest=persons.filter(per=>per.id!==parseInt(e.target.id))
        setPersons(rest)
      }
    })
    .catch(e=>{
      alert(
        `the Person '${e.target.name}' was already deleted from server`
      )
    })
  }

  const personsFind=filterName===''
    ? persons
    : persons.filter(person => person.name.toUpperCase().indexOf(filterName.toUpperCase()) !== -1)
    
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPersons persons={personsFind} filterName={filterName} setFindFilterName={setFindFilterName} />
      
      <h2>Add a New</h2>
      <FormPerson persons={personsFind }  addPerson={addPerson} newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={personsFind} handlerDelete={handlerDelete} />
    </div>
  )
}

export default App
