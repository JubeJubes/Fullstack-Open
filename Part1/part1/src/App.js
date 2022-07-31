/////////////////////////////////////////////
/////////////////////////////////////////////   Lecture Part
/////////////////////////////////////////////


import logo from './logo.svg';
import './App.css';

function Hello(props) {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const Footer = () =>{
  return (
    <div>greeting app creeated by <a href="https://github.com/JubeJubes">JubeJubes</a></div>
  )
}

const App = ()=> {
  const name1 ="Petr"
  const age= 30
  return(
    <>
      <h1>Greetings</h1>
      <Hello name="George" age ={12+10}/>
      <Hello name ="Clooney" age = {40}/>
      <Hello name = {name1} age={age}/>
      <Footer/>
    </>
  )
}

export default App;


