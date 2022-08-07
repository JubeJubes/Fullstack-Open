
const { json } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())

const customError = require('./components/customError')

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

morgan.token('body',(req,res)=>{
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :body - :response-time ms'))

app.get('/api/persons',(req,res)=>{
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === Number(id))
    if (person) response.json(person)
    else response.status(404).end()
  })

app.post('/api/notes',(req,res,next)=>{
  // console.log(res.req.body);
  const {body} = req
  if((body.name) && (body.number)){
    persons.push(body)
    res.redirect('/api/persons')
  }
  else  next(new customError("Name & number need to be filled in",400))
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.all('*',(req,res,next)=>{
  next(new customError("Resource doesnt exist",404))
})

app.use((err,req,res,next)=>{
  const {status=500} = err
  if(!err.message) err.message = "Something has gone really wrong here"
  res.status(status).send({error:err.message})

})


const PORT =3001
app.listen(PORT)
console.log(`RUNNING ON PORT ${PORT}...${new Date().toISOString()}`);