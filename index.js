const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const { db } = require('./db')

db()
// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use(express.json())
app.use(cors())
const categoryRouter = require('./routes/category')
const postRouter = require('./routes/post')
const recipeRouter = require('./routes/recipe')
const randomRouter = require('./routes/random')
const latestRouter = require('./routes/latest')
const searchRouter = require('./routes/search')

app.use('/api/category', categoryRouter)
app.use('/api/contact', postRouter)
app.use('/api/recipes', recipeRouter)
app.use('/api/random', randomRouter)
app.use('/api/latest', latestRouter)
app.use('/api/search', searchRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
app.listen(PORT, () => {
  console.log(`Server has been started port ${PORT}`)
})
