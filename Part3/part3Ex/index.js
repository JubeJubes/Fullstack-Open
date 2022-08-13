
const { json } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())

app.use(express.json())


const customError = require('./components/customError')

let persons = [
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

app.post('/api/persons',(req,res,next)=>{     
  // console.log(res.req.body);
  const {body} = req
  if((body.name) && (body.number)){
    const id = Math.max(...persons.map(p=>p.id))+1
    const inset = {id,...body}
    persons.push(inset)
    console.log("body",body); 
    console.log("inset",inset);
    console.log("persons",persons); 
    res.redirect('/api/persons')
  }
  else  next(new customError("Name & number need to be filled in",400))
})

app.put('/api/persons/:id',(req,res,next)=>{
  const {id} = req.params
  const {body} = req
  console.log(name);
  if((body.name) && (body.number)){
    const element = persons.map((p)=>p.id)
                            .indexOf(id)
    persons[element] = body

     res.redirect(303,'/api/persons')
  }
  else  next(new customError("Name & number need to be filled in",400))
})

app.delete('/api/persons/:id', (request, response) => {
  // const id = Number(request.params.id)
  // console.log("id",id);
  // console.log("type of",typeof id);
  // persons = persons.filter(person => person.id !== id)
  // console.log("persons",persons);


  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()

  // response.redirect('/api/notes')
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