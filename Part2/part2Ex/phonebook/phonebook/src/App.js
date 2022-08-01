import logo from './logo.svg';
import './App.css';

import { useState } from 'react'

const Filter = ({value, onChange,fPersons})=> (
  <div>
    Search:<Input val ={value} hFn = {onChange}/>
    <div>
      <Array_display cArray={fPersons} key1="name" key2 ="number"/>
    </div>
  </div>
)

const Form = ({nName,hChange,nNum,hNumChange,subFn}) => (
  
  <div>
      <form onSubmit={subFn}>
        <Input val ={nName} hFn = {hChange}/>
        <Input val ={nNum} hFn = {hNumChange}/>
        <div><button type="submit">add</button></div>
      </form>
  </div>
)

const PersonList = ({dArray})=> {
  console.log(dArray)
  return <Array_display cArray={dArray} key1="name" key2 ="number"/>
}

const Input = ({val,hFn})=> ( 
  <div><input value={val} onChange={hFn}/></div>
)

const Array_display = ({cArray,key1,key2}) => (
  <ul>
  {cArray.map((person,i)=> <li key={i+Math.floor(Math.random()*10000)}>{person[key1]} {person[key2]}</li>)}
</ul>
)



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '647-232-1234' }
  ]) 
  const [fPersons, setfPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [badEntry, setBadEntry] = useState(newName)
  const [searchKey, setSearchKey] = useState('')

  ////////////////////////////// New Name handling

  const handleChange = (e)=> {
    e.preventDefault()
    setNewName(e.target.value)
  }
  const addNumber = (e)=> {
    e.preventDefault()
    if (!isPresent(newName))  {
      setPersons([...persons,{name:newName,number:newNumber}])
    }
    setNewName('')   
    setNewNumber('')   

  }
  const isPresent = (entry) => {
    for (const person of persons){
      if (entry.toUpperCase()===person.name.toUpperCase()) {
        setBadEntry(newName)
       
        return true
      }
    }
    return false
  }


  ////////////////////////////// New Number input handling
  const handleNumChange = (e)=> {
    e.preventDefault()
    setNewNumber(e.target.value)
  }

  /////////////////////////////// Name Filtering
  const searchBook = (e)=> {
    e.preventDefault()
    setSearchKey(e.target.value)
    setfPersons(persons.filter((person)=>person.name===e.target.value))
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchKey} onChange={searchBook} fPersons={fPersons}/>
      <h2>Add a new number</h2>
      <Form nName={newName} hChange={handleChange} nNum={newNumber} hNumChange={handleNumChange} subFn = {addNumber}/>
      <h2>Numbers</h2>
      <PersonList dArray={persons}/>
      
      
    </div>
  )
}

export default App
