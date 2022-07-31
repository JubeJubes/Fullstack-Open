import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

const Button = ({fn,text}) => (
  <button onClick={fn}>{text}</button>
)
const Display = ({category,count,unit}) => (
  // <div>{category} {count}{unit}</div>
  <tr>
    <td>{category}</td>
    <td>{count}{unit}</td>
  </tr>

)
const Statistics = ({good,neutral,bad,avg}) => {
  let average = (avg.length>0)? avg.reduce((a,b)=>a+b,0)/avg.length: 0
  let pos = (avg.length>0)? good/(good+neutral+bad): 0
  let ttl = good+neutral+bad

  if (avg.length>0) return (
    <table>
      <tbody>
        <Display category="good" count = {good}/>
        <Display category="neutral" count = {neutral}/>
        <Display category="bad" count = {bad}/>
        <Display category="all" count = {ttl}/>
        <Display category="average" count = {average}/>
        <Display category="positive" count = {pos} unit="%"/>
      </tbody>
    </table>
  )
  return <div>No feedback given</div>


}

function App() {
const [good, setGood] = useState(0)
const [neutral, setNeutral] = useState(0)
const [bad, setBad] = useState(0)
const [avg,setAvg] = useState([])

const setValue = (val) => ()=> {
  if (val==="good") {
    setGood(good+1)
    setAvg(avg.concat(1))
  }
  else if (val==="neutral") {
    setNeutral(neutral+1)
    setAvg(avg.concat(0))
  }
  else {
    setBad(bad+1)
    setAvg(avg.concat(-1))
  }
}

  return (
    <>
      <h3>give feedback</h3>
      <Button fn={setValue("good")} text= "good"/>
      <Button fn={setValue("neutral")} text= "neutral"/>
      <Button fn={setValue("bad")} text= "bad"/>
      <h3>statistics</h3>
      <Statistics good={good} neutral={neutral}bad={bad} avg={avg}/>
    </>
  )
}

export default App;
