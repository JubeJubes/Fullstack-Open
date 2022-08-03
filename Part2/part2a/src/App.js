import {useState,useEffect} from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes,setNotes] = useState([])
  const [newNote,setNewNote] = useState('Enter a note...')
  const [showAll,setShowAll] = useState(true)

  const hook =()=>{
    axios.get('http://localhost:3001/notes')
    .then(res=> {
      setNotes(res.data)
    })
  }
 useEffect(hook,[])


  console.log('render',notes.length,'notes'); 

  const notesToShow = showAll?
                      notes :
                      notes.filter((note)=>note.important)


  const addNote = (e)=> {
    e.preventDefault()
    const newNoteObj = {
      id: notes.length+1,
      content: newNote,
      date: new Date().toISOString,
      important: Math.random() < 0.5
    }
    setNotes([...notes,newNoteObj])
    clearInput()
  }

  //helper functions
  const hNoteChange = (e) => {
    setNewNote(e.target.value)
  }
  const clearInput = () => {
    setNewNote('')
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>{notesToShow.map((note) => <Note key={note.id} note={note}/>)}</ul>
      <form onSubmit={addNote}>
        <input type='text' value={newNote} onChange={hNoteChange} onClick={clearInput}/>
        <button type='submit'>Submit</button>
      </form>
      <button onClick={()=>setShowAll(!showAll)}>
        Show {showAll? 'Important' : 'All'}
      </button>
    </div>
  )
}

export default App