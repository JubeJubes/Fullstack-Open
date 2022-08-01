import React from "react"
const Course = ({course})=> (
    <>
    <Header course = {course}/>
    <Content course={course}/>
    <Total course = {course} />
  </>
  )
  const Header = ({course})=> (
    <h1>{course.name}</h1>
  )
  const Content = ({course})=> (
    <ul>
      {
        course.parts.map((part,i)=> <Part key={part.id} part={part}/>)
      }
    </ul>
  )
  const Part = ({part})=> (
    <li>{part.name} {part.exercises}</li>
  )
  const Total = ({course})=> {
    const totalizer = course.parts.map((part)=>part.exercises)
                                  .reduce((a,b)=>a+b,0)
    return <div><strong>Total of {totalizer} exercises</strong></div>
    
  }

  export default Course