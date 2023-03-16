const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const { MONGO_URI } = require('./config/key')
const PORT = process.env.PORT || 5000
const cors = require('cors')

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Add middleware function to set CORS headers
app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Origin',
    'http://localhost:3000' || 'https://foodziya-web-5pti.vercel.app/'
  ) // Allow any domain to access the resource
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  ) // Allow specific headers in requests
  next() // Move on to the next middleware function
})

app.use(express.json())
app.use(cors)
const categoryRouter = require('./routes/category')
const postRouter = require('./routes/post')
// const recipeRouter = require('./routes/recipe')

app.use('/api/category', categoryRouter)
app.use('/api/contact', postRouter)
// app.use('/api/recipe')

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
app.listen(PORT, () => {
  console.log(`Server has been started port ${PORT}`)
})
