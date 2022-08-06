import React from "react";

const Note = ({note,onClick})=> {
  const label = note.important?
              'make unimportant':'make important'
  return(
    <>
      <li >{note.content} <button onClick={onClick}>{label}</button></li>
      
    </>
)}
export default Note  