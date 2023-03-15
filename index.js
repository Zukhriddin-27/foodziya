const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const { MONGO_URI } = require('./config/key')
const PORT = process.env.PORT || 5000

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.json())

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
