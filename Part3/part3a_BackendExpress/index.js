// const http = require('http')
const express = require('express')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
  ]

//middleware
app.use((req,res,next)=>{
  console.log('Method',req.method);
  console.log('Path',req.path);
  console.log('Body',req.body);
  console.log("-----");
  next()
})


//routes

app.get('/',(req,res)=> {
    res.send(`<h1>Hello World</h1>`)
})

app.get('/api/notes',(req,res)=>{
    res.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === Number(id))
    if (note) response.json(note)
    else response.status(404).end()
  })

app.post('/api/notes',(req,res)=>{
  notes.push(req.body)
  res.redirect('/api/notes')
  console.log("redirecting...");
})
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

//404
app.use((req,res)=>{
  res.status(404).send({error:"Resource doesnt exist"})
})


const PORT =3001
app.listen(PORT)
console.log(`rUNNING ON PORT ${PORT}...`);