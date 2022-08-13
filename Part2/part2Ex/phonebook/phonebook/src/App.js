import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import personService from './services/persons'

import { useEffect, useState } from 'react'

const Filter = ({value, onChange,fPersons})=> (
  <div>
    Search:<Input val ={value} hFn = {onChange}/>
    <div>
      <ArrayDisplay cArray={fPersons} key1="name" key2 ="number"/>
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

const PersonList = ({dArray,fn})=> {
  // const personClick = ()=>
  return  (
  <ul>
    {dArray.map((person,i)=> 
      <li key={person.id+Math.random()*100000000}>
        {person.name} {person.number} 
        <button onClick={fn(person)}>delete</button>
      </li>)
    }
  </ul>
  )
}

const Input = ({val,hFn})=> ( 
  <div><input value={val} onChange={hFn}/></div>
)

const ArrayDisplay = ({cArray,key1,key2}) => (
  <ul>
  {cArray.map((person)=> <li key={person.id}>{person[key1]} {person[key2]}</li>)}
</ul>
)

const Flash = ({dText,staticText}) => { 
  return <p> {dText} {staticText}</p>
}


const App = ( ) => {
  const [persons, setPersons] = useState([]) 
  const [fPersons, setfPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [badEntry, setBadEntry] = useState(newName) 
  const [sText, setSText] = useState('')

  useEffect(()=>{
    personService.getAll()
                  .then(data=>{setPersons(data)})
    console.log(persons);
  },[])
  ////////////////////////////// New Name handling

  const handleChange = (e)=> {
    e.preventDefault()
    setNewName(e.target.value)
  }
  const addNumber = (e)=> {
    e.preventDefault()
    if (!isPresent())  {
      axios.post("http://localhost:3001/api/persons",{name:newName,number:newNumber})
           .then(res=>setPersons([...persons,{name:newName,number:newNumber}]))    
    }
    setNewName('')   
    setNewNumber('')   

  }
  const isPresent = () => {
    // console.log(newName);
    for (const person of persons){
      if (newName===person.name) {
        const editPerson = {...person,number:newNumber} 
        console.log("editperson",editPerson);
        console.log(person);
        axios.put(`http://localhost:3001/api/persons/${person.name}`,editPerson)
            .then(()=>
              {
                const copy1 = [...persons.map((p)=>p.name===person.name? editPerson : p)]
                 setPersons(persons.map((p)=>p.name===person.name? editPerson : p))
                 
              })
        return true
        
      }
    }
    return false
  }

  const deleteBtn = (person)=>()=> {
    console.log(person);
    if (window.confirm(`Do you want to delete ${person.name} & ${person.id}`)) {
      console.log(typeof person.id);
      axios.delete(`http://localhost:3001/api/persons/${person.id}`)
            .then(()=>setPersons(persons.filter((p)=>p!==person)))

    }         
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
      <PersonList dArray={persons} fn={deleteBtn}/>
      <Flash dText={badEntry} staticText={sText}/>
      
      
      
    </div>
  )
}

export default App
