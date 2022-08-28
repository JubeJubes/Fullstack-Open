if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const url = process.env.DB_URL
const mongoose = require('mongoose')

console.log(process.env.DB_URL);

// if ( process.argv.length<3 ) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

mongoose.connect(url, { useNewUrlParser: false })

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean,
})

const note = new Note({
  content: 'Promise auttaa asynkronisissa operaatiossa',
  date: new Date(),
  important: false,
})


note.save().then(() => {
  console.log('note saved!')
  mongoose.connection.close()
})