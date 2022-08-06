import {useState,useEffect} from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes,setNotes] = useState([])
  const [newNote,setNewNote] = useState('Enter a note...')
  const [showAll,setShowAll] = useState(true)

  const hook =
 useEffect(()=>{
    noteService.getAll()
      .then(data=> {setNotes(data)})
  },[])
  const notesToShow = showAll?
                      notes :
                      notes.filter((note)=>note.important)

  const addNote = (e)=> {
    e.preventDefault()
    const newNoteObj = {
      content: newNote,
      date: new Date().toISOString,
      important: Math.random() < 0.5
    }
    noteService.create(newNoteObj)
              .then(resNote=>setNotes([...notes,resNote]))
    clearInput()
  }

  //helper functions
  const hNoteChange = (e) => {
    setNewNote(e.target.value)
  }
  const clearInput = () => {
    setNewNote('')
  }
  const toggleImp = (id)=> ()=>{
    const note = notes.find(n=>n.id===id)
    const editNote = {...note,important:!note.important}
        noteService.create(id,editNote)
          .then (data=> {
            setNotes(notes.map((el)=>el.id===note.id?data:el))
          })
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>{notesToShow.map((note) => <Note key={note.id} note={note} onClick={toggleImp(note.id)}/>)}</ul>
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