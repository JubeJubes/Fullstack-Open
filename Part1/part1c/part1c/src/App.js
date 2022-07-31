////////////////////////
//////////////////////// 
////////////////////////
// import logo from './logo.svg';
// import './App.css';

// const Hello = ({name,age}) => {
  
//   const bornYear = () => new Date().getFullYear() - age
  
//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// const App = () => {
//   const name = 'Peter'
//   const age = 10

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//     </div>
//   )
// }

// export default App;

//////////////////
////////////////// Page re-rendering
//////////////////

// import logo from './logo.svg';
// import { useState } from 'react';
// import './App.css';


// const App = () => {
//   const[counter,setCounter] = useState(0)
//   const Increase = () =>setCounter(counter+1)
//   const Decrease = () => setCounter(counter-1)
//   const Reset = () => setCounter(0)
  

//   const Display = ({counter}) => <div>{counter}</div>
//   const Button = ({fn,title})=> <><button onClick={fn}>{title}</button></>

//   return (
//   <>
   
//       <Display counter={counter}/>
//       <Button fn = {Increase} title = "Add"/>
//       <Button fn = {Reset} title = "Zero"/>
//       <Button fn = {Decrease} title = "Reduce"/>


//   </>
//   )
// }

// export default App;


///////////////////////////////////
/////////////////////////////////// Complex States
///////////////////////////////////

// import logo from './logo.svg';
// import { useState } from 'react';
// import './App.css';



// const Button = ({fn,direction})=> { 
//   return (<button onClick= {fn}>{direction}</button> )   
// }

// const Clicklist = ({allClicks})=> {
//   if (allClicks.length > 0) return <div>{allClicks}</div>
//   return <div>This app works by pressing either button</div>
// }


// const App = () => {
//   const[clicks,setClicks] = useState({left:0,right:0})
//   const[allClicks,setAll] = useState([])

//   const handleLeft = ()=> {
//     return ( ()=> {
//       setAll(allClicks+'L')
//       return setClicks({...clicks,left:clicks.left+1})
//     }

//     )
//   }
//   const handleRight = ()=> {
//     setAll(allClicks+'R')
//     return setClicks({...clicks,right:clicks.right+1})
//   }


//   return (
//   <>
//    {clicks.left}
//    <Button fn ={handleLeft()} direction = "left"/>
//    <span> | </span>
//    <Button fn ={handleRight} direction = "right"/>
//    {clicks.right}
//    <Clicklist allClicks={allClicks}/>

//   </>
//   )
// }

// export default App;

//////////////////////////////////////// Setting states to "Left" & "Right"
//////////////////////////////////////// Passing fn parameter to fn by wrapping helper fn in another fn
////////////////////////////////////////

// import logo from './logo.svg';
// import { useState } from 'react';
// import './App.css';

// const Button = ({fn,direction})=> { 
//   return (<button onClick= {fn}>{direction}</button> )   
// }

// const Clicklist = ({allClicks})=> {
//   if (allClicks.length > 0) return <div>{allClicks}</div>
//   return <div>This app works by pressing either button</div>
// }

// const App = () => {
//   const[clicks,setClicks] = useState({left:0,right:0})
//   const[allClicks,setAll] = useState([])

//   const handleClick = (dir)=> () => {
//       if (dir==="left") {
//         setAll(allClicks+'L')
//         return setClicks({...clicks,left:clicks.left+1})
//       }
//       setAll(allClicks+'R')
//       return setClicks({...clicks,right:clicks.right+1})
//     }
  

//   return (
//   <>
//    {clicks.left}
//    <Button fn ={handleClick("left")} direction = "left"/>
//    <span> | </span>
//    <Button fn ={handleClick("right")} direction = "right"/>
//    {clicks.right}
//    <Clicklist allClicks={allClicks}/>

//   </>
//   )
// }

// export default App;

import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

const Display = ({value}) => (
  <div>{value}</div>
)
const Button = ({onClick,text}) => (
  <button onClick={onClick}>{text}</button>
)

const App = () => {
  const[value,setValue] = useState(10)

  const setToValue = (newVal) => () => {
    setValue(newVal)
  }


  return (
  <>
    <Display value = {value}/>
    <Button onClick = {setToValue(1000)} text = "Thousand"/>
    <Button onClick = {setToValue(value+1)} text = "Increase"/>
    <Button onClick = {setToValue(value-1)} text = "Decrease"/>
    <Button onClick = {setToValue(0)} text = "Reset"/>
  </>
  )
}

export default App;