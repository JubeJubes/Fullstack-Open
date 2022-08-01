const Header = (props)=>{
  return (
    <h1>{props.course.name}</h1>
  )  
}

const Content = (props)=>{
  return (
    <>
      <Part part = {props.course.parts[0].name} excercises= {props.course.parts[0].exercises}/>
      <Part part = {props.course.parts[1].name} excercises= {props.course.parts[1].exercises}/>
      <Part part = {props.course.parts[2].name} excercises= {props.course.parts[2].exercises}/>
    </>
  )
}

//sub components. Part=>Content
const Part = (props)=>{
  return(
    <p>{props.part} {props.excercises}</p>
  )
}

const App = () => {
  
  const course = {
    name : 'Half Stack application development',
    parts : [ 
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
    ]
  }
  return (
    <>
      <Header course = {course}/>
      <Content course={course}/>
    </>
  )
}

export default App