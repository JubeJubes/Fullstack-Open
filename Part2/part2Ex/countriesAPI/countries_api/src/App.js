import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {useState,useEffect} from 'react'

const Input = ({value,onChange}) => {
  return (
    <form >
      find countries: <input value={value} onChange={onChange}  />
    </form>
  )
}

const Flash =({cObj,cKey})=> {
  const[showCtry,setShowCtry] = useState('')
  const showCountry = (index)=> ()=>{
    // setShowCtry(index)
    // return <DisplayCountry cObj={cObj} keyObj={cArray[0]}/>
    setShowCtry(index)
  }

  // useEffect(()=> {
  //   <DisplayCountry cObj={cObj} keyObj={showCtry}/>
  // },[showCtry])
 
  const cArray = cObj.map((ctry)=>ctry.name.common.toUpperCase())
                    .filter((index)=>index.indexOf(cKey)>-1)


  if (cArray.length<=10 && cArray.length > 1) {
    return  (
      <div>
        <table>
          <tbody>
              {
              cArray.map((index,i)=>
              <tr key={cObj[i].ccn3+10*i}>
                <td key={cObj[i].ccn3}>{index}</td> 
                <td key={cObj[i].ccn3+i}><Button onClick = {showCountry(index)}  /></td>
              </tr>)
              }
          </tbody>
        </table>
      </div>
    )}
  
  if (cArray.length===1) {
    setShowCtry(cArray[0]) 
  //  return <DisplayCountry cObj={cObj} keyObj={cArray[0]}/>
  }

  if (cArray.length >10)  return (<div>Too many matches, specify another filter</div>)
  
  if (cArray.length >0) return (
    
      <DisplayCountry cObj={cObj} keyObj={showCtry}/>
    
  )
}

const DisplayCountry = ({cObj,keyObj})=> {
  const iOne = cObj.filter((index)=>index.name.common.toUpperCase() === keyObj);
  return (
    <div>hello
      <h2>{iOne[0].name.common}</h2>
      <p>capital {iOne[0].capital}</p>
      <p>area {iOne[0].area}</p>
      <h3>languages:</h3>
        <ul>
          {
            (Object.keys(iOne[0].languages))
                    .map((index,i)=>
                      <li key={index+i}>{iOne[0].languages[index]}</li>
                    )
          }
        </ul>
      <img src={iOne[0].flags.png} alt="flag" />
    </div>
  )
}

const Button = ({onClick})=> (
  <>
    <button onClick={onClick}>show</button>
  </>
)

function App() {
  const [country,setCountry] = useState('')
  const [cList,setCList] = useState([])
  const hChange = ((e)=> {
    e.preventDefault()
    setCountry(e.target.value)
  })

  useEffect(()=>{
    axios.get("https://restcountries.com/v3.1/all")
          .then(res=>{setCList(res.data)})
  },[])
  

  return (
    <>
      <Input value = {country} onChange = {hChange}/>
      <Flash cObj={cList} cKey={country.toUpperCase()}/>
    </>
  )
}

export default App;
